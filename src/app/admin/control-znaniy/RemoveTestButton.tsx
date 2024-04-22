"use client";

import { Button } from "@chakra-ui/react";

type RemoveLectionButtonProps = {
  handler: Function;
  id: number;
}

export function RemoveTestButton({handler, id}: RemoveLectionButtonProps) {
  return (
    <Button onClick={() => handler(id)}>Удалить</Button>
  )
}