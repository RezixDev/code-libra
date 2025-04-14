# CodeLibra - Mobile Programming Learning App


CodeLibra is a comprehensive mobile-first web application designed to help users learn programming through interactive lessons, hands-on coding practice, and community engagement. Built with modern web technologies like Next.js, TypeScript, and Tailwind CSS, CodeLibra offers a seamless learning experience across devices.

## 🚀 Features

- **Interactive Courses**: Structured learning paths from beginner to advanced levels
- **Code Playground**: Practice coding in multiple languages with real-time feedback
- **Coding Challenges**: Test your skills with practical programming challenges
- **Progress Tracking**: Monitor your learning journey with detailed statistics
- **Community Forum**: Connect with fellow learners to share knowledge and ask questions
- **Offline Access**: Download lessons to learn anywhere, anytime
- **Personalized Learning**: Customized learning recommendations based on your progress

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **State Management**: React Context API
- **Database**: 
  - [PostgreSQL](https://www.postgresql.org/) hosted on [Neon Tech](https://neon.tech/)
  - [Prisma](https://www.prisma.io/) as ORM
- **Authentication**: [Clerk](https://clerk.dev/) for user management
- **Testing**: 
  - [Jest](https://jestjs.io/) for unit tests
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for component tests
  - [BackstopJS](https://github.com/garris/BackstopJS) for visual regression testing
- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier

## 🏗️ Project Structure

```
codelibra/
├── .github/                  # GitHub workflows and templates
├── public/                   # Static assets
├── prisma/                   # Prisma schema and migrations
│   ├── schema.prisma         # Database schema
│   └── migrations/           # Database migrations
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable UI components
│   │   ├── auth/             # Authentication components
│   │   ├── community/        # Community feature components
│   │   ├── courses/          # Course-related components
│   │   ├── layout/           # Layout components (header, footer, etc.)
│   │   ├── playground/       # Code playground components
│   │   └── ui/               # Base UI components
│   ├── contexts/             # React Context providers
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and API clients
│   │   └── prisma.ts         # Prisma client instance
│   ├── types/                # TypeScript type definitions
│   └── styles/               # Global styles
├── tests/
│   ├── unit/                 # Unit tests
│   ├── integration/          # Integration tests
│   └── visual/               # BackstopJS visual tests
├── backstop.json             # BackstopJS configuration
└── ...                       # Config files
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or newer
- npm or yarn
- Git
- PostgreSQL (local development) or Neon Tech account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/codelibra.git
   cd codelibra
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/codelibra"
   # Or for Neon Tech
   # DATABASE_URL="postgres://user:password@ep-example-id.region.aws.neon.tech/codelibra?sslmode=require"
   
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
   ```

4. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   # or
   yarn prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🧪 Testing

### Unit and Integration Tests

Run Jest tests:
```bash
npm run test
# or
yarn test
```

### Visual Regression Tests with BackstopJS

1. Install BackstopJS globally:
   ```bash
   npm install -g backstopjs
   ```

2. Initialize reference screenshots:
   ```bash
   npm run backstop:reference
   # or
   yarn backstop:reference
   ```

3. Run visual tests:
   ```bash
   npm run backstop:test
   # or
   yarn backstop:test
   ```

4. Approve changes (if needed):
   ```bash
   npm run backstop:approve
   # or
   yarn backstop:approve
   ```

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

## 🚢 Deployment

The application can be deployed to any platform that supports Next.js applications, such as Vercel, Netlify, or a custom server. For database deployment, we use Neon Tech for scalable PostgreSQL.

### Database Setup for Production

1. Create a new database on [Neon Tech](https://neon.tech/)
2. Update the `DATABASE_URL` in your production environment variables
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   # or
   yarn prisma migrate deploy
   ```

## 🧩 Future Enhancements

- [ ] Code execution environment with multiple language support
- [ ] Offline support via Service Workers
- [ ] Push notifications for learning reminders
- [ ] Group learning and study rooms
- [ ] Advanced analytics and personalized learning paths
- [ ] Integration with GitHub for project-based learning
- [ ] Enhanced database performance optimizations
- [ ] Multi-tenant database architecture for enterprise plans


## 👏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Clerk Documentation](https://clerk.dev/docs)
- [Neon Tech Documentation](https://neon.tech/docs)
- [BackstopJS Documentation](https://github.com/garris/BackstopJS#readme)
- Icon library provided by [Lucide](https://lucide.dev/)
