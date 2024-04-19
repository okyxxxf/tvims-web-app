"use server";

import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Card, CardBody, Flex, Text, VStack } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const p = new PrismaClient();

export default async function Tests() {
  const tests = await p.test.findMany({});
  const testAttempts = await p.testAttempt.findMany({});
  console.log(testAttempts);


  return (
    <PageLayout>
       <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Раздел контроля знаний</Text>
        <Text fontSize="xl" color={colors.darkBlue} mb="20px">
          В этом разделе представлены тесты по учебному предмету “Теория вероятности и математическая статистика” 
        </Text>
        <VStack align="stretch">
          {tests.map(({id, title}) => (
            <Link href={`control-znaniy/${id}`}>
              <Card>
                <CardBody>
                  <Text>{title}</Text>
                </CardBody>
              </Card>
            </Link>
          ))}
        </VStack>
      </Flex>
    </PageLayout>
  )
};