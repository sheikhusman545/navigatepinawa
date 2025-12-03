import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// DELETE category
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

    await prisma.category.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Category deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting category:', error)
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete category with existing products' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}

