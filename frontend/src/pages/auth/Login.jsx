import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { login } from "../../api/auth.api";
import { useNavigate } from "react-router-dom";
import "./auth.css"

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
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 380, p: 4 }} className="corner">
        <Typography variant="h5" textAlign="center" mb={2}>
          Login
        </Typography>

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

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "#f97316" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography mt={2} textAlign="center">
          Don't have an account?{" "}
          <span
            style={{ color: "#f97316", cursor: "pointer", fontWeight: 500 }}
            onClick={() => navigate("/")}
          >
            Signup
          </span>
        </Typography>
      </Card>
    </Box>
  );
}
