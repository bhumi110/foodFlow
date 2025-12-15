import { useState } from "react";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { adminLogin } from "../../api/admin.api";
import { useNavigate } from "react-router-dom";
import "../auth/auth.css";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await adminLogin(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("email", res.data.user.email);

      navigate("/admin", { replace: true });
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
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
      <Card sx={{
    width: "100%",
    maxWidth: 420,
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
  }} className="corner">
        <Typography variant="h5" textAlign="center" mb={2}>
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          margin="normal"
          value={form.password}
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
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Card>
    </Box>
  );
}
