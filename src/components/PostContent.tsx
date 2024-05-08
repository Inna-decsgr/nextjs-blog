import { PostData } from '@/service/post';
import React from 'react';
import MarkdownViewer from './MarkdownViewer';

type Props = {
  post: PostData;
}

export default function PostContent({ post }: Props) {
  const { title, description, date, content} = post;

  return (
    <section className='p-12'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <p className='text-lg'>{description}</p>
      <p className='text-gray-500 dark:text-gray-300'>{date.toString()}</p>
      <MarkdownViewer content={content} />
    </section>
  );
}

