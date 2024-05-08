'use client'

import Link from 'next/link';
import React from 'react';
import ThemeButton from './DarkModeButton';
import { usePathname } from 'next/navigation';

const BORDER_CLASS = 'border-b border-black font-bold dark:border-white';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className='flex justify-between items-center p-4'>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>blog</h1>
      </Link>
      <nav className='flex gap-4'>
        <Link className={pathname === "/" ? BORDER_CLASS : ''} href={'/'}>home</Link>
        <Link className={pathname === '/about' ? BORDER_CLASS : ''} href={'/about'}>about</Link>
        <Link className={pathname === '/posts' ? BORDER_CLASS : ''} href={'/posts'}>post</Link>
        <ThemeButton />
      </nav>
    </header>
  );
}

