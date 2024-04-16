import { Box } from "@chakra-ui/react";

type BaseLayoutProps = {
  children: React.ReactNode;
}

export function BaseLayout({children}: BaseLayoutProps) {
  return (
    <Box maxW="1440px" m="auto">{children}</Box>
  )
}