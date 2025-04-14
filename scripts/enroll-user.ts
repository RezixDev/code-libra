import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Get user ID from command line argument
  const userId = process.argv[2]
  if (!userId) {
    console.error('Please provide a user ID as an argument')
    process.exit(1)
  }

  try {
    // First ensure the user exists
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        email: 'demo@example.com', // This will be updated by Clerk
        name: 'Demo User',
      },
    })
    console.log('User created/updated:', user.id)

    // Get all courses
    const courses = await prisma.course.findMany()
    
    // Enroll user in each course
    for (const course of courses) {
      try {
        const enrollment = await prisma.enrollment.create({
          data: {
            userId,
            courseId: course.id,
          },
          include: {
            course: true,
          },
        })
        console.log(`Enrolled in course: ${enrollment.course.title}`)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          console.log(`Already enrolled in course: ${course.title}`)
        } else {
          console.error(`Error enrolling in course ${course.title}:`, error)
        }
      }
    }

    console.log('Enrollment process completed!')
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 