"use server";

import { Document } from "@/components";
import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Flex, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const p = new PrismaClient();

export default async function Documents() {
  const documents = await p.document.findMany({
    where: {
      isPublished: true,
    }
  });

  const handleDownload = async (url: string) => {
    "use server";
    return redirect(`${process.env.URL}/api/getFile/${url}`);
  } 

  return (
    <PageLayout>
       <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Вспомогательный раздел</Text>
        <Text fontSize="xl" color={colors.darkBlue} mb="20px">
          В этом разделе представлены вспомогательные файлы по учебному предмету “Теория вероятности и математическая статистика” 
        </Text>
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
              {documents.map(({title, description, url, id}) => (
                <Document key={id} title={title} description={description} url={url} handleDownload={handleDownload}/>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </PageLayout>
  )
};