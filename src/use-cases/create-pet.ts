import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetRequest {
  name: string
  about: string
  age: string
  size: string
  energy: string
  independant: string
  space: string
  requirements: string
  orgId: string
}

interface CreatePetResponse {
  pet: Pet
}

export class CreatePetUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private petsRepository: PetsRepository, private orgsRepository: OrgsRepository) { }

  async execute({
    name,
    about,
    age,
    size,
    energy,
    independant,
    space,
    requirements,
    orgId,
  }: CreatePetRequest): Promise<CreatePetResponse> {
    const org = await this.orgsRepository.findById(orgId)

    // check if org exists
    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independant,
      space,
      requirements,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}
