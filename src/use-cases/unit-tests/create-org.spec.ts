import { it, describe, expect, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { CreateOrgUseCase } from '../create-org'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

let orgRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase // sut = system under test

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgRepository)
  })

  it('Should be able to register as an Org', async () => {
    const { org } = await sut.execute({
      name: 'John Doe Organization',
      owner_name: 'John Doe',
      zip_code: '19800000',
      city: 'City 01',
      email: 'johndoe@example.com',
      street: 'Street 01',
      whatsapp: '123456789',
      password: '12345678',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'John Doe Organization',
      owner_name: 'John Doe',
      zip_code: '19800000',
      city: 'City 01',
      email: 'johndoe@example.com',
      street: 'Street 01',
      whatsapp: '123456789',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      org.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not to be able to register a user with same email', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe Organization',
      owner_name: 'John Doe',
      zip_code: '19800000',
      city: 'City 01',
      email,
      street: 'Street 01',
      whatsapp: '123456789',
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe Organization',
        owner_name: 'John Doe',
        zip_code: '19800000',
        city: 'City 01',
        email,
        street: 'Street 01',
        whatsapp: '123456789',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
