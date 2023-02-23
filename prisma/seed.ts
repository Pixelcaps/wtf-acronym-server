import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('1234567890', 10);
  const file = 'acronyms.json';

  await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: hash,
    },
  });

  fs.readFile(file, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      Logger.error(err);
    }

    const formattedData = JSON.parse(data).map((acronym) => {
      const entry = Object.entries(acronym)[0];
      return {
        acronym: entry[0],
        definition: entry[1],
      };
    });

    formattedData.forEach(async (data) => {
      await prisma.acronym.create({
        data: {
          acronym: data.acronym,
          definition: data.definition,
        },
      });
    });
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
