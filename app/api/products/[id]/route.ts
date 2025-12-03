import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET single product
export async function GET(
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

    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        category: true,
        gallery: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT update product
export async function PUT(
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

    const body = await request.json()
    const { name, description, price, categoryId, status, mainImage, gallery, amenities } = body

    // Update product
    const product = await prisma.product.update({
      where: { id: parseInt(params.id) },
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        status: status || 'Active',
        mainImage,
        // Update gallery images
        gallery: gallery && gallery.length > 0 ? {
          deleteMany: {},
          create: gallery.map((url: string) => ({
            url,
            alt: name,
          })),
        } : undefined,
        // Update amenities
        amenities: amenities && amenities.length > 0 ? {
          deleteMany: {},
          create: amenities.map((amenityId: number) => ({
            amenityId: parseInt(amenityId.toString()),
          })),
        } : undefined,
      },
      include: {
        category: true,
        gallery: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE product
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

    await prisma.product.delete({
      where: { id: parseInt(params.id) },
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}

