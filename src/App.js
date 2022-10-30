import { React, useState, useEffect, useCallback, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Container,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

//Data
import colors from "./colors";
import ColorList from "./components/ColorPalette/ColorList";

function App() {
  const [allColors, setAllColors] = useState(colors);
  const [shuffled, setShuffled] = useState(allColors);
  const [favorites, setFavorites] = useState([]);
  const [primary, setPrimary] = useState("#f5f5f5");
  const [allPrimary, setAllPrimary] = useState([]);
  const [themeMode, setMode] = useState("light");
  const [background, setBackground] = useState("");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary: {
            light: "#e0e0e0",
            main: primary,
            dark: "#878686",
          },
        },
      }),
    [themeMode, primary]
  );

  const setColors = useCallback(
    (colors) => setAllColors(colors),
    [setAllColors]
  );
  const getRandomColors = () => {
    if (favorites.length > 0) {
      setShuffled(
        allColors
          .sort(() => Math.random() - Math.random())
          .slice(favorites.length, 8)
      );
    } else {
      setShuffled(
        allColors.sort(() => Math.random() - Math.random()).slice(0, 8)
      );
    }
  };

  const setThemeMode = (color) => {
    if (!allPrimary.includes(color) && allPrimary.length > 4) {
      setAllPrimary([...allPrimary, color].slice(-5));
    } else if (!allPrimary.includes(color)) {
      setAllPrimary([...allPrimary, color]);
    }
    setPrimary(color.hex);
    if (color.shade >= 500) {
      setMode("dark");
      setBackground(theme.palette.primary.dark);
    } else {
      setMode("light");
      setBackground(theme.palette.primary.light);
    }
  };

  const deletePrimary = (color) => {
    const primaries = allPrimary.filter((prime) => prime.hex !== color.hex);
    setAllPrimary(primaries);
  };

  useEffect(() => {
    setColors(colors);
  }, [setColors, allColors, theme]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="false"
        disableGutters
        sx={{ backgroundColor: background, height: "100vh" }}
      >
        <Button
          variant="contained"
          onClick={getRandomColors}
          sx={{ backgroundColor: theme.palette.primary.main, margin: "10px" }}
        >
          Generate Color Palette
        </Button>

        <ColorList
          setThemeMode={setThemeMode}
          allColor={allColors}
          favorites={favorites}
          setFavorites={setFavorites}
          shuffled={shuffled}
          setShuffled={setShuffled}
          theme={theme}
        />

        <Box
          sx={{ flexGrow: 1, width: "100%", maxWidth: 360, bgcolor: "white" }}
        >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Primary Colors:
          </Typography>
          <List>
            {allPrimary.map((prime, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="start"
                    aria-label="delete"
                    sx={{ color: "black" }}
                    onClick={() => deletePrimary(prime)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={prime.hex} sx={{ color: prime.hex }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
