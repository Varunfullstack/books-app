import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  Collapse,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBook, getBookById, updateBook } from "../services/bookService";
import BookContext from "../context/BookContext";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuidv4 } from "uuid";
import { AddCircleRounded } from "@mui/icons-material";

// Validation schema
const BookSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

const Section = ({ section, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const { editSection, removeSection, addSection } = useContext(BookContext);

  const handleToggle = () => setOpen(!open);
  const handleChange = (event) =>
    editSection(section.id, { ...section, name: event.target.value });
  const handleRemoveSubsection = () => removeSection(section.id);
  const handleAddSubsection = () => addSection(section.id, { name: "" });

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        mt: 2,
        ml: level * 2, // Increase margin for nested sections
        p: 1,
        borderRadius: "4px",
        backgroundColor: "#fafafa",
      }}
    >
      <ListItem
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          value={section.name}
          onChange={handleChange}
          sx={{ marginRight: "8px", flexGrow: 1 }}
        />
        <IconButton onClick={handleRemoveSubsection} size="large">
          <CloseIcon />
        </IconButton>
        <IconButton onClick={handleAddSubsection} size="large">
          <AddCircleRounded />
        </IconButton>
        {section.sections?.length ? (
          <IconButton onClick={handleToggle} size="large">
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        ) : null}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.sections.map((child) => (
            <Section key={child.id} section={child} level={level + 1} />
          ))}
        </List>
      </Collapse>
    </Box>
  );
};

const BookForm = ({ id }) => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    description: "",
    sections: [],
  };
  const [loading, setLoading] = useState(!id ? false : true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const book = await getBookById(id);

        if (book) {
          formik.setValues({
            name: book.name,
            description: book.description,
            sections: book.sections ?? [],
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    if (id != null) {
      fetchBook();
    }
  }, [id]);

  const addSection = (parentId = null, newSectionData) => {
    // Function to recursively find and add a new section
    const addSectionRecursive = (sections, parentId, newSection) => {
      if (parentId === null) {
        return [...sections, newSection]; // Add new section at root level
      } else {
        return sections.map((section) => {
          if (section.id === parentId) {
            // Found parent section, add new section to its children
            return { ...section, sections: [...section.sections, newSection] };
          } else if (section.sections.length > 0) {
            // Recursively search in subsections
            return {
              ...section,
              sections: addSectionRecursive(
                section.sections,
                parentId,
                newSection
              ),
            };
          }
          return section;
        });
      }
    };

    const newSection = { ...newSectionData, id: uuidv4(), sections: [] };
    const updatedSections = addSectionRecursive(
      formik.values.sections,
      parentId,
      newSection
    );
    formik.setFieldValue("sections", updatedSections);
  };

  const editSection = (sectionId, updatedSection) => {
    const updateSectionsRecursively = (sectionId, updatedSection, sections) => {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].id === sectionId) {
          // Found the section to update
          sections[i] = { ...sections[i], ...updatedSection };
          return true; // Indicate that the section was found and updated
        }

        // If the section has subsections, recursively search them
        if (sections[i].sections && sections[i].sections.length > 0) {
          if (
            updateSectionsRecursively(
              sectionId,
              updatedSection,
              sections[i].sections
            )
          ) {
            return true; // Indicate that the section was found and updated in a nested section
          }
        }
      }
      return false; // Indicate that the section was not found
    };

    const sections = [...formik.values.sections];
    updateSectionsRecursively(sectionId, updatedSection, sections);
    console.log("edited", sections);
    formik.setFieldValue("sections", sections);
  };

  const removeSection = (sectionId) => {
    // Function to recursively find and remove a section
    const removeSectionRecursive = (sections, sectionIdToRemove) => {
      return sections.reduce((acc, section) => {
        if (section.id === sectionIdToRemove) {
          // If the current section is the one to remove, skip adding it to the accumulator
          return acc;
        } else {
          // If not, add the section to the accumulator
          // Check if this section has subsections that need to be checked for removal
          if (section.sections && section.sections.length > 0) {
            const updatedSubsections = removeSectionRecursive(
              section.sections,
              sectionIdToRemove
            );
            acc.push({ ...section, sections: updatedSubsections });
          } else {
            // If there are no subsections, or it doesn't match the id, add the section as is
            acc.push(section);
          }
          return acc;
        }
      }, []);
    };

    const updatedSections = removeSectionRecursive(
      formik.values.sections,
      sectionId
    );
    formik.setFieldValue("sections", updatedSections);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!id) {
        await createBook(values);
      } else {
        await updateBook(id, values);
      }

      navigate(`/`); // Redirect after successful update
    } catch (error) {
      console.error("Error updating book:", error);
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    BookSchema,
    onSubmit: handleSubmit,
    initialValues: initialValues,
  });

  if (loading) return <CircularProgress />;

  return (
    <div>
      <h2>Edit Book</h2>

      <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
        <BookContext.Provider
          value={{
            sections: formik.values.sections,
            addSection,
            editSection,
            removeSection,
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <br />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />

          <br />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              onClick={() => addSection(null, { name: "", sections: [] })}
              variant="contained"
              color="primary"
            >
              Add Section
            </Button>
          </Box>
          <List>
            {formik.values.sections.map((section) => (
              <Section key={section.id} section={section} />
            ))}
          </List>
          <br />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
            >
              Save
            </Button>
          </Box>
        </BookContext.Provider>
      </Box>
    </div>
  );
};

export default BookForm;
