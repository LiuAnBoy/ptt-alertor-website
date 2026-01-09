"use client";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

const CodeBlock = ({ children }: { children: ReactNode }) => (
  <Box
    component="code"
    sx={{
      display: "block",
      bgcolor: "grey.900",
      color: "grey.100",
      p: 1.5,
      borderRadius: 1,
      fontFamily: "monospace",
      fontSize: "0.875rem",
      my: 1,
      overflowX: "auto",
      whiteSpace: "pre-wrap",
    }}
  >
    {children}
  </Box>
);

const InlineCode = ({ children }: { children: ReactNode }) => (
  <Box
    component="code"
    sx={{
      bgcolor: "grey.200",
      color: "grey.800",
      px: 0.75,
      py: 0.25,
      borderRadius: 0.5,
      fontFamily: "monospace",
      fontSize: "0.875rem",
    }}
  >
    {children}
  </Box>
);

const ExampleItem = ({ match, text }: { match: boolean; text: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, my: 0.5 }}>
    {match ? (
      <CheckIcon color="success" fontSize="small" />
    ) : (
      <CloseIcon color="error" fontSize="small" />
    )}
    <Typography
      variant="body2"
      fontFamily="monospace"
      sx={{ color: "#c0c0c0" }}
    >
      {text}
    </Typography>
  </Box>
);

const Section = ({
  chip,
  chipColor,
  title,
  children,
}: {
  chip?: string;
  chipColor?: "primary" | "warning" | "error" | "secondary";
  title: string;
  children: ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      {chip && <Chip label={chip} color={chipColor} size="small" />}
      <Typography variant="subtitle1" fontWeight="medium">
        {title}
      </Typography>
    </Box>
    {children}
  </Box>
);

export default function DocsPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 3 }}
          color="text.secondary"
        >
          使用教學
        </Typography>

        {/* 進階比對 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            進階比對
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Section chip="&" chipColor="primary" title="同時出現">
            <CodeBlock>新增 drama-ticket 售&杰倫</CodeBlock>
            <Typography variant="body2" gutterBottom>
              標題同時出現「售」和「杰倫」的才會通知
            </Typography>
            <ExampleItem match={true} text="[售票] 杰倫地表最強演唱會" />
            <ExampleItem match={false} text="[售票] 阿妹 烏托邦" />
          </Section>

          <Section chip="!" chipColor="warning" title="排除關鍵字">
            <CodeBlock>新增 gossiping !問卦</CodeBlock>
            <Typography variant="body2">
              除了「問卦」以外的文章全部通知
            </Typography>
          </Section>

          <Section chip="&!" chipColor="error" title="出現 A 但排除 B">
            <CodeBlock>新增 gossiping 柯文哲&!問卦</CodeBlock>
            <Typography variant="body2" gutterBottom>
              標題出現「柯文哲」且不是「問卦」的才會通知
            </Typography>
            <ExampleItem match={false} text="[問卦] 柯文哲..." />
            <ExampleItem match={true} text="[新聞] 柯文哲..." />
            <ExampleItem match={true} text="[爆卦] 柯文哲..." />
          </Section>

          <Section chip="regexp" chipColor="secondary" title="正規表示式">
            <CodeBlock>
              新增 hardwaresale regexp:\\[賣/(台中|台北)/.*\\]?(RAM|ram)+.*
            </CodeBlock>
            <Typography variant="body2">
              使用正規表示式進行複雜的比對
            </Typography>
          </Section>
        </Paper>

        {/* 通知看板所有文章 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            通知看板所有文章的三種方法
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <CodeBlock>
            {`新增 lifeismoney [
新增 lifeismoney !嘂
新增 lifeismoney regexp:.*`}
          </CodeBlock>
        </Paper>

        {/* 批量編輯 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            批量編輯
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Section title="萬用字元">
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
              <Box>
                <InlineCode>**</InlineCode>
                <Typography variant="body2">所有看板</Typography>
              </Box>
              <Box>
                <InlineCode>*</InlineCode>
                <Typography variant="body2">所有關鍵字或作者</Typography>
              </Box>
            </Box>
          </Section>

          <Section title="刪除特定板所有關鍵字">
            <CodeBlock>
              {`刪除 gossiping *
刪除 gossiping,ezsoft *`}
            </CodeBlock>
          </Section>

          <Section title="刪除特定關鍵字在所有看板">
            <CodeBlock>
              {`刪除 ** 樂透
刪除 ** 樂透,閒聊`}
            </CodeBlock>
          </Section>

          <Section title="刪除全部設定">
            <CodeBlock>刪除 ** *</CodeBlock>
            <Typography variant="body2" sx={{ mt: 1 }}>
              刪除作者亦同：
            </Typography>
            <CodeBlock>
              {`刪除作者 gossiping *
刪除作者 ** chodino
刪除作者 ** *`}
            </CodeBlock>
          </Section>

          <Section title="取消所有推/噓文數通知">
            <CodeBlock>
              {`新增推文數 ** 0
新增噓文數 ** 0`}
            </CodeBlock>
          </Section>

          <Section title="在所有追蹤的看板加入設定">
            <CodeBlock>
              {`新增 ** 尋人
新增作者 ** chodino
新增推文數 ** 100`}
            </CodeBlock>
          </Section>
        </Paper>

        {/* 指令列 */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            指令列
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Section title="語法">
            <CodeBlock>
              {"<add|del> <-flag <argument>> <board> [board...]"}
            </CodeBlock>
          </Section>

          <Section title="參數說明">
            <Typography variant="body2" gutterBottom>
              多個看板以半形逗號(,)或空白( )分隔皆可
            </Typography>
            <Box component="ul" sx={{ pl: 2, "& li": { mb: 0.5 } }}>
              <li>
                <InlineCode>-k, --keyword</InlineCode>{" "}
                <Typography component="span" variant="body2">
                  關鍵字
                </Typography>
              </li>
              <li>
                <InlineCode>-a, --author</InlineCode>{" "}
                <Typography component="span" variant="body2">
                  作者
                </Typography>
              </li>
              <li>
                <InlineCode>-p, --push</InlineCode>{" "}
                <Typography component="span" variant="body2">
                  推文數
                </Typography>
              </li>
              <li>
                <InlineCode>-b, --boo</InlineCode>{" "}
                <Typography component="span" variant="body2">
                  噓文數
                </Typography>
              </li>
            </Box>
          </Section>

          <Section title="範例">
            <Typography variant="body2" gutterBottom>
              新增關鍵字、作者、推噓文數
            </Typography>
            <CodeBlock>
              add -k ptt -a chodino -p 10 -b 10 ezsoft gossiping
            </CodeBlock>

            <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
              結合進階比對
            </Typography>
            <CodeBlock>
              add -k ptt&alertor,idea -a chodino,ronnywang ezsoft
            </CodeBlock>

            <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
              使用長旗標值
            </Typography>
            <CodeBlock>
              {`del --keyword ptt --author chodino ezsoft gossiping
del --keyword=ptt --author=chodino ezsoft gossiping`}
            </CodeBlock>

            <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
              結合批次編輯
            </Typography>
            <CodeBlock>
              {`del -k * -a * **
add -p 0 -b 0 **`}
            </CodeBlock>
          </Section>
        </Paper>

        {/* 其他指令 */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            其他指令
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Chip label="/list" variant="outlined" />
            <Typography variant="body2">清單</Typography>
            <Chip label="/help" variant="outlined" />
            <Typography variant="body2">指令</Typography>
            <Chip label="/ranking" variant="outlined" />
            <Typography variant="body2">排名</Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
