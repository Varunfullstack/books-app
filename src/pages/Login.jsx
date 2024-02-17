import { Box, Container, Paper, Typography } from "@mui/material";
import LoginForm from "../components/LoginForm";

const Login = () => {
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
              Login
            </Typography>
            <LoginForm />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
