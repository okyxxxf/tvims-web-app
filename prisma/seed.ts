import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const P = new PrismaClient();

for (let i = 0; i < 10; i++) {
  P.lecture.create({
    data: {title: faker.word.adjective(), content: faker.lorem.lines({min: 5, max: 12}), isPublished: true}
  }).then((value) => console.log("Success create with values" + value));
}