"use server";

import { colors } from "@/components/variables";
import { PageLayout } from "@/layouts";
import { Card, CardBody, CardHeader, Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client";
import parse from 'html-react-parser';

const p = new PrismaClient();

export default async function Teoria() {
  const lectures = await p.lecture.findMany({
    where: {
      isPublished: true,
    },
  });

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Теоретический раздел</Text>
        <Text fontSize="xl" color={colors.darkBlue} mb="20px">
          В этом разделе вы можете ознакомится с лекциями по учебному предмету “Теория вероятности и математическая статистика”
        </Text>
        <Flex columnGap="20px" rowGap="10px" wrap="wrap">
          {lectures.map(({title, id}) => (
            <Link href={`/teoria/${id}`} key={id}>
              <Card w="250px" h="200px" cursor="pointer">
                <CardHeader border={`1px solid ${colors.backgroundMain}`} borderTopRadius="10px">
                  <Text as="b">{title}</Text>
                </CardHeader>
                <CardBody>
                  Теоретический материал по теме "{title}"
                </CardBody>
              </Card>
            </Link>
          ))}
        </Flex>
      </Flex>
    </PageLayout>
  )
}