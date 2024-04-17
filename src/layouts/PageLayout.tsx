import { Box } from "@chakra-ui/react";
import { BaseLayout } from "./BaseLayout";
import { colors } from "@/components/variables";

type PageLayoutProps = {
  children: React.ReactNode;
}

export function PageLayout({children}: PageLayoutProps) {
  return (
    <Box bgColor={colors.backgroundMain} p="50px 100px" minH="calc(100vh - 92px)">
      <BaseLayout>
        <Box borderRadius="10px" p="30px" bgColor={colors.white}>
          {children}
        </Box>
      </BaseLayout>
    </Box>
  )
}