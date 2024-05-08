import { Post } from '@/service/post';
import React from 'react';
import PostCard from './PostCard';

type Props = {
  posts: Post[]
}

export default function PostGroup({posts}: Props) {
  return (
    <ul className='w-full h-full flex flex-col gap-4'>
      {posts.map((post) => <li key={post.path}>
        <PostCard post={post} />
      </li>)}
    </ul>
  );
}

