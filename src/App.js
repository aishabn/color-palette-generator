import { useState, useEffect, useCallback } from "react";
import { createTheme } from "@mui/material/styles";
import {
  Container,
  Button,
  Box,
  Typography,
  Card,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
//Data
import colors from "./colors";

function App() {
  const [allColors, setAllColors] = useState(colors);
  const [shuffled, setShuffled] = useState(allColors);
  const [favorites, setFavorites] = useState([]);
  const [primary, setPrimary] = useState("#f5f5f5");
  const [allPrimary, setAllPrimary] = useState([]);
  const [themeMode, setMode] = useState("light");
  const [background, setBackground] = useState("");

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        light: "#e0e0e0",
        main: primary,
        dark: "#878686",
      },
    },
  });

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
    console.log("ALL", allPrimary);
    if (!allPrimary.includes(color)) {
      setAllPrimary([...allPrimary, color]);
    }
    if (allPrimary.length > 5) {
      setAllPrimary(allPrimary.slice(-5));
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
  const displayColors = (array) =>
    array.map((c, index) => (
      <Card key={index}>
        <Box
          style={{
            backgroundColor: c.hex,
            width: 150,
            height: 100,
          }}
        />

        <Typography sx={{ color: c.hex }}>
          {c.hex}
          {favorites.includes(c) ? (
            <IconButton
              aria-label="delete from favorites"
              style={{ color: "red" }}
              onClick={() => deleteFavorite(c)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="add to favorites"
              onClick={() => addToFavorite(c)}
            >
              <FavoriteBorderIcon />
            </IconButton>
          )}
        </Typography>
        <Button
          variant="text"
          size="small"
          onClick={() => setThemeMode(c)}
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Set As Primary Color
        </Button>
      </Card>
    ));

  const addToFavorite = (color) => {
    if (!favorites.includes(color) && favorites.length <= 8) {
      setFavorites([...favorites, color]);
    } else {
      setFavorites(favorites.slice(8));
    }
  };
  const deleteFavorite = (color) => {
    const data = favorites.filter((item) => item.hex !== color.hex);
    setFavorites(data);
  };

  const deletePrimary = (color) => {
    const data = allPrimary.filter((item) => item.hex !== color.hex);
    setAllPrimary(data);
  };

  useEffect(() => {
    setColors(colors);
  }, [setColors, allColors, favorites, shuffled]);

  return (
    <>
      <Container
        maxWidth="false"
        disableGutters
        sx={{ backgroundColor: background, height: "100vh" }}
      >
        <Button
          variant="outlined"
          onClick={getRandomColors}
          sx={{ backgroundColor: theme.palette.primary.main, margin: "10px" }}
        >
          Generate Color Palette
        </Button>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          {displayColors(shuffled)}
          {displayColors(favorites)}
        </Stack>
        <Box
          sx={{ flexGrow: 1, width: "100%", maxWidth: 360, bgcolor: "white" }}
        >
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Primary Colors:{" "}
          </Typography>
          <List>
            {allPrimary.map((prim, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="start"
                    aria-label="delete"
                    onClick={() => deletePrimary(prim)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={prim.hex} sx={{ color: prim.hex }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}

export default App;
