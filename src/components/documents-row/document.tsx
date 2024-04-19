"use client";

import { Td, Text, Tr } from "@chakra-ui/react";
import { colors } from "../variables";
import { PiDownload } from "react-icons/pi";

type DocumentProps = {
  handleDownload: Function;
  title: string;
  description: string;
  url: string;
}

export function Document({handleDownload, title, description, url}: DocumentProps) {
  return (
    <Tr>
      <Td>{title}</Td>
      <Td>{description}</Td>
      <Td cursor="pointer">
        <Text color={colors.darkBlue} onClick={() => handleDownload(url)} display="flex" gap="5px">
          Скачать файл <PiDownload/>
        </Text>
      </Td>
    </Tr>
  )
}