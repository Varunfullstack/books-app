import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { updateProfile } from "../services/userService";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required"),
  name: Yup.string().required("Name is required"),
});

const EditProfileForm = () => {
  const { userDetails } = useAuth();

  console.log(userDetails);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await updateProfile(userDetails.id, values);
      localStorage.setItem("user", JSON.stringify(response));
      toast.success("Profile updated successfully", {
        position: "top-right",
        autoClose: 3000,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        newestOnTop: true,
        theme: "colored",
      });
    } catch (e) {
      console.error("Error updating user details:", e);
      toast.error("Failed to update profile");
    } finally {
      actions.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: { name: userDetails.name, email: userDetails.email },
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true, // To allow form re-initialization when initialValues change
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
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
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        disabled // Email field is disabled and not editable
        value={formik.values.email}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={formik.isSubmitting}
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default EditProfileForm;
