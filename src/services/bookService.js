import axiosInstance from "../api/axiosConfig";

// List books with pagination
export const listBooks = async (page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get("/books", {
      params: { _page: page, _per_page: limit, _sort: "id", _order: "desc" },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Failed to fetch books:", error);
    throw error;
  }
};

// Create a new book
export const createBook = async (bookData) => {
  try {
    const response = await axiosInstance.post("/books", bookData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Failed to create book:", error);
    throw error;
  }
};

// Update a book
export const updateBook = async (bookId, bookData) => {
  try {
    const response = await axiosInstance.put(`/books/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Failed to update book:", error);
    throw error;
  }
};

// get a book by id
export const getBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Failed to fetch book:", error);
    throw error;
  }
};
