import { Typography, Box } from "@mui/material";
import BookList from "../components/BookList";

const Books = () => {
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Books List
      </Typography>
      <BookList />
    </Box>
  );
};

export default Books;
