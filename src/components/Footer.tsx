import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <section className='text-center py-12 mx-6'>
      <p className='mb-3'>김인아 All Right Reserved.</p>
      <Link className='bg-gray-400 py-1 px-2 rounded-lg text-white font-bold hover:brightness-110' href={'https://github.com/Inna-decsgr'}>
        Github
      </Link>
    </section>
  );
}

