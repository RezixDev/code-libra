import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        lessons: true,
        enrollments: true,
      },
    })

    const users = await prisma.user.findMany({
      include: {
        enrollments: true,
        progress: true,
        achievements: true,
      },
    })

    const achievements = await prisma.achievement.findMany({
      include: {
        users: true,
      },
    })

    return NextResponse.json({
      courses,
      users,
      achievements,
    })
  } catch (error) {
    console.error('Database check error:', error)
    return NextResponse.json({ error: 'Failed to check database' }, { status: 500 })
  }
} 