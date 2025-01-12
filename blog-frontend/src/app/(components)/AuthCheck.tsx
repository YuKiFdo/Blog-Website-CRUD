// components/AuthCheck.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from './axios';
import LoadingSpinner from './LoadingSpinner';

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/user');
        if (response.status === 200) {
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Auth check error:', error);
        router.replace('/auth/login?message=Please log in to continue!');
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}