"use server";

import { CreateTestForm, NotAuth } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const p = new PrismaClient();

export default async function CreateTest() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const handleSubmit = async (title: string, questions: {title: string, answers: string[], correctAnswerId: number}[]) => {
    "use server";

    const test = await p.test.create({
      data: {
        title: title,
      }
    });

    questions.forEach( async (question) =>  {
      const createdQuestion = await p.question.create({
        data: {
          title: question.title,
          testId: test.id,
          correctAnswerId: question.correctAnswerId,
          answers: {
            createMany: {
              data: question.answers.map((a) => ({
                content: a,
              }))
            }
          }
        }
      });
    });

    return redirect("/admin/tests");
  }

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Новый тест</Text>
        <CreateTestForm handleSubmit={handleSubmit}/>
      </Flex>
    </PageLayout>
  )
}
