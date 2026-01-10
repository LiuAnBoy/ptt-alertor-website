import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Metadata } from "next";

import ChangePasswordForm from "@/shared/forms/ChangePasswordForm";

export const metadata: Metadata = {
  title: "PTT Alertor | 變更密碼",
  description: "變更 PTT Alertor 帳號密碼",
};

export default function ChangePasswordPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <ChangePasswordForm />
        </Paper>
      </Box>
    </Container>
  );
}
