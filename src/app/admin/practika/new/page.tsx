"use server";

import { CreatePracticalWorkForm, NotAuth } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const p = new PrismaClient();

export default async function CreatePracticalWork() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const handleSubmit = async (title: string, content: string, variants: string[]) => {
    "use server";

    await p.practicalWork.create({
      data: {
        title: title,
        content: content.toString(),
        isPublished: true,
        variants: {
          create: variants.map(variant => ({ content: variant }))
        }
      }
    });
    return redirect("/admin/practika");
  }

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Новая практическая работа</Text>
        <CreatePracticalWorkForm handleSubmit={handleSubmit}/>
      </Flex>
    </PageLayout>
  )
}
