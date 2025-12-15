import { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { login } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("email", res.data.user.email);

      if (res.data.user.role === "Customer") navigate("/customer");
      else if (res.data.user.role === "Restaurant") navigate("/restaurant");
      else navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
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
          Welcome Back
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          mb={3}
        >
          Login to continue to FoodFlow
        </Typography>

        <Divider sx={{ mb: 3 }} />

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
          Login
        </Button>

        <Typography mt={3} textAlign="center" variant="body2">
          Don&apos;t have an account?{" "}
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
            onClick={() => navigate("/")}
          >
            Signup
          </Box>
        </Typography>
      </Card>
    </Box>
  );
}
