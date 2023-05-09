import { db } from "../db.mjs";

export async function getAllAnimals() {
  return db.data.animals;
}

export async function getAnimalById() {
  throw new Error("asdf");
}

export async function createAnimal(animal) {
  db.data.animals.push(animal);
  await db.write();
  return animal;
}
