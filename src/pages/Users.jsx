import { Box, Typography } from "@mui/material";
import UsersList from "../components/UsersList";

const Users = () => {
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Users
      </Typography>
      <UsersList />
    </Box>
  );
};

export default Users;
