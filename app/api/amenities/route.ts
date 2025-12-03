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
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const amenities = await prisma.amenity.findMany({
      orderBy: {
        name: 'asc',
      },
    })
    return NextResponse.json(amenities)
  } catch (error) {
    console.error('Error fetching amenities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch amenities' },
      { status: 500 }
    )
  }
}

// POST create new amenity
export async function POST(request: NextRequest) {
  try {
    // Check if Prisma is available
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, icon, status } = body

    const amenity = await prisma.amenity.create({
      data: {
        name,
        icon: icon || '🏕️',
        status: status || 'Active',
      },
    })

    return NextResponse.json(amenity, { status: 201 })
  } catch (error) {
    console.error('Error creating amenity:', error)
    return NextResponse.json(
      { error: 'Failed to create amenity' },
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
  } catch (error) {
    console.error('Error updating amenity:', error)
    return NextResponse.json(
      { error: 'Failed to update amenity' },
      { status: 500 }
    )
  }
}

