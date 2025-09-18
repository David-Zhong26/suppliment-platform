import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().optional().default('Demo User'),
  username: z.string().optional().default(`user${Math.floor(Math.random() * 10000)}`),
  email: z.string().email().optional().default(`demo${Math.floor(Math.random() * 10000)}@example.com`),
  password: z.string().min(1, 'Password is required'),
  age: z.number().min(13).max(120).optional(),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer-not-to-say']).optional(),
  userType: z.enum(['GENERAL_USER', 'VERIFIED_CREATOR', 'SELLER']).default('GENERAL_USER')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if email already exists
    const existingUserByEmail = await db.findUserByEmail(validatedData.email)

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existingUserByUsername = await db.findUserByUsername(validatedData.username)

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await db.createUser({
      name: validatedData.name,
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
      age: validatedData.age,
      gender: validatedData.gender,
      userType: validatedData.userType,
    })

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          userType: user.userType,
          createdAt: user.createdAt
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}