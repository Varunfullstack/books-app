// BookContext.js
import React from "react";

const BookContext = React.createContext({
  sections: [],
  addSection: () => {},
  editSection: () => {},
  removeSection: () => {},
});

export default BookContext;
