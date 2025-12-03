import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all categories
export async function GET() {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        name: 'asc',
      },
    })

    // Transform to include product count
    const categoriesWithCount = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      status: cat.status,
      products: cat._count.products,
    }))

    return NextResponse.json(categoriesWithCount)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { name, description, status } = body

    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,
        status: status || 'Active',
      },
      include: {
        _count: {
          select: { products: true }
        }
      },
    })

    return NextResponse.json({
      id: category.id,
      name: category.name,
      description: category.description,
      status: category.status,
      products: category._count.products,
    }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating category:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}

// PUT update category
export async function PUT(request: NextRequest) {
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { id, name, description, status } = body

    const category = await prisma.category.update({
      where: { id: parseInt(id.toString()) },
      data: {
        name,
        description: description || null,
        status,
      },
      include: {
        _count: {
          select: { products: true }
        }
      },
    })

    return NextResponse.json({
      id: category.id,
      name: category.name,
      description: category.description,
      status: category.status,
      products: category._count.products,
    })
  } catch (error: any) {
    console.error('Error updating category:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

