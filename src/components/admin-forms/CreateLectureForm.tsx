"use client"

import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react"
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react"

export type CreateLectureFormProps = {
  handleSubmit: Function;
  titleP?: string;
  contentP?: string;
}

export function CreateLectureForm({handleSubmit, titleP, contentP}: CreateLectureFormProps) {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();

  useEffect(() => {
    if (titleP) setTitle(titleP);
  }, []);

  return (
    <form>
      <FormControl isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Лекция номер 1" />
      </FormControl>
      <FormControl mt={6} isRequired>
        <FormLabel>Контент</FormLabel>
        <Editor
        apiKey='in483scxxvig47c8gl9me6ap0e8dz2l89jcu5keiy7w24n4h'
        value={content}
        initialValue={contentP}
        onChange={(e) => setContent(e.target.getContent())}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      </FormControl>
      <Button width="full" mt={4} onClick={() => handleSubmit(title, content)}>
        Сохранить
      </Button>
    </form>
  )
}