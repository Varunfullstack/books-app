import { Box, Container, Paper, Typography } from "@mui/material";
import EditProfileForm from "../components/EditProfileForm";

const EditProfile = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 4,
          }}
        >
          <Box>
            <Typography component="h1" variant="h5">
              Edit Profile
            </Typography>
            <EditProfileForm />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditProfile;
