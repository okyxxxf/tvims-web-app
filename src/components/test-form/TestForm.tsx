"use client"

import { Box, Button, Input, Radio, RadioGroup, Text, VStack } from "@chakra-ui/react"
import { useState } from "react";

export type question = {
  title: string;
  correctAnswerId: number;
  id: number;
  answers: [{
    content: string;
    id: number;
  }]
}

type TestFormProps = {
  questions: question[];
  handleTestSubmit: Function;
}

export function TestForm({handleTestSubmit, questions}: TestFormProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<[{questionId: string, isCorrect: boolean}] | []>([]);
  const [name, setName] = useState<string>();

  const handleChangeAnswer = (id: number, correctId: number, questionId: number) => {
    const isCorrect = id === correctId;
  
    const updatedAnswer = { questionId: String(questionId), isCorrect };
  
    const result = () => {
      const existingAnswerIndex = selectedAnswers?.findIndex((answer) => answer.questionId === String(questionId));
  
      if (existingAnswerIndex !== -1 && selectedAnswers) {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[existingAnswerIndex] = updatedAnswer;
        return updatedAnswers;
      } else {
        return [...selectedAnswers, updatedAnswer];
      }
    }
    setSelectedAnswers(result() as [{questionId: string, isCorrect: boolean}]);
  };
  

  return (
    <Box>
      <VStack align="start" gap="15px">
        <Text as="b">Введите фио</Text>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Иванов Иван Иванович"/>
        {questions.map(({title, answers, correctAnswerId, id}) => (
          <Box key={id}>
            <Text fontSize="xl" as="b">{title}</Text>
            <RadioGroup>
              <VStack align="start">
                {answers.map((answer, i) => (
                  <Radio 
                    key={answer.id} 
                    value={answer.id.toString()}
                    onChange={() => handleChangeAnswer(i + 1, correctAnswerId, id)}>
                      {answer.content}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </Box>
        ))}
        <Button onClick={() => handleTestSubmit(selectedAnswers, name)}>Завершить тест</Button>
      </VStack>
    </Box>
  )
}