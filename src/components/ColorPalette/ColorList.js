import { Button, Box, Typography, Card, Stack } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";

const ColorList = ({
  theme,
  setTheme,
  favorites,
  setFavorites,
  shuffled,
  setShuffled,
}) => {
  const addToFavorite = (color) => {
    if (!favorites.includes(color) && favorites.length <= 8) {
      setFavorites([...favorites, color]);
      setShuffled(shuffled.filter((fav) => fav.hex !== color.hex));
    } else {
      setFavorites(favorites.slice(8));
    }
  };
  const deleteFavorite = (color) => {
    const newFavorites = favorites.filter((fav) => fav.hex !== color.hex);
    setFavorites(newFavorites);
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
          variant="outline"
          size="small"
          onClick={() => setTheme(c)}
          sx={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          Set As Primary Color
        </Button>
      </Card>
    ));

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        {displayColors(shuffled)}
        {displayColors(favorites)}
      </Stack>
    </>
  );
};
export default ColorList;
