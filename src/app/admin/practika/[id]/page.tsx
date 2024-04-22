"use server";

import { PageLayout } from "@/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client"
import { notFound, redirect } from "next/navigation";
import { CreatePracticalWorkForm, NotAuth } from "@/components";
import { getServerSession } from "next-auth";

const p = new PrismaClient();

export default async function PracticalWork({params: { id }}: {params: { id: number}}) {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const handleSubmit = async (title: string, content: string, variants: string[]) => {
    "use server";
    await p.variant.deleteMany({
      where: {
        workId: +id
      }
    });

    await p.practicalWork.update({
      where: {
        id: +id
      },
      data: {
        title: title,
        content: content,
        isPublished: true,
        variants: {
          create: variants.map(variant => ({ content: variant }))
        }
      }
    });
    return redirect("/admin/practika");
  }

  const practicalWorkToEdit = await p.practicalWork.findUnique({
    where: {
      id: +id
    },
    include: {
      variants: true
    }
  });

  if (!practicalWorkToEdit) return notFound();
  
  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Редактировать практическую работу</Text>
        <CreatePracticalWorkForm handleSubmit={handleSubmit} titleP={practicalWorkToEdit.title} contentP={practicalWorkToEdit.content} variantsP={practicalWorkToEdit.variants.map(variant => variant.content)}/>
      </Flex>
    </PageLayout>
  )
}
