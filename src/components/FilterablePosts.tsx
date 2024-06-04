'use client'

import { Post } from '@/service/post';
import React, { useState } from 'react';
import PostGroup from './PostGroup';
import Categories from './Categories';
import Pagination from './Pagination';

type Props = {
  posts: Post[];
  categories: string[];
  text: string;
  handleText: () => void,
}

const ALL_POSTS = 'all posts'

export default function FilterablePosts({ posts, categories, text, handleText}: Props) {
  const [selected, setSelected] = useState(ALL_POSTS);
  const filtered = (text ? posts.filter(post => post.title.includes(text)) : (selected === ALL_POSTS) ? posts : posts.filter(post => post.category === selected));
  const allPosts = [...filtered];

  
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 5;

  const indexOfLastContent = currentPage * contentsPerPage;
  const indexOfFirstContent = indexOfLastContent - contentsPerPage;
  const currentContents = allPosts
    .slice(0)
    .reverse()
    .slice(indexOfFirstContent, indexOfLastContent);
  
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCategory = (selected: string) => {
    setSelected(selected);
    setCurrentPage(1);
    handleText();
  }

  return (
    <>
      <section className='w-full flex-row md:flex'>
        <Categories
          categories={[ALL_POSTS, ...categories]}
          selected={text ? null : selected}
          onClick={handleCategory}
        />
        <div className='w-full h-[38rem]'>
          <PostGroup posts={currentContents} />
        </div>
      </section>
      <Pagination
        currentPage={currentPage}
        totalContents={filtered.length}
        paginate={paginate}
        contentsPerPage={contentsPerPage}
      />
    </>
  );
}

