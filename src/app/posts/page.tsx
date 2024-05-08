import MainPost from '@/components/MainPost';
import { getAllPosts } from '@/service/post';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'All Posts',
  description: '프론트엔드 개발 관련 블로그 글'
}


export default async function AllPostPage() {
  const posts = await getAllPosts();
  const categories = [...new Set(posts.map(post => post.category))];
  

  return (
    <section className='w-full p-14'>
      <h2 className='text-2xl font-bold'>카테고리별 포스트들</h2>
      <MainPost posts={posts} categories={categories}/>
    </section>
  )
}

