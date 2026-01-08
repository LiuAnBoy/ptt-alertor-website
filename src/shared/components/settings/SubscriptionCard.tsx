"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
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
  Subscription,
  SubType,
  UpdateSubscriptionRequest,
} from "@/services/useSubscriptionQuery";

interface SubscriptionCardProps {
  index: number;
  subscription?: Subscription;
  isNew?: boolean;
  isLoading?: boolean;
  onSave: (data: CreateSubscriptionRequest) => void;
  onUpdate?: (id: number, data: UpdateSubscriptionRequest) => void;
  onDelete?: (id: number) => void;
  onCancel?: () => void;
}

const SUB_TYPE_LABELS: Record<SubType, string> = {
  keyword: "關鍵字",
  author: "作者",
  pushsum: "推文數",
};

const SubscriptionCard = ({
  index,
  subscription,
  isNew = false,
  isLoading = false,
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

  const handleSave = () => {
    if (!board.trim() || !value.trim()) return;

    if (isNew) {
      onSave({ board: board.trim(), sub_type: subType, value: value.trim() });
    } else if (subscription?.id && onUpdate) {
      onUpdate(subscription.id, {
        board: board.trim(),
        sub_type: subType,
        value: value.trim(),
        enabled: subscription.enabled,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancel?.();
    } else {
      setBoard(subscription?.board ?? "");
      setSubType(subscription?.sub_type ?? "keyword");
      setValue(subscription?.value ?? "");
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (subscription?.id) {
      onDelete?.(subscription.id);
    }
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

            <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{ color: "white" }}
              >
                取消
              </Button>
              <Button
                variant="outlined"
                onClick={handleSave}
                disabled={isLoading || !board.trim() || !value.trim()}
                sx={{ color: "white", borderColor: "white" }}
              >
                {isNew ? "建立" : "儲存"}
              </Button>
            </Box>
          </Box>
        ) : (
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
              <Typography variant="body2" color="text.secondary">
                {SUB_TYPE_LABELS[subscription?.sub_type ?? "keyword"]}：
                {subscription?.value}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <IconButton onClick={() => setIsEditing(true)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
