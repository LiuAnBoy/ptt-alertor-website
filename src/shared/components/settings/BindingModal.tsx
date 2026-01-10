"use client";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";

interface BindingModalProps {
  open: boolean;
  onClose: () => void;
  bindUrl: string;
  bindCode: string;
}

/**
 * Modal for Telegram binding instructions
 */
const BindingModal = ({
  open,
  onClose,
  bindUrl,
  bindCode,
}: BindingModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const bindCommand = `/bind ${bindCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bindCommand);
      enqueueSnackbar("已複製到剪貼簿", { variant: "success" });
    } catch {
      enqueueSnackbar("複製失敗", { variant: "error" });
    }
  };

  const handleOpenBot = () => {
    window.open(bindUrl, "_blank");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>綁定 Telegram</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 1 }}>
          {/* Step 1: Open bot link */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              步驟 1：開啟機器人
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              請點擊下方按鈕開啟 Telegram 機器人
            </Typography>
            <Button
              variant="outlined"
              startIcon={<OpenInNewIcon />}
              onClick={handleOpenBot}
              fullWidth
            >
              開啟 PTT 訂閱小幫手
            </Button>
          </Box>

          {/* Step 2: Copy bind command */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              步驟 2：複製並發送綁定指令
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              請複製以下指令，貼到 Telegram 聊天室發送
            </Typography>
            <TextField
              value={bindCommand}
              fullWidth
              size="small"
              slotProps={{
                input: {
                  readOnly: true,
                  endAdornment: (
                    <IconButton onClick={handleCopy} size="small">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  ),
                },
              }}
            />
          </Box>

          {/* Step 3: Complete */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              步驟 3：完成
            </Typography>
            <Typography variant="body2">
              機器人回覆「綁定成功」後，關閉此視窗並重新整理頁面
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BindingModal;
