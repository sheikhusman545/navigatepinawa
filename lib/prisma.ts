import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prisma: PrismaClient | undefined

// Check if DATABASE_URL is set
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  console.error('⚠️ DATABASE_URL environment variable is not set!')
  console.error('Please set DATABASE_URL in your environment variables.')
  console.error('For Vercel: Go to Settings → Environment Variables')
} else {
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
    
    // Test connection on initialization (only in production/serverless)
    if (process.env.NODE_ENV === 'production') {
      // Don't await here, just log that we're initializing
      console.log('✅ Prisma Client initialized with DATABASE_URL')
    } else {
      // In development, log connection info
      console.log('✅ Prisma Client initialized')
      console.log('DATABASE_URL format:', databaseUrl ? `${databaseUrl.substring(0, 30)}...` : 'NOT SET')
    }
  } catch (error: any) {
    // Prisma Client might not be available during build
    console.error('❌ Prisma Client initialization failed:', error?.message || error)
    console.error('DATABASE_URL format:', databaseUrl ? `${databaseUrl.substring(0, 20)}...` : 'NOT SET')
    prisma = undefined
  }
}

export { prisma }

