"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import {
  CreateSubscriptionRequest,
  MailTemplate,
  Subscription,
  SubType,
  UpdateSubscriptionRequest,
} from "@/services/useSubscriptionQuery";

interface SubscriptionCardProps {
  index: number;
  subscription?: Subscription;
  isNew?: boolean;
  isLoading?: boolean;
  userRole?: string;
  hasPTTAccount?: boolean;
  onSave: (data: CreateSubscriptionRequest) => void;
  onUpdate?: (
    id: number,
    data: UpdateSubscriptionRequest,
    onSuccess?: () => void,
  ) => void;
  onDelete?: (id: number) => void;
  onCancel?: () => void;
}

const SUB_TYPE_LABELS: Record<SubType, string> = {
  keyword: "關鍵字",
  author: "作者",
  pushsum: "推文數",
};

/**
 * Check if user can use mail feature (VIP or admin only)
 */
const canUseMailFeature = (role?: string): boolean => {
  return role === "vip" || role === "admin";
};

const SubscriptionCard = ({
  index,
  subscription,
  isNew = false,
  isLoading = false,
  userRole,
  hasPTTAccount = false,
  onSave,
  onUpdate,
  onDelete,
  onCancel,
}: SubscriptionCardProps) => {
  const [isEditing, setIsEditing] = useState(isNew);
  const [board, setBoard] = useState(subscription?.board ?? "");
  const [subType, setSubType] = useState<SubType>(
    subscription?.sub_type ?? "keyword",
  );
  const [value, setValue] = useState(subscription?.value ?? "");
  const [mailExpanded, setMailExpanded] = useState(false);
  const [mailSubject, setMailSubject] = useState(
    subscription?.mail?.subject ?? "",
  );
  const [mailContent, setMailContent] = useState(
    subscription?.mail?.content ?? "",
  );

  const canUseMail = canUseMailFeature(userRole);
  const hasMailTemplate =
    subscription?.mail?.subject || subscription?.mail?.content;

  const handleSave = () => {
    if (!board.trim() || !value.trim()) return;

    if (isNew) {
      onSave({ board: board.trim(), sub_type: subType, value: value.trim() });
    } else if (subscription?.id && onUpdate) {
      const mailData: MailTemplate | undefined =
        canUseMail && (mailSubject.trim() || mailContent.trim())
          ? { subject: mailSubject.trim(), content: mailContent.trim() }
          : undefined;

      onUpdate(
        subscription.id,
        {
          board: board.trim(),
          sub_type: subType,
          value: value.trim(),
          enabled: subscription.enabled,
          mail: mailData,
        },
        () => setIsEditing(false),
      );
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancel?.();
    } else {
      setBoard(subscription?.board ?? "");
      setSubType(subscription?.sub_type ?? "keyword");
      setValue(subscription?.value ?? "");
      setMailSubject(subscription?.mail?.subject ?? "");
      setMailContent(subscription?.mail?.content ?? "");
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (subscription?.id) {
      onDelete?.(subscription.id);
    }
  };

  const toggleMailExpanded = () => {
    setMailExpanded(!mailExpanded);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" mb={isEditing ? 2 : 0}>
          # {index + 1}
        </Typography>
        {isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="看板"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              size="small"
              fullWidth
              placeholder="例: Gossiping, Stock"
            />

            <FormControl size="small" fullWidth>
              <InputLabel>類型</InputLabel>
              <Select
                value={subType}
                label="類型"
                onChange={(e) => setSubType(e.target.value as SubType)}
              >
                <MenuItem value="keyword">關鍵字</MenuItem>
                <MenuItem value="author">作者</MenuItem>
                <MenuItem value="pushsum">推文數</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="條件值"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              size="small"
              fullWidth
              placeholder={
                subType === "keyword"
                  ? "例: 問卦, regexp:問卦|八卦"
                  : subType === "author"
                    ? "例: somebody"
                    : "例: 100, -50"
              }
            />

            {/* Mail Template Section (only shown when editing, not new) */}
            {!isNew && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <MailOutlineIcon
                    fontSize="small"
                    sx={{
                      color: canUseMail ? "text.primary" : "text.disabled",
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      color: canUseMail ? "text.primary" : "text.disabled",
                    }}
                  >
                    信件內容
                  </Typography>
                  {!canUseMail && (
                    <Typography
                      variant="body2"
                      sx={{ ml: 1, color: "text.disabled" }}
                    >
                      (暫時無法使用)
                    </Typography>
                  )}
                  {canUseMail && !hasPTTAccount && (
                    <Typography
                      variant="body2"
                      color="warning.main"
                      sx={{ ml: 1 }}
                    >
                      請先綁定 PTT 帳號
                    </Typography>
                  )}
                </Box>
                <TextField
                  label="信件標題"
                  value={mailSubject}
                  onChange={(e) => setMailSubject(e.target.value)}
                  size="small"
                  fullWidth
                  disabled={!canUseMail || !hasPTTAccount}
                  placeholder="輸入信件標題"
                />
                <TextField
                  label="信件內容"
                  value={mailContent}
                  onChange={(e) => setMailContent(e.target.value)}
                  size="small"
                  fullWidth
                  multiline
                  rows={3}
                  disabled={!canUseMail || !hasPTTAccount}
                  placeholder="輸入信件內容"
                />
              </Box>
            )}

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={isLoading}
                color="secondary"
              >
                取消
              </Button>
              <Button
                variant="outlined"
                onClick={handleSave}
                disabled={isLoading || !board.trim() || !value.trim()}
                sx={{ minWidth: 80 }}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : isNew ? (
                  "建立"
                ) : (
                  "儲存"
                )}
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack direction="column" spacing={0.5}>
                <Typography variant="h6" fontWeight="bold">
                  {subscription?.board}
                </Typography>
                <Typography variant="body2">
                  {SUB_TYPE_LABELS[subscription?.sub_type ?? "keyword"]}：
                  {subscription?.value}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2}>
                <IconButton
                  onClick={() => {
                    setIsEditing(true);
                    if (canUseMail) {
                      setMailExpanded(true);
                    }
                  }}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete} size="small" color="error">
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>

            {/* Mail Template Section (view mode) */}
            <Box sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: canUseMail ? "pointer" : "default",
                  gap: 1,
                }}
                onClick={canUseMail ? toggleMailExpanded : undefined}
              >
                <MailOutlineIcon
                  fontSize="small"
                  sx={{ color: canUseMail ? "text.primary" : "text.disabled" }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: canUseMail ? "text.primary" : "text.disabled" }}
                >
                  信件內容
                </Typography>
                {hasMailTemplate && canUseMail && (
                  <Chip
                    label="已設定"
                    size="small"
                    color="success"
                    sx={{ ml: 1, fontSize: "0.7rem", height: 20 }}
                  />
                )}
                {canUseMail ? (
                  mailExpanded ? (
                    <ExpandLessIcon fontSize="small" />
                  ) : (
                    <ExpandMoreIcon fontSize="small" />
                  )
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ ml: 1, color: "text.disabled" }}
                  >
                    (暫時無法使用)
                  </Typography>
                )}
              </Box>

              <Collapse in={mailExpanded && canUseMail}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mt: 2,
                    pl: 3,
                  }}
                >
                  <Box>
                    <Typography variant="body2">標題：</Typography>
                    <Typography variant="body2">
                      {subscription?.mail?.subject || "(未設定)"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2">內容：</Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                      {subscription?.mail?.content || "(未設定)"}
                    </Typography>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
