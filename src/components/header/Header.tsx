"use client";

import { BaseLayout } from "@/layouts";
import { Box, Flex, Link } from "@chakra-ui/react";
import { colors } from "../variables";
import { usePathname } from "next/navigation";

export function Header() {
  const navLinks = [
    {name: "Главная", link: "/home"},
    {name: "Теоритический раздел", link: "/teoria"},
    {name: "Практический раздел", link: "/practika"},
    {name: "Раздел контроля знаний", link: "/control-znaniy"},
    {name: "Вспомогательный раздел", link: "/documents"},
  ];

  const pathname = usePathname();

  return (
    <BaseLayout>
      <Box p="25px 230px">
        <Flex>
          {navLinks.map(({name, link}) => {
            return pathname.includes(link) ? 
              <Link key={link} href={link} color={colors.mainBlue} p="8px 16px" borderBottom={`2px solid ${colors.mainBlue}`}>{name}</Link> 
              : 
              <Link 
              key={link}
              href={link} 
              p="8px 16px" 
              color={colors.black} 
              borderBottom={`2px solid ${colors.black}`} 
              transition="0.4s"
              _hover={{borderBottom: `2px solid ${colors.mainBlue}`, color: colors.mainBlue}}>
                {name}
              </Link> 
          })}
        </Flex>
      </Box>
    </BaseLayout>
  )
}