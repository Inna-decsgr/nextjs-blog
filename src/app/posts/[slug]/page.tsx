import AdjacentPostCard from '@/components/AdjacentPostCard';
import PostContent from '@/components/PostContent';
import { getFeaturedPosts, getPostContent } from '@/service/post';
import React from 'react';

type Props = {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params: { slug } }: Props) {
  const { title, description } = await getPostContent(slug);
  return {
    title,
    description,
  }
}

export default async function PostPage({ params: { slug } }: Props) {
  const post = await getPostContent(slug);
  const { prev, next } = post;

  return (
    <article className='w-full'>
      <PostContent post={post} />
      <h3 className='text-lg font-bold mt-28 px-12'>다른 포스트 보러가기</h3>
      <section className='flex flex-col gap-28 md:flex-row p-16'>
        {prev && <AdjacentPostCard post={prev} type='prev' />}
        {next && <AdjacentPostCard post={next} type='next' />}
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const posts = await getFeaturedPosts();
  return posts.map((post) => ({
    slug: post.path,
  }))
}