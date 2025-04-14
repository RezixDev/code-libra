import { PrismaClient, CourseLevel, Lesson, Achievement } from '@prisma/client'

const prisma = new PrismaClient()

// Get user ID from command line argument
const userId = process.argv[2]
if (!userId) {
  console.error('Please provide a user ID as an argument')
  process.exit(1)
}

async function main() {
  // First ensure the user exists in the database
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: 'demo@example.com', // This will be overwritten by Clerk anyway
      name: 'Demo User',
    },
  })

  // Clean only the current user's data
  await prisma.userAchievement.deleteMany({ where: { userId } })
  await prisma.progress.deleteMany({ where: { userId } })
  await prisma.enrollment.deleteMany({ where: { userId } })

  // Create sample courses with included relations
  const webDevCourse = await prisma.course.create({
    data: {
      title: "Web Development Fundamentals",
      description: "Learn the basics of web development including HTML, CSS, and JavaScript.",
      level: CourseLevel.BEGINNER,
      imageUrl: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
      tags: ["web", "frontend", "html", "css", "javascript"],
      lessons: {
        create: [
          {
            title: "Introduction to HTML",
            content: "# Introduction to HTML\n\nHTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser...",
            order: 1,
          },
          {
            title: "CSS Basics",
            content: "# CSS Basics\n\nCSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML...",
            order: 2,
          },
          {
            title: "JavaScript Fundamentals",
            content: "# JavaScript Fundamentals\n\nJavaScript is a programming language that enables interactive web pages...",
            order: 3,
          },
        ],
      },
    },
    include: {
      lessons: true,
    },
  })

  const reactCourse = await prisma.course.create({
    data: {
      title: "React.js Mastery",
      description: "Master React.js and build modern web applications.",
      level: CourseLevel.INTERMEDIATE,
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      tags: ["react", "frontend", "javascript", "web"],
      lessons: {
        create: [
          {
            title: "React Components",
            content: "# React Components\n\nComponents are the building blocks of React applications...",
            order: 1,
          },
          {
            title: "State and Props",
            content: "# State and Props\n\nLearn how to manage component state and pass props between components...",
            order: 2,
          },
          {
            title: "Hooks in React",
            content: "# React Hooks\n\nHooks are functions that allow you to use state and other React features in functional components...",
            order: 3,
          },
        ],
      },
    },
    include: {
      lessons: true,
    },
  })

  const nodeCourse = await prisma.course.create({
    data: {
      title: "Node.js Backend Development",
      description: "Build scalable backend services with Node.js and Express.",
      level: CourseLevel.INTERMEDIATE,
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
      tags: ["nodejs", "backend", "express", "api"],
      lessons: {
        create: [
          {
            title: "Node.js Basics",
            content: "# Introduction to Node.js\n\nNode.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
            order: 1,
          },
          {
            title: "Express Framework",
            content: "# Express.js Framework\n\nExpress is a minimal and flexible Node.js web application framework...",
            order: 2,
          },
          {
            title: "REST API Design",
            content: "# REST API Design\n\nLearn how to design and implement RESTful APIs using Node.js and Express...",
            order: 3,
          },
        ],
      },
    },
  })

  const awsCourse = await prisma.course.create({
    data: {
      title: "AWS Cloud Fundamentals",
      description: "Learn the basics of Amazon Web Services (AWS) cloud platform.",
      level: CourseLevel.ADVANCED,
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      tags: ["aws", "cloud", "devops"],
      lessons: {
        create: [
          {
            title: "AWS Overview",
            content: "# AWS Overview\n\nIntroduction to Amazon Web Services and cloud computing concepts...",
            order: 1,
          },
          {
            title: "EC2 and S3",
            content: "# EC2 and S3 Services\n\nLearn about Elastic Compute Cloud (EC2) and Simple Storage Service (S3)...",
            order: 2,
          },
          {
            title: "AWS Lambda",
            content: "# Serverless with Lambda\n\nBuild serverless applications using AWS Lambda...",
            order: 3,
          },
        ],
      },
    },
  })

  // Create achievements and store the result properly
  const firstSteps = await prisma.achievement.create({
    data: {
      name: "First Steps",
      description: "Complete your first lesson",
      iconUrl: "🎯",
    },
  })

  const quickLearner = await prisma.achievement.create({
    data: {
      name: "Quick Learner",
      description: "Complete 5 lessons",
      iconUrl: "🚀",
    },
  })

  const webWarrior = await prisma.achievement.create({
    data: {
      name: "Web Warrior",
      description: "Complete the Web Development Fundamentals course",
      iconUrl: "⚔️",
    },
  })

  // Enroll the user in some courses
  const webDevEnrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId: webDevCourse.id,
      completedAt: new Date(), // Mark as completed
    },
  })

  const reactEnrollment = await prisma.enrollment.create({
    data: {
      userId,
      courseId: reactCourse.id,
    },
  })

  // Add progress for completed lessons
  await prisma.progress.createMany({
    data: webDevCourse.lessons.map((lesson) => ({
      userId,
      lessonId: lesson.id,
      completed: true,
      completedAt: new Date(),
    })),
  })

  // Add progress for some React lessons
  await prisma.progress.createMany({
    data: [
      {
        userId,
        lessonId: reactCourse.lessons[0].id,
        completed: true,
        completedAt: new Date(),
      },
      {
        userId,
        lessonId: reactCourse.lessons[1].id,
        completed: true,
        completedAt: new Date(),
      },
    ],
  })

  // Award some achievements
  await prisma.userAchievement.createMany({
    data: [
      {
        userId,
        achievementId: firstSteps.id,
      },
      {
        userId,
        achievementId: quickLearner.id,
      },
      {
        userId,
        achievementId: webWarrior.id,
      },
    ],
  })

  console.log('Seed data created successfully for user:', userId)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 