"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

import Link from "next/link";
import { useAuthStore } from "@/stores/useAuthStore";

export default function RegisterForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, setLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      enqueueSnackbar("密碼與確認密碼不一致", { variant: "error" });
      return;
    }

    if (formData.password.length < 6) {
      enqueueSnackbar("密碼長度至少需要 6 個字元", { variant: "error" });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090";
      const res = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        enqueueSnackbar(data.message || "註冊失敗", { variant: "error" });
        return;
      }

      enqueueSnackbar("註冊成功！請登入", { variant: "success" });
      router.push("/user/login");
    } catch {
      enqueueSnackbar("註冊時發生錯誤", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        註冊
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
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          helperText="密碼長度至少 6 個字元"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="確認密碼"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} /> : "註冊"}
        </Button>
        <Box sx={{ textAlign: "center" }}>
          <Link href="/user/login">已有帳號？立即登入</Link>
        </Box>
      </Box>
    </>
  );
}
