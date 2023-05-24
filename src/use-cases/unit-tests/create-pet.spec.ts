import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { CreatePetUseCase } from '../create-pet'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let orgRepository: InMemoryOrgsRepository
let petRepository: InMemoryPetsRepository
let sut: CreatePetUseCase // sut = system under test

describe('Create Pet Use Case', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgsRepository()
    petRepository = new InMemoryPetsRepository()
    sut = new CreatePetUseCase(petRepository, orgRepository)

    await orgRepository.create({
      id: 'org-01',
      name: 'John Doe Organization',
      owner_name: 'John Doe',
      zip_code: '19800000',
      city: 'City 01',
      email: 'johndoe@example.com',
      street: 'Street 01',
      whatsapp: '123456789',
      password_hash: '12345678',
    })
  })

  it('Should be able to register a new pet', async () => {
    const { pet } = await sut.execute({
      name: 'John Doe Pet',
      about: 'Im a cat',
      age: 'cub',
      energy: 'high',
      independant: 'high indenpency',
      requirements: 'Needs a lot of attention',
      size: 'small',
      space: 'does not need space',
      orgId: 'org-01',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('Should be able to register a new pet with an inexistent ORG', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe Pet',
        about: 'Im a cat',
        age: 'cub',
        energy: 'high',
        independant: 'high indenpency',
        requirements: 'Needs a lot of attention',
        size: 'small',
        space: 'does not need space',
        orgId: 'org-02',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
