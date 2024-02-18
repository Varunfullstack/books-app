import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import useAuth from "./hooks/useAuth";
import DashboardLayout from "./components/DashboardLayout";
import Books from "./pages/Books";
import EditBook from "./pages/EditBook";
import AddBook from "./pages/AddBook";
import EditProfile from "./pages/EditProfile";
import Users from "./pages/Users";

// Public Route wrapper
const PublicRoute = ({ children }) => {
  const { isAuthenticated, hasRole } = useAuth();
  return isAuthenticated ? <Navigate to="/" /> : children; // Redirect to home if user is logged in
};

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />; // Redirect to login if user is not logged in
};

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      ></Route>
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      ></Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Books />} />
        <Route path="/books/add" element={<AddBook />} />
        <Route path="/books/:id" element={<EditBook />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
