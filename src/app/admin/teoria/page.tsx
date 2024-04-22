"use server";

import { NotAuth } from "@/components";
import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Box, Button, ButtonGroup, Card, CardBody, CardHeader, Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { RemoveLectionButton } from "./RemoveLecture";
import { revalidatePath } from "next/cache";

const p = new PrismaClient();


export default async function AdminTeoria() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const lectures = await p.lecture.findMany({
    where: {
      isPublished: true,
    },
  });

  const deleteLecture = async (id: number) => {
    "use server";
    await p.lecture.delete({
      where: {
        id: id
      }
    });
    revalidatePath("/admin/teoria", "page");
  }

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Теоретический раздел</Text>
        <Link href="/admin/teoria/new">Добавить новый теоретический материал</Link>
        <Flex columnGap="20px" rowGap="10px" wrap="wrap">
          {lectures.map(({title, id}) => (
              <div key={id}>
              <Card w="250px" h="200px" cursor="pointer">
                <CardHeader border={`1px solid ${colors.backgroundMain}`} borderTopRadius="10px">
                  <Link href={`/teoria/${id}`} >
                    <Text as="b">{title}</Text>
                  </Link>
                </CardHeader>
                <CardBody >
                  <ButtonGroup>
                    <Link href={`/admin/teoria/${id}`}>
                      <Button>Изменить</Button>
                    </Link>
                    <RemoveLectionButton handler={deleteLecture} id={id}/>
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