"use client";

import { Button, Flex, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export type CreateTestFormProps = {
  handleSubmit: Function;
  titleT?: string;
  questionsT?: {title: string, answers: string[], correctAnswerId: number}[];
}

export function CreateTestForm({handleSubmit, titleT, questionsT}: CreateTestFormProps) {
  const [title, setTitle] = useState<string>();
  const [questions, setQuestions] = useState<{title: string, answers: string[], correctAnswerId: number}[]>([]);

  useEffect(() => {
    if (titleT) setTitle(titleT);
    if (questionsT) setQuestions(questionsT);
  }, []);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index].title = value;
    setQuestions(newQuestions);
  }

  const handleAnswerChange = (questionIndex: number, answerIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  }

  const handleCorrectAnswerChange = (questionIndex: number, correctAnswerId: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswerId = correctAnswerId;
    setQuestions(newQuestions);
  }

  const handleQuestionRemove = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  }

  const handleAnswerRemove = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  }

  return (
    <form>
      <FormControl isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Тест номер 1" />
      </FormControl>
      <FormControl mt={6} isRequired>
        <FormLabel>Вопросы</FormLabel>
        <VStack spacing={4}>
          {questions.map((question, questionIndex) => (
            <Flex key={questionIndex} direction="column" gap="10px">
              <Input value={question.title} onChange={(e) => handleQuestionChange(questionIndex, e.target.value)} type="text" placeholder="Вопрос" />
              {question.answers.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <Input value={answer} onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)} type="text" placeholder="Ответ" />
                  <Button onClick={() => handleAnswerRemove(questionIndex, answerIndex)}>Удалить ответ</Button>
                </div>
              ))}
              <Button onClick={() => {
                const newQuestions = [...questions];
                newQuestions[questionIndex].answers.push("");
                setQuestions(newQuestions);
              }}>Добавить ответ</Button>
              <FormLabel>Номер правильного ответа</FormLabel>
              <Input value={question.correctAnswerId} onChange={(e) => handleCorrectAnswerChange(questionIndex, Number(e.target.value))} type="number" placeholder="Номер правильного ответа" />
              <Button onClick={() => handleQuestionRemove(questionIndex)}>Удалить вопрос</Button>
            </Flex>
          ))}
          <Button onClick={() => setQuestions([...questions, {title: "", answers: [""], correctAnswerId: 0}])}>Добавить вопрос</Button>
        </VStack>
      </FormControl>
      <Button width="full" mt={4} onClick={() => handleSubmit(title, questions)}>
        Сохранить
      </Button>
    </form>
  )
}