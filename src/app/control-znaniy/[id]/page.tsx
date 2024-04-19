"use server"

import { TestForm, question } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Link,Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client"
import { notFound, redirect } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const p = new PrismaClient();

export default async function Test({params: { id }}: {params: { id: number}}) {
  const test = await p.test.findUnique({
    where: {
      id: +id
    },
    include: {
      questions: {
        include: {
          answers: true,
        }
      }
    }
  });
  console.log(test)

  if (!test) return notFound();
  const {title, questions} = test;

  const handleTestSubmit = async (value: [{questionId: string, isCorrect: boolean}]) => {
    "use server";
    
    const testAttempt = await p.testAttempt.create({
      data: {
        name: "TestUser",
        testId: +id,
        correctAnswersCount: value.filter((question) => question.isCorrect).length,
        questionCount: value.length,
      }
    });

    return redirect("/control-znaniy");
  };

  return (
    <PageLayout>
      <Flex direction="column" gap="30px">
        <Link href="/control-znaniy">
          <IoArrowBack/>
        </Link>
        <Text fontSize="2xl" as="b">{title}</Text>
          <TestForm questions={questions as never as question[]} handleTestSubmit={handleTestSubmit}/>
      </Flex>
    </PageLayout>
  )
}
