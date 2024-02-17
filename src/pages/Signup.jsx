import { Box, Container, Paper, Typography } from "@mui/material";
import SignUpForm from "../components/SignupForm";

const SignUp = () => {
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
              SignUp
            </Typography>
            <SignUpForm />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default SignUp;
