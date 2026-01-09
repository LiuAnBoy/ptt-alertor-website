"use client";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { KeyboardEvent, useState } from "react";

interface PTTBindingModalProps {
  open: boolean;
  isLoading: boolean;
  error?: string;
  onClose: () => void;
  onSubmit: (username: string, password: string) => void;
}

/**
 * Modal for PTT account binding
 */
const PTTBindingModal = ({
  open,
  isLoading,
  error,
  onClose,
  onSubmit,
}: PTTBindingModalProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (username.trim() && password) {
      onSubmit(username.trim(), password);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setUsername("");
      setPassword("");
      setShowPassword(false);
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && username.trim() && password && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>綁定 PTT 帳號</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Typography variant="body2">
            請輸入您的 PTT 帳號密碼以啟用站內信功能。
            密碼將以加密方式儲存，僅用於發送站內信。
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}

          <TextField
            label="PTT 帳號"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            fullWidth
            disabled={isLoading}
            autoFocus
          />

          <TextField
            label="PTT 密碼"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            fullWidth
            disabled={isLoading}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon fontSize="small" />
                      ) : (
                        <VisibilityIcon fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Typography variant="caption">
            注意：系統會驗證帳號密碼是否正確，請確保輸入正確的 PTT 登入資訊。
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          disabled={isLoading}
          variant="outlined"
          color="primary"
        >
          取消
        </Button>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          color="secondary"
          disabled={!username.trim() || !password || isLoading}
          sx={{ minWidth: 80 }}
        >
          {isLoading ? <CircularProgress size={20} color="inherit" /> : "綁定"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PTTBindingModal;
