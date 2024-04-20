import { BaseLayout } from "@/layouts";
import { Box, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <BaseLayout>
      <Box p="25px 241px">
        <Text fontSize="md" as="b">© 2024 УЧРЕЖДЕНИЕ ОБРАЗОВАНИЯ "НОВОПОЛЬСКИЙ ГОСУДАРСТВЕННЫЙ АГРАРНО-ЭКОНОМИЧЕСКИЙ КОЛЛЕДЖ"</Text>
      </Box>
    </BaseLayout>
  )
}