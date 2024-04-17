import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const p = new PrismaClient();

const removeOld = async () => {
  await p.variant.deleteMany({});
  await p.practicalWork.deleteMany({});
  await p.lecture.deleteMany({});
  await p.document.deleteMany({});
}

removeOld().then(() => {
  for (let i = 0; i < 10; i++) {
    p.lecture.create({
      data: {title: faker.word.adjective(), content: faker.lorem.lines({min: 5, max: 12}), isPublished: true}
    }).then((value) => console.log("Success create with values" + value));
  }
  
  for (let i = 0; i < 10; i++) {
    p.practicalWork.create({
      data: {title: faker.word.adjective(), content: faker.lorem.lines({min: 5, max: 12}), isPublished: true}
    }).then((value) => {
      [1,2,4,5,2,213,21,3].forEach(async () => {
         await p.variant.create({
          data: {
            workId: value.id,
            content: faker.lorem.lines(4),
          }
         }).then(() => console.log("Succes create variat for practical work"))
      })
    });
  }
})