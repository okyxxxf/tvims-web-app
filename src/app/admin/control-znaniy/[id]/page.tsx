"use server";

import { CreateTestForm, NotAuth } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

const p = new PrismaClient();

export default async function EditTest({params: { id }}: {params: { id: number}}) {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const testToEdit = await p.test.findUnique({
    where: {
      id: +id
    },
    include: {
      questions: {
        include: {
          answers: true
        }
      }
    }
  });

  if (!testToEdit) return notFound();

  const handleSubmit = async (title: string, questions: {title: string, answers: string[], correctAnswerId: number}[]) => {
    "use server";
  
    await p.question.deleteMany({
      where: {
        testId: +id
      }
    });
  
    await p.test.update({
      where: {
        id: +id
      },
      data: {
        title: title,
        questions: {
          create: questions.map((question) => ({
            title: question.title,
            correctAnswerId: question.correctAnswerId,
            answers: {
              create: question.answers.map((answer) => ({
                content: answer,
              }))
            }
          }))
        }
      }
    });
    return redirect("/admin/tests");
  }
  

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Редактировать тест</Text>
        <CreateTestForm 
          handleSubmit={handleSubmit} 
          titleT={testToEdit.title} 
          questionsT={testToEdit.questions.map(question => ({
            title: question.title,
            answers: question.answers.map(answer => answer.content),
            correctAnswerId: question.correctAnswerId
          }))}
        />
      </Flex>
    </PageLayout>
  )
}
