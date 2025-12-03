// Test database connection
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // Try to connect
    await prisma.$connect()
    console.log('✅ Database connection successful!')
    
    // Try to query amenities table
    try {
      const count = await prisma.amenity.count()
      console.log(`✅ Amenities table exists with ${count} records`)
    } catch (error) {
      console.log('❌ Amenities table does not exist or error:', error.message)
      console.log('💡 Run: npx prisma db push')
    }
    
    // Try to query categories table
    try {
      const count = await prisma.category.count()
      console.log(`✅ Categories table exists with ${count} records`)
    } catch (error) {
      console.log('❌ Categories table does not exist or error:', error.message)
      console.log('💡 Run: npx prisma db push')
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    console.error('Error code:', error.code)
    console.error('\n💡 Check:')
    console.error('1. Database server is running')
    console.error('2. Connection string in .env is correct')
    console.error('3. Network/firewall allows connection')
    console.error('4. For Supabase: Check if IP is whitelisted')
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()

