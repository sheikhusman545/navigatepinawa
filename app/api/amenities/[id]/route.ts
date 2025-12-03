import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// DELETE amenity
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    await prisma.amenity.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Amenity deleted successfully' })
  } catch (error) {
    console.error('Error deleting amenity:', error)
    return NextResponse.json(
      { error: 'Failed to delete amenity' },
      { status: 500 }
    )
  }
}

