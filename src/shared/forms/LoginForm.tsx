"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSnackbar } from "notistack";
import { ChangeEvent, FormEvent, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, setLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        enqueueSnackbar("登入失敗，請檢查帳號密碼", { variant: "error" });
      } else {
        enqueueSnackbar("登入成功！", { variant: "success" });
        router.push("/");
      }
    } catch {
      enqueueSnackbar("登入時發生錯誤", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        登入
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="電子郵件"
          name="email"
          type="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="密碼"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2, color: "white", borderColor: "white" }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "登入"}
        </Button>
        <Box sx={{ textAlign: "center" }}>
          <Link
            href="/user/register"
            style={{ color: "white", textDecoration: "none" }}
          >
            還沒有帳號？立即註冊
          </Link>
        </Box>
      </Box>
    </>
  );
}
