"use server";

import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Card, CardBody, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const p = new PrismaClient();

export default async function Tests() {
  const tests = await p.test.findMany({});
  const lastTenAttempts = await p.testAttempt.findMany({
    take: 10,
    include: {
      test: true
    },
    orderBy: {id: "desc"}
  });

  return (
    <PageLayout>
       <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Раздел контроля знаний</Text>
        <Text fontSize="xl" color={colors.darkBlue} mb="20px">
          В этом разделе представлены тесты по учебному предмету “Теория вероятности и математическая статистика” 
        </Text>
        <VStack align="stretch">
          {tests.map(({id, title}) => (
            <Link href={`control-znaniy/${id}`} key={id}>
              <Card>
                <CardBody>
                  <Text>{title}</Text>
                </CardBody>
              </Card>
            </Link>
          ))}
        </VStack>
        <TableContainer marginTop="30px">
          <Text fontSize="xl" as="b">Последние результаты</Text>
          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>ФИО</Th>
                <Th>Название теста</Th>
                <Th>Результат</Th>
              </Tr>
            </Thead>
            <Tbody>
              {lastTenAttempts.map(({name, test, id, correctAnswersCount, questionCount}) => (
                <Tr key={id}>
                  <Td>{name}</Td>
                  <Td>{test.title}</Td>
                  <Td>{`${correctAnswersCount} из ${questionCount}`}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </PageLayout>
  )
};