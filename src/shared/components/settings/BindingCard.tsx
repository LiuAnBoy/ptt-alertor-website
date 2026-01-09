"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

export interface BindingCardProps {
  serviceName: string;
  icon: ReactNode;
  isBinding: boolean;
  isLoading?: boolean;
  color?: string;
  hoverColor?: string;
  onBind: () => void;
  onUnbind: () => void;
}

/**
 * Reusable card component for service binding status and actions
 */
const BindingCard = ({
  serviceName,
  icon,
  isBinding,
  isLoading = false,
  color = "#1976d2",
  hoverColor = "#1565c0",
  onBind,
  onUnbind,
}: BindingCardProps) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          {icon}
          <Box>
            <Typography variant="h6">{serviceName}</Typography>
            <Typography variant="body2">
              {isBinding ? "已綁定" : "尚未綁定"}
            </Typography>
          </Box>
        </Box>

        {isBinding ? (
          <Button
            variant="outlined"
            color="error"
            onClick={onUnbind}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={16} />}
          >
            解除綁定
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onBind}
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={16} />}
            sx={{
              bgcolor: color,
              "&:hover": { bgcolor: hoverColor },
            }}
          >
            綁定 {serviceName}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BindingCard;
