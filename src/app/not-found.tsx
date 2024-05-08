'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

export default function NotFound() {
  const router = useRouter();

  return (
    <section className='flex flex-col w-full p-48'>
      <p className='text-3xl font-bold text-center dark:text-white'>
        죄송합니다. 해당 페이지를 찾을 수 없습니다.
      </p>


      <button className='bg-gray-200 rounded-sm text-lg font-bold mx-auto my-6 py-1 px-4 dark:text-black' onClick={() => router.push('/')}>홈으로</button>
    </section>
  );
}

