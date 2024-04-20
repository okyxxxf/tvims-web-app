import { PageLayout } from "@/layouts";
import { Flex, Link, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client"
import { notFound } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import parse from 'html-react-parser';

const p = new PrismaClient();

export default async function Lecture({params: { id }}: {params: { id: number}}) {
  const lecture = await p.lecture.findUnique({
    where: {
      id: +id
    },
    select: {
      title: true, content: true,
    }
  });

  if (!lecture) return notFound();

  const {title, content} = lecture;
  
  return (
    <PageLayout>
      <Flex direction="column" gap="30px">
        <Link href="/teoria">
          <IoArrowBack/>
        </Link>
        <Text fontSize="2xl" as="b">{title}</Text>
        {parse(content)}
      </Flex>
    </PageLayout>
  )
}