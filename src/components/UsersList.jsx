import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { listUsers, updateProfile } from "../services/userService";
import { toast } from "react-toastify";

const pageSize = 10; // Number of items per page

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1); // Pagination control
  const [hasMore, setHasMore] = useState(true);

  // Fetch users with pagination
  const fetchUsers = async () => {
    // Replace with your actual API call
    const response = await listUsers(page, pageSize);
    if (response.length < pageSize) {
      setHasMore(false); // No more users to fetch
    } else {
      setHasMore(true);
    }
    setUsers(response);
  };

  // Update user role
  const updateUserRole = async (userId, role) => {
    try {
      // API call to update user role
      // Replace with your actual API call
      await updateProfile(userId, { role });
      toast.success("User role updated successfully");

      // Refresh the list or update locally
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select
                  value={user.role}
                  onChange={(event) =>
                    updateUserRole(user.id, event.target.value)
                  }
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="author">Author</MenuItem>
                  <MenuItem value="collaborator">Collaborator</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination controls (simplified for demonstration) */}
      <div>
        <Button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
        >
          Previous
        </Button>
        <Button disabled={!hasMore} onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </TableContainer>
  );
};

export default UsersList;
