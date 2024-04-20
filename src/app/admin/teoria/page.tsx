"use server";

import { NotAuth } from "@/components";
import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const p = new PrismaClient();


export default async function AdminTeoria() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const lectures = await p.lecture.findMany({
    where: {
      isPublished: true,
    },
  });

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Теоретический раздел</Text>
        <Link href="/admin/teoria/new">Добавить новый теоретический материал</Link>
        <Flex columnGap="20px" rowGap="10px" wrap="wrap">
          {lectures.map(({title, id}) => (
            <Link href={`/teoria/${id}`} key={id}>
              <Card w="250px" h="200px" cursor="pointer">
                <CardHeader border={`1px solid ${colors.backgroundMain}`} borderTopRadius="10px">
                  <Text as="b">{title}</Text>
                </CardHeader>
                <CardBody >
                  <ButtonGroup>
                    <Button>Изменить</Button>
                    <Button>Удалить</Button>
                  </ButtonGroup>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Flex>
      </Flex>
    </PageLayout>
  )
}