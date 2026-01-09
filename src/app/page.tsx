import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: "calc(100dvh - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            公告
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            如果喜歡 Ptt Alertor，可以捐些 P 幣給{" "}
            <Typography component="span" fontWeight="bold">
              ChoDino
            </Typography>
            （原作者）喔！
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            此為伺服器擁有者{" "}
            <Typography component="span" fontWeight="bold">
              LiuAnBoy
            </Typography>{" "}
            自架版本，僅留下我需要的 Telegram
            功能，若有安全疑慮請立即停止使用，本人無法擔保此服務會永遠運作。
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            © 2017 Ptt Alertor.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
