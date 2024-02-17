import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Link,
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
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page
    fetchBooks(); // Fetch next page of books
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      {hasRole("author") ? (
        <Button component={RouterLink} to="/books/add">
          Add Book
        </Button>
      ) : (
        <></>
      )}
      <List component="nav" aria-label="book list">
        {books.map((book, index) => (
          <React.Fragment key={index}>
            <Link
              component={RouterLink}
              to={`/books/${book.id}`}
              variant="body2"
            >
              <ListItem>
                <ListItemText
                  primary={book.name}
                  secondary={book.description}
                />
              </ListItem>
            </Link>

            {/* Add a divider between list items except after the last item */}
            {index < books.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
      {loading && <div>Loading...</div>}
      {hasMore && !loading && (
        <Button
          onClick={handleLoadMore}
          variant="outlined"
          style={{ marginTop: "20px" }}
        >
          Load More
        </Button>
      )}
    </>
  );
};

export default BookList;
