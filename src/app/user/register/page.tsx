import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Metadata } from "next";

import RegisterForm from "@/shared/forms/RegisterForm";

export const metadata: Metadata = {
  title: "PTT Alertor | 註冊",
  description: "註冊 PTT Alertor",
};

export default function RegisterPage() {
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
          <RegisterForm />
        </Paper>
      </Box>
    </Container>
  );
}
