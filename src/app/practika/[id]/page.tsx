import { PageLayout } from "@/layouts";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const p = new PrismaClient();

export default async function Work({params: { id }}: {params: { id: number}}) {
  const practicalWork = await p.practicalWork.findUnique({
    where: {
      id: +id
    },
    select: {
      title: true, content: true, variants: true
    }
  });

  if (!practicalWork) return notFound();

  const {title, content, variants} = practicalWork;
  return (
    <PageLayout>
      <Flex direction="column" gap="30px">
        <Link href="/practika">
          <IoArrowBack/>
        </Link>
        <Text fontSize="2xl" as="b">{title}</Text>
        <Text>{content}</Text>
        <Accordion allowMultiple>
          {variants.map(({content}, i) => (
            <AccordionItem key={i}>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Вариант {i + 1}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
                <AccordionPanel pb={4}>
                  {content}
                </AccordionPanel>
                </AccordionItem>
          ))}
        </Accordion>
      </Flex>
    </PageLayout>
  )
}