import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all amenities
export async function GET() {
  try {
    // Check if Prisma is available
    if (!prisma) {
      console.error('Prisma client is not available')
      return NextResponse.json(
        { 
          error: 'Database not configured',
          message: 'Prisma client initialization failed'
        },
        { status: 503 }
      )
    }

    // Test connection
    try {
      await prisma.$connect()
    } catch (connectError: any) {
      console.error('Database connection error:', connectError)
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          message: connectError.message || 'Cannot connect to database'
        },
        { status: 503 }
      )
    }

    const amenities = await prisma.amenity.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return NextResponse.json(amenities)
  } catch (error: any) {
    console.error('Error fetching amenities:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta
    })
    return NextResponse.json(
      { 
        error: 'Failed to fetch amenities',
        message: error.message || 'Unknown error',
        code: error.code || 'UNKNOWN'
      },
      { status: 500 }
    )
  }
}

// POST create new amenity
export async function POST(request: NextRequest) {
  try {
    // Check if Prisma is available
    if (!prisma) {
      const hasDatabaseUrl = !!process.env.DATABASE_URL
      console.error('Prisma client is not available')
      console.error('DATABASE_URL is set:', hasDatabaseUrl)
      
      return NextResponse.json(
        { 
          error: 'Database not configured',
          message: hasDatabaseUrl 
            ? 'Prisma client initialization failed. Check database connection string format and ensure the database is accessible.'
            : 'DATABASE_URL environment variable is not set. Please add it in Vercel Settings → Environment Variables.',
          hint: hasDatabaseUrl 
            ? 'Verify your DATABASE_URL format: postgresql://user:password@host:port/database?sslmode=require'
            : 'Add DATABASE_URL to your Vercel project settings and redeploy.'
        },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, icon, status } = body

    // Validate required fields
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }

    // Test database connection first
    try {
      await prisma.$connect()
      console.log('✅ Database connection successful in API')
    } catch (connectError: any) {
      console.error('❌ Database connection error:', connectError)
      console.error('Error details:', {
        message: connectError.message,
        code: connectError.code,
        name: connectError.name
      })
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          message: connectError.message || 'Cannot connect to database',
          code: connectError.code || 'CONNECTION_ERROR',
          hint: 'Please check your DATABASE_URL environment variable and ensure the database is accessible.'
        },
        { status: 503 }
      )
    }

    const amenity = await prisma.amenity.create({
      data: {
        name: name.trim(),
        icon: icon || '🏕️',
        status: status || 'Active',
      },
    })

    return NextResponse.json(amenity, { status: 201 })
  } catch (error: any) {
    console.error('Error creating amenity:', error)
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    })
    
    // Return more detailed error message
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Amenity with this name already exists' },
        { status: 409 }
    )
    }
    
    // Handle Prisma errors
    if (error.code) {
      return NextResponse.json(
        { 
          error: 'Database error',
          message: error.message || 'Unknown database error',
          code: error.code,
          hint: error.meta?.target ? `Conflict on field: ${error.meta.target}` : undefined
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to create amenity',
        message: error.message || 'Unknown error occurred',
        code: error.code || 'UNKNOWN_ERROR',
        hint: 'Check server logs for more details'
      },
      { status: 500 }
    )
  }
}

// PUT update amenity
export async function PUT(request: NextRequest) {
  try {
    // Check if Prisma is available
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { id, name, icon, status } = body

    const amenity = await prisma.amenity.update({
      where: { id },
      data: {
        name,
        icon,
        status,
      },
    })

    return NextResponse.json(amenity)
  } catch (error: any) {
    console.error('Error updating amenity:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Amenity with this name already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { 
        error: 'Failed to update amenity',
        details: error.message || 'Unknown error',
        code: error.code || 'UNKNOWN'
      },
      { status: 500 }
    )
  }
}

