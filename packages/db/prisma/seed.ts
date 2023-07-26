import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const exampleUser = await prisma.user.upsert({
    where: {
      id: 'example_user_id',
    },
    update: {},
    create: {
      id: 'example_user_id',
      email: 'example@example.com',
      name: 'example_name',
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
