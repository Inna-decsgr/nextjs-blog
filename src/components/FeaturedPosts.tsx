import { getFeaturedPosts } from '@/service/post';
import React from 'react';
import PostGroup from './PostGroup';

export default async function FeaturedPosts() {
  const posts = await getFeaturedPosts();

  return (
    <section className='w-full pt-16 pb-0 md:py-16'>
      <h2 className='text-2xl font-bold m-1 md:m-5'>대표 포스트들</h2>
      <PostGroup posts={posts} />
    </section>
  )
}

