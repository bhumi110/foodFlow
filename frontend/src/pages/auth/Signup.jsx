import { useState } from "react";
import {
  Box,
  Button,
  Card,
  MenuItem,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { signup } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import "./auth.css";

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
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background:
          "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
      }}
    >
      <Card
        sx={{
    width: "100%",
    maxWidth: 420,
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  }}
        className="corner"
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={1}
        >
          Create Account
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Join FoodFlow and start ordering or selling
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email Address"
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
          sx={{
            mt: 3,
            py: 1.3,
            bgcolor: "#f97316",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 2,
            "&:hover": {
              bgcolor: "#ea580c",
            },
          }}
          onClick={handleSubmit}
        >
          Create Account
        </Button>

        <Typography mt={3} textAlign="center" variant="body2">
          Already have an account?{" "}
          <Box
            component="span"
            sx={{
              color: "#f97316",
              cursor: "pointer",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Box>
        </Typography>
      </Card>
    </Box>
  );
}
