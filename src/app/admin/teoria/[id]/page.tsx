import { PageLayout } from "@/layouts";
import { Flex, Text } from "@chakra-ui/react";
import { PrismaClient } from "@prisma/client"
import { notFound, redirect } from "next/navigation";
import { CreateLectureForm, NotAuth } from "@/components";
import { getServerSession } from "next-auth";

const p = new PrismaClient();

export default async function Lecture({params: { id }}: {params: { id: number}}) {
  const session = await getServerSession();

  if (!session) return NotAuth();

  const handleSubmit = async (title: string, content: string) => {
    "use server";

    await p.lecture.update({
      where: {
        id: +id
      },
      data: {
        title: title,
        content: content.toString(),
        isPublished: true,
      }
    });
    return redirect("/admin/teoria");
  }

  const lectureToEdit = await p.lecture.findUnique({
    where: {
      id: +id
    }
  });

  if (!lectureToEdit) return notFound();
  
  return (
    <PageLayout>
      <Flex direction="column" gap="10px">
        <Text fontSize="2xl" as="b">Редактировать теоретический материал</Text>
        <CreateLectureForm handleSubmit={handleSubmit} titleP={lectureToEdit.title} contentP={lectureToEdit.content}/>
      </Flex>
    </PageLayout>
  )
}