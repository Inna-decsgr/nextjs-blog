import { Post } from '@/service/post';
import Link from 'next/link';
import React from 'react';

type Props = {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { title, date, description, path} = post;

  return (
    <Link href={`/posts/${path}`}>
      <article className='p-1 my-2 md:my-0 md:p-5 hover:bg-white dark:hover:bg-gray-700'>
        <div className='flex justify-between'>
          <h3 className='flex-grow text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis'>{title}</h3>
          <time className='flex-shrink-0 flex items-center text-sm text-gray-500 dark:text-gray-300'>{date.toString()}</time>
        </div>
        <p className='text-sm text-gray-500 mt-1 dark:text-gray-300'>{description}</p>
      </article>
    </Link>
  );
}

