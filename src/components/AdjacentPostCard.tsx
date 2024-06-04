import { Post } from '@/service/post';
import Link from 'next/link';
import React from 'react';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos  } from "react-icons/md";

type Props = {
  post: Post;
  type: 'prev' | 'next';
}

export default function AdjacentPostCard({post: {path, title, description}, type}: Props) {
  return (
    <Link href={`/posts/${path}`} className='relative w-full '>
      <div className='group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-around items-center md:px-8'>
        {type === 'prev' && <MdOutlineArrowBackIosNew />}
        <div className='w-full text-center mx-8 overflow-hidden'>
          <h3 className='text-lg truncate font-bold group-hover:text-blue-600'>{title}</h3>
          <p className='text-sm text-gray-500 truncate dark:text-gray-300'>{description}</p>
        </div>
        {type === 'next' && <MdOutlineArrowForwardIos />}
      </div>
    </Link>
  );
}

