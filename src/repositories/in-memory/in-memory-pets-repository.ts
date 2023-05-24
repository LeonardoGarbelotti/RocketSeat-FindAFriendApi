import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      age: data.age,
      size: data.size,
      energy: data.energy,
      independant: data.independant,
      space: data.space,
      requirements: data.requirements ?? null,
      org_id: data.org_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
