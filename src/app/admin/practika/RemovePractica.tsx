"use client";

import { Button } from "@chakra-ui/react";

type RemoveLectionButtonProps = {
  handler: Function;
  id: number;
}

export function RemovePracticaButton({handler, id}: RemoveLectionButtonProps) {
  return (
    <Button onClick={() => handler(id)}>Удалить</Button>
  )
}