"use server";

import { NotAuth } from "@/components";
import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { RemoveTestButton } from "./RemoveTestButton";

const p = new PrismaClient();

export default async function AdminTest() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const tests = await p.test.findMany({});

  const deleteTest = async (id: number) => {
    "use server";

    const questions = await p.question.findMany({
      where: {
        testId: id,
      },
    });
  
    questions.forEach(async (question) => {
      await p.answer.deleteMany({
        where: {
          questionId: question.id,
        },
      });
    });

    await p.testAttempt.deleteMany({
      where: {
        testId: id,
      }
    })

    await p.question.deleteMany({
      where: {
        testId: id,
      },
    });

    await p.test.delete({
      where: {
        id: id
      }
    });

    revalidatePath("/admin/control-znaniy", "page");
  }

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Тестовый раздел</Text>
        <Link href="/admin/control-znaniy/new">Добавить новый тест</Link>
        <Flex columnGap="20px" rowGap="10px" wrap="wrap">
          {tests.map(({title, id}) => (
              <div key={id}>
                <Card w="250px" h="200px" cursor="pointer">
                  <CardHeader border={`1px solid ${colors.backgroundMain}`} borderTopRadius="10px">
                    <Link href={`/control-znaniy/${id}`} >
                      <Text as="b">{title}</Text>
                    </Link>
                  </CardHeader>
                  <CardBody >
                    <ButtonGroup>
                      <Link href={`/admin/control-znaniy/${id}`}>
                        <Button>Изменить</Button>
                      </Link>
                      <RemoveTestButton handler={deleteTest} id={id}/>
                    </ButtonGroup>
                  </CardBody>
                </Card>
              </div>
          ))}
        </Flex>
      </Flex>
    </PageLayout>
  )
}
