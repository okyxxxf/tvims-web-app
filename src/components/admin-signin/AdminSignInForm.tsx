"use client";

import { signIn } from "next-auth/react";
import { Button, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function AdminSignInForm() {
  const [login, setLogin] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [errorMes, setErrorMes] = useState<string | null>(null);

  useEffect(() => {
    setErrorMes(null);
  },[login, password])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await signIn('credentials', { 
      redirect: false, 
      username: login, 
      password: password 
    });

    if (response?.error) {
      setErrorMes("Неверные данные")
    } else {

    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Логин</FormLabel>
        <Input value={login} onChange={(e) => setLogin(e.target.value)} type="text" placeholder="ngaek-admin" />
      </FormControl>
      <FormControl mt={6} isRequired>
        <FormLabel>Пароль</FormLabel>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*******" />
      </FormControl>
      <Text color="red">{errorMes}</Text>
      <Button width="full" mt={4} type="submit">
        Войти
      </Button>
    </form>
  )
};
