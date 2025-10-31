import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const existingAdmin = await prisma.admin.findFirst({
    where: {
      role: 'SuperAdmin'
    }
  })

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        nama_admin: 'Adnan Pundong',
        username: 'mugetsu',
        email: 'superadmin@example.com',
        password: hashedPassword,
        role: 'SuperAdmin',
        id_cabang: null
      }
    })
    console.log('SuperAdmin created successfully.')
  } else {
    console.log('SuperAdmin is exist')
  }
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
