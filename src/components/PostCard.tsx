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
      <article className='p-6 hover:bg-white dark:hover:bg-gray-700'>
        <div className='flex justify-between'>
          <h3 className='text-lg font-bold'>{title}</h3>
          <time className='text-sm text-gray-500 dark:text-gray-300'>{date.toString()}</time>
        </div>
        <p className='text-sm text-gray-500 mt-1 dark:text-gray-300'>{description}</p>
      </article>
    </Link>
  );
}

