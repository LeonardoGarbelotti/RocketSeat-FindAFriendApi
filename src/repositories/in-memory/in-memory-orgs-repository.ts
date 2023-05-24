import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      owner_name: data.owner_name,
      email: data.email,
      zip_code: data.zip_code,
      city: data.city,
      street: data.street,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string) {
    // search in the array an email like the params
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    // search in the array an id like the params
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
