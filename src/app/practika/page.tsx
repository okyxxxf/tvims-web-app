"use server";

import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Card, CardBody, CardHeader, Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

export default async function Practika() {
  const practicheskie = await p.practicalWork.findMany({
    where: {
      isPublished: true,
    },
  });

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Практический раздел</Text>
        <Text fontSize="xl" color={colors.darkBlue} mb="20px">
        В этом разделе вы можете ознакомится с практическими заданиями по учебному предмету “Теория вероятности и математическая статистика” 
        </Text>
        <Flex columnGap="20px" rowGap="10px" wrap="wrap">
          {practicheskie.map(({title, id}) => (
            <Link href={`/practika/${id}`} key={id}>
              <Card w="250px" h="200px" cursor="pointer">
                <CardHeader border={`1px solid ${colors.backgroundMain}`} borderTopRadius="10px">
                  <Text as="b">{title}</Text>
                </CardHeader>
                <CardBody >
                  <Text noOfLines={3}>Практическое занятие по теме {title}</Text>
                </CardBody>
              </Card>
            </Link>
          ))}
        </Flex>
      </Flex>
    </PageLayout>
  )
}