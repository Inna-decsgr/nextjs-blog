import { readFile } from 'fs/promises';
import path from 'path';
import { cache } from 'react';

export type Post = {
  title: string;
  description: string;
  date: Date;
  category: string;
  path: string;
  featured: boolean;
}

export type PostData = Post & { content: string, prev: Post | null, next: Post | null};

export async function getFeaturedPosts(): Promise<Post[]> {
  return getAllPosts()
    .then(posts => posts.filter(post => post.featured));
}

export const getAllPosts = cache(async () => {  
  const filePath = path.join(process.cwd(), 'data', 'posts.json');

  return readFile(filePath, 'utf-8')
    .then<Post[]>(data => JSON.parse(data))
  .then(posts => posts.sort((a,b) => (a.date > b.date ? -1 : 1)))
})

export async function getPostContent(fileName: string): Promise<PostData> {
  const filePath = path.join(process.cwd(), 'data', `/posts/${fileName}.md`);
  const posts = await getAllPosts();
  const post = posts.find(post => post.path === fileName);

  if (!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없습니다.`);

  const index = posts.indexOf(post);
  const prev = index !== 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;
  const content = await readFile(filePath, 'utf-8');

  return { ...post, content, prev, next };
}