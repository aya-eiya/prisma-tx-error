const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient()
  await prisma.user.deleteMany({})
  await prisma.$transaction([
    prisma.user.updateMany({
      where: {
        email: {
          contains: '@corp.com',
        },
      },
      data: {
        memo: 'corp',
      },
    }),
    prisma.user.update({
      where: {
        id: 1,
      },
      data: {
        memo: 'id is 1',
      },
    }),
  ])
}

main()
