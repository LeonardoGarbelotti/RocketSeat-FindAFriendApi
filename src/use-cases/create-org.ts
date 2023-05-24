import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface CreateOrgRequest {
  name: string
  owner_name: string
  email: string
  zip_code: string
  city: string
  street: string
  whatsapp: string
  password: string
}

interface CreateOrgResponse {
  org: Org
}

export class CreateOrgUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private orgsRepository: OrgsRepository) { }

  async execute({
    name,
    owner_name,
    email,
    zip_code,
    city,
    street,
    whatsapp,
    password,
  }: CreateOrgRequest): Promise<CreateOrgResponse> {
    // hash of the password with 6 rounds
    const password_hash = await hash(password, 6)

    // check if email already exists
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    // check if email is already in use
    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      name,
      owner_name,
      email,
      zip_code,
      city,
      street,
      whatsapp,
      password_hash,
    })

    return {
      org,
    }
  }
}
