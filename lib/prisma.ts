import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient | undefined

try {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({
      log: ['error'],
    })
  } else {
    if (!globalForPrisma.prisma) {
      globalForPrisma.prisma = new PrismaClient({
        log: isDevelopment ? ['query', 'error', 'warn'] : ['error'],
      })
    }
    prisma = globalForPrisma.prisma
  }
} catch (error) {
  // Prisma Client might not be available during build
  console.warn('Prisma Client initialization failed:', error)
  prisma = undefined
}

export { prisma }

