"use client";

import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

export function CreateDocumentForm() {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>()
  const [file, setFile] = useState<File>();

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) setFile(files[0]);
  }

  const submitHandler = async () => {
    if (!file || !title || !description) return;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
  
    const response = await fetch('/api/uploadFile', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
        file: {
          name: file.name,
          data: buffer.toString('base64'),
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      console.log('File uploaded successfully');
    } else {
      console.error('File upload failed');
    }
  }

  return (
    <form onSubmit={() => submitHandler()}>
      <FormControl isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text"/>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Описание</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} type="text"/>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Файл</FormLabel>
        <Input type="file" onChange={(e) => handleFile(e)}/>
      </FormControl>
      <Button marginTop="10px" type="submit">Сохранить</Button>
    </form>
  )
}