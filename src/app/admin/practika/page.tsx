"use server";

import { NotAuth } from "@/components";
import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Button, ButtonGroup, Card, CardBody, CardHeader, Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { RemovePracticaButton } from "./RemovePractica";
import { revalidatePath } from "next/cache";

const p = new PrismaClient();

export default async function AdminPractical() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const practicalWorks = await p.practicalWork.findMany({
    where: {
      isPublished: true,
    },
  });

  const deletePracticalWork = async (id: number) => {
    "use server";
    await p.variant.deleteMany({
      where: {
        workId: id
      }
    });

    await p.practicalWork.delete({
      where: {
        id: id
      }
    });
    revalidatePath("/admin/practika", "page");
  }

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Практический раздел</Text>
        <Link href="/admin/practika/new">Добавить новую практическую работу</Link>
        <Flex columnGap="20px" rowGap="10px" wrap="wrap">
          {practicalWorks.map(({title, id}) => (
              <div key={id}>
              <Card w="250px" h="200px" cursor="pointer">
                <CardHeader border={`1px solid ${colors.backgroundMain}`} borderTopRadius="10px">
                  <Link href={`/practika/${id}`} >
                    <Text as="b">{title}</Text>
                  </Link>
                </CardHeader>
                <CardBody >
                  <ButtonGroup>
                    <Link href={`/admin/practika/${id}`}>
                      <Button>Изменить</Button>
                    </Link>
                    <RemovePracticaButton handler={deletePracticalWork} id={id}/>
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
