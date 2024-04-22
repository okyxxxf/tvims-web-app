"use server";

import { AdminDocument, NotAuth } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Link, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const p = new PrismaClient();

export default async function Documents() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const documents = await p.document.findMany({
    where: {
      isPublished: true,
    }
  });

  const handleDelete = async (id: number) => {
    "use server";
    await p.document.delete({
      where: {
        id: id
      }
    });
    revalidatePath("/admin/documents", "page");
  } 

  return (
    <PageLayout>
       <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Дополнительная документация</Text>
        <Link href="/admin/documents/new">Добавить новый документ</Link>
        <TableContainer>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Наименование</Th>
                <Th>Описание</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.map(({title, description, id}) => (
                <AdminDocument key={id} title={title} id={id} description={description} handleDelete={handleDelete}/>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </PageLayout>
  )
};