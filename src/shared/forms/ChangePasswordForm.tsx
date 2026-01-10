"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { ChangeEvent, FormEvent, useState } from "react";

import { useChangePasswordMutation } from "@/services/useUserQuery";

export default function ChangePasswordForm() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: changePassword, isPending } = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when typing
    if (name === "newPassword" || name === "confirmPassword") {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = (): boolean => {
    const newErrors = {
      newPassword: "",
      confirmPassword: "",
    };

    if (formData.newPassword.length < 6) {
      newErrors.newPassword = "新密碼必須至少 6 個字元";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "確認密碼與新密碼不符";
    }

    setErrors(newErrors);
    return !newErrors.newPassword && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    changePassword(
      {
        current_password: formData.currentPassword,
        new_password: formData.newPassword,
      },
      {
        onSuccess: () => {
          enqueueSnackbar("密碼變更成功！", { variant: "success" });
          router.push("/");
        },
        onError: (error) => {
          enqueueSnackbar(error.message || "密碼變更失敗", {
            variant: "error",
          });
        },
      },
    );
  };

  return (
    <>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        變更密碼
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="currentPassword"
          label="目前密碼"
          type="password"
          id="currentPassword"
          autoComplete="current-password"
          autoFocus
          value={formData.currentPassword}
          onChange={handleChange}
          disabled={isPending}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="新密碼"
          type="password"
          id="newPassword"
          autoComplete="new-password"
          value={formData.newPassword}
          onChange={handleChange}
          disabled={isPending}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="確認新密碼"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isPending}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          sx={{ mt: 3, mb: 2, color: "white", borderColor: "white" }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress size={24} /> : "變更密碼"}
        </Button>
      </Box>
    </>
  );
}
