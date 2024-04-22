"use client";

import { Td, Text, Tr } from "@chakra-ui/react";
import { colors } from "../variables";
import { PiDownload } from "react-icons/pi";

type DocumentProps = {
  handleDelete: Function;
  title: string;
  description: string;
  id: number;
}

export function AdminDocument({handleDelete, title, description, id}: DocumentProps) {
  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{description}</Td>
      <Td cursor="pointer">
        <Text color={colors.darkBlue} onClick={() => handleDelete(id)} display="flex" gap="5px">
          Удалить файл <PiDownload/>
        </Text>
      </Td>
    </Tr>
  )
}