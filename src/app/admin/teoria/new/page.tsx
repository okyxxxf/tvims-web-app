"use server";

import { CreateLectureForm, NotAuth } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const p = new PrismaClient();

export default async function CreateLecture() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const handleSubmit = async (title: string, content: string) => {
    "use server";

    await p.lecture.create({
      data: {
        title: title,
        content: content.toString(),
        isPublished: true,
      }
    });
    return redirect("/admin/teoria");
  }

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Новый теоретический материал</Text>
        <CreateLectureForm handleSubmit={handleSubmit}/>
      </Flex>
    </PageLayout>
  )
}