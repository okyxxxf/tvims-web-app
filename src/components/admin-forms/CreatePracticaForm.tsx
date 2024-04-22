"use client";

import { Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react"
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react"

export type CreatePracticalWorkFormProps = {
  handleSubmit: Function;
  titleP?: string;
  contentP?: string;
  variantsP?: string[];
}

export function CreatePracticalWorkForm({handleSubmit, titleP, contentP, variantsP}: CreatePracticalWorkFormProps) {
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const [variants, setVariants] = useState<string[]>([]);

  useEffect(() => {
    if (titleP) setTitle(titleP);
    if (variantsP) setVariants(variantsP);
  }, []);

  const handleVariantChange = (index: number, value: string) => {
    const newVariants = [...variants];
    newVariants[index] = value;
    setVariants(newVariants);
  }

  const handleVariantRemove = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  }

  return (
    <form>
      <FormControl isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Практическая работа номер 1" />
      </FormControl>
      <FormControl mt={6} isRequired>
        <FormLabel>Контент</FormLabel>
        <Editor
        apiKey='in483scxxvig47c8gl9me6ap0e8dz2l89jcu5keiy7w24n4h'
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
      <FormControl mt={6} isRequired>
        <FormLabel>Варианты</FormLabel>
        <VStack spacing={4}>
          {variants.map((variant, index) => (
            <div key={index}>
              <Editor
                apiKey='in483scxxvig47c8gl9me6ap0e8dz2l89jcu5keiy7w24n4h'
                onChange={(e) => handleVariantChange(index, e.target.getContent())}
                initialValue={variant}
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
              <Button onClick={() => handleVariantRemove(index)}>Удалить вариант</Button>
            </div>
          ))}
          <Button onClick={() => setVariants([...variants, ""])}>Добавить вариант</Button>
        </VStack>
      </FormControl>
      <Button width="full" mt={4} onClick={() => handleSubmit(title, content, variants)}>
        Сохранить
      </Button>
    </form>
  )
}
