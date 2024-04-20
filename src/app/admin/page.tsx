"use server";

import { AdminSignInForm } from "@/components";
import { PageLayout } from "@/layouts";
import { Box, Flex, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

export default async function AdminSignIn() {
  return (
    <Box>
      <PageLayout>
        <Flex width="full" align="center" justifyContent="center">
          <Box p={2}>
            <Box textAlign="center">
              <Text fontSize="3xl" as="b">Авторизация</Text>
            </Box>
            <Box my={4} textAlign="left">
              <AdminSignInForm/>
            </Box>
          </Box>
        </Flex>
      </PageLayout>
    </Box>
  )
};