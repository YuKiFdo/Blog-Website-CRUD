// components/LoadingSpinner.tsx
'use client';
import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
}