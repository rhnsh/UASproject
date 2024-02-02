import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const removeAllTestGeckos = async () => {
  await prismaClient.gecko.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.gecko.create({
    data: {
      morph: "morph nya apa",
        induk_jantan: "morph induk jantan nya apa",
        induk_betina: "morph induk betina nya apa",
        dob: "kapan tanggal lahirnya",
        kelas_albino: "dari kelas apa",
        jenis_kelamin: "apa jenis kelaminnya"
    },
  });
};

export const createManyTestGeckos = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.gecko.create({
      data: {
        morph: `test`,
        induk_jantan: `test ${i}`,
        induk_betina: `test ${i}`,
        dob: `test${i}`,
        kelas_albino: `bell${i}`,
        jenis_kelamin: `jantan${i}`,
      },
    });
  }
};
