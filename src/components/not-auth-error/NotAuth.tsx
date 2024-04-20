import { ErrorLayout } from "@/layouts";
import { Button, Flex, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import errorImage from "../../../public/images/error.svg";

export function NotAuth() {
  return (
    <ErrorLayout>
      <Flex align="center" p="30px" gap="50px">
        <VStack align="start" gap="30px">
          <VStack align="start">
            <Text fontSize="2xl" as="b">Ошибка 401</Text>
            <Text>Вы не авторизованны</Text>
          </VStack>
          <Link href="/home">
            <Button>Перейти на главную</Button>
          </Link>
        </VStack>
        <Image src={errorImage.src} height="100" width="100" alt="Error 401"/>
      </Flex>
    </ErrorLayout>
  )
}