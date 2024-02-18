import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Link,
  Box,
  CircularProgress,
} from "@mui/material";
import { listBooks } from "../services/bookService";
import { Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const BookList = () => {
  const { hasRole } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false); // Adjusted for initial load
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Start from page 1
  const [hasMore, setHasMore] = useState(true); // To check if more books are available

  useEffect(() => {
    fetchBooks();
  }, []); // Empty dependency array means this effect runs once on mount

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await listBooks(page, 10); // Adjusted to use page state
      setBooks((prevBooks) => [...prevBooks, ...data]); // Append new books to existing list
      setLoading(false);
      if (data.length < 10) {
        // Assuming if less than 10 books are returned, there are no more books
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books.");
    } finally {
      setLoading(false); // Ensure loading is set to false after operation
    }
  };
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page
    fetchBooks(); // Fetch next page of books
  };

  if (error) return <Box sx={{ m: 2 }}>Error: {error}</Box>;

  return (
    <Box sx={{ m: 2 }}>
      {hasRole("author") && (
        <Button
          component={RouterLink}
          to="/books/add"
          variant="contained"
          sx={{ mb: 2 }}
        >
          Add Book
        </Button>
      )}
      <List component="nav" aria-label="book list">
        {books.map((book, index) => (
          <React.Fragment key={book.id}>
            <Link
              component={RouterLink}
              to={`/books/${book.id}`}
              underline="hover"
            >
              <ListItem button>
                <ListItemText
                  primary={book.name}
                  secondary={book.description}
                />
              </ListItem>
            </Link>
            {index < books.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        hasMore && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              onClick={handleLoadMore}
              variant="outlined"
              style={{ marginTop: "20px" }}
            >
              Load More
            </Button>
          </Box>
        )
      )}
    </Box>
  );
};

export default BookList;
