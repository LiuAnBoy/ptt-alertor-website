import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Metadata } from "next";

import LoginForm from "@/shared/forms/LoginForm";

export const metadata: Metadata = {
  title: "PTT Alertor | 登入",
  description: "登入 PTT Alertor",
};

export default function LoginPage() {
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
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
}
