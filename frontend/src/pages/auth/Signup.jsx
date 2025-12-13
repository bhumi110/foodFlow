import { useState } from "react";
import {
  Box,
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { signup } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import "./auth.css"


export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await signup(form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, p: 4 }} className="corner">
        <Typography variant="h5" textAlign="center" mb={2}>
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          label="I am a"
          name="role"
          margin="normal"
          value={form.role}
          onChange={handleChange}
        >
          <MenuItem value="Customer">Customer</MenuItem>
          <MenuItem value="Restaurant">Restaurant Owner</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "#f97316" }}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
        <Typography mt={2} textAlign="center">
          Already have an account?{" "}
          <span
            style={{ color: "#f97316", cursor: "pointer", fontWeight: 500 }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Card>
    </Box>
  );
}
