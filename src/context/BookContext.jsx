// BookContext.js
import React from "react";

// Provides a context for managing book sections, including functionalities to add, edit, and remove sections.
const BookContext = React.createContext({
  sections: [],
  addSection: () => {},
  editSection: () => {},
  removeSection: () => {},
});

export default BookContext;
