import { Box } from "@chakra-ui/react";
import { colors } from "@/components/variables";

type ErrorLayoutProps = {
  children: React.ReactNode;
}

export function ErrorLayout({children}: ErrorLayoutProps) {
  return (
    <Box bgColor={colors.backgroundMain} p="50px 100px" minH="calc(100vh - 166px)">
      <Box maxW="600px" m="auto">
        <Box borderRadius="10px" p="30px" bgColor={colors.white}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}