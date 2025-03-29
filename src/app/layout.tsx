// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import AuthProvider from '@/contexts/AuthContext';

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CodeLearn - Learn Programming on Mobile',
  description: 'Master programming with our interactive mobile learning platform',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#4f46e5',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
    <ClerkProvider appearance={{
      variables: {
        colorPrimary: '#4f46e5', // indigo-600
        colorText: '#1f2937', // gray-800
        colorBackground: '#f3f4f6', // gray-100
        colorInputBackground: '#ffffff',
        colorInputText: '#1f2937',
      },
      elements: {
        formButtonPrimary:
          'bg-indigo-600 hover:bg-indigo-700 text-sm normal-case',
        card: 'rounded-xl shadow-lg',
        headerTitle: 'text-2xl font-bold',
        headerSubtitle: 'text-gray-600',
        socialButtonsBlockButton:
          'border-gray-300 hover:bg-gray-50',
        footerActionLink: 
          'text-indigo-600 hover:text-indigo-500 font-medium',
      },
    }}>
    <html lang="en">
    <body className={inter.className}>
        {children}
      </body>
    </html>
  </ClerkProvider>
	);
}
