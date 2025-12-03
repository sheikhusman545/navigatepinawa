import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// GET all products
export async function GET() {
  try {
    // Check if Prisma is available
    if (!prisma) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      )
    }

    const products = await prisma.product.findMany({
      include: {
        category: true,
        gallery: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST create new product
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
    const { name, description, price, categoryId, status, mainImage, gallery, amenities } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        categoryId: parseInt(categoryId),
        status: status || 'Active',
        mainImage,
        gallery: gallery && gallery.length > 0 ? {
          create: gallery.map((url: string) => ({
            url,
            alt: name,
          })),
        } : undefined,
        amenities: amenities && amenities.length > 0 ? {
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

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

