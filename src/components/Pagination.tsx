'use client';

import Link from "next/link";
import React from "react";

interface IPaginationProps {
  currentPage: number;
  totalContents: number;
  paginate: (pageNumber: number) => void;
  contentsPerPage: number;
}

export default function Pagination({
  currentPage,
  totalContents,
  paginate,
  contentsPerPage,
}: IPaginationProps): JSX.Element {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalContents / contentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <section className='w-full'>
      <nav>
        <ul className='flex justify-center gap-2'>
          {pageNumbers.map((number) => (
            <li key={number} className={currentPage === number ? 'border-b border-black font-bold dark:border-white' : ''}>
              <Link href="/posts" onClick={() => paginate(number)}>
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
