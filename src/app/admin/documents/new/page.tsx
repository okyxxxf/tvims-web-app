"use server";

import { CreateDocumentForm, NotAuth } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";

const p = new PrismaClient();

export default async function NewDocument() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Новый дополнительный документ</Text>
        <CreateDocumentForm/>
      </Flex>
    </PageLayout>
  )
}