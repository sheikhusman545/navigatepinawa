// Test inserting data directly
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testInsert() {
  try {
    console.log('Testing database connection and insert...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Connected to database')
    
    // Try to create an amenity
    try {
      const amenity = await prisma.amenity.create({
        data: {
          name: 'Test WiFi',
          icon: '📶',
          status: 'Active',
        },
      })
      console.log('✅ Successfully created amenity:', amenity)
      
      // Clean up - delete the test amenity
      await prisma.amenity.delete({
        where: { id: amenity.id },
      })
      console.log('✅ Test amenity deleted')
    } catch (insertError) {
      console.error('❌ Error creating amenity:', insertError.message)
      console.error('Error code:', insertError.code)
      console.error('Error meta:', insertError.meta)
    }
    
    // Check existing amenities
    const count = await prisma.amenity.count()
    console.log(`📊 Total amenities in database: ${count}`)
    
    if (count > 0) {
      const amenities = await prisma.amenity.findMany({ take: 5 })
      console.log('📋 Sample amenities:', amenities)
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('Error code:', error.code)
  } finally {
    await prisma.$disconnect()
  }
}

testInsert()

