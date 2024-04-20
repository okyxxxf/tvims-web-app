import { NotAuth } from "@/components";
import { PageLayout } from "@/layouts";
import { Flex, Link, Text, VStack } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

export default async function MainAdmin() {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const adminLinks = [
    {name: "Теоретический раздел", link: "/admin/teoria"},
    {name: "Практический раздел", link: "/admin/practika"},
    {name: "Раздел контроля знаний", link: "/admin/control-znaniy"},
    {name: "Вспомогательный раздел", link: "/admin/documents"},
  ];

  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Административная панель</Text>
        <VStack align="start">
          {adminLinks.map(({name, link}) => (
            <Link href={link} key={link}>
              {name}
            </Link>
          ))}
        </VStack>
      </Flex>
    </PageLayout>
  );
}