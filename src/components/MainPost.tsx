'use client'

import React, { useEffect, useState } from 'react';
import FilterablePosts from './FilterablePosts';
import { Post } from '@/service/post';
import useDebounce from '@/hooks/useDebounce';

type Props = {
  posts: Post[],
  categories: string[];
}

export default function MainPost({posts, categories}: Props) {
  const [text, setText] = useState('');
  const [searchResult, setSearchResult] = useState<Post[]>(() => {
    return readSearchResult();
  });

  useEffect(() => {
    const storedText = localStorage.getItem('searchText');
    if (storedText) {
      setText(storedText)
    }
  }, [])

  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem('searchText');
      localStorage.removeItem('searchResult');
    };
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    }
  }, [])
  
  const debouncedText = useDebounce(text); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    const searchText = e.target.value;
    setText(searchText);
    localStorage.setItem('searchText', searchText);  
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    const searchResult = posts.filter(post => post.title.includes(debouncedText));
    setSearchResult(searchResult);  
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
  }

  const handleText = () => {
    setText('');
    localStorage.removeItem('searchText');
    setSearchResult([]);
    localStorage.removeItem('searchResult');
  }

  useEffect(() => {
    const handleBackButton = () => {
      localStorage.removeItem('searchText');
      localStorage.removeItem('searchResult');
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    }

  }, []) 

  return (
    <section>
      <form className='py-8 ml-36' onSubmit={handleSubmit}>
        <input
          className='w-96 p-2 outline-none border-none dark:bg-gray-700'
          type="text"
          value={text}
          placeholder='검색어를 입력하세요.'
          onChange={handleChange}
        />
      </form>
    <FilterablePosts posts={posts} categories={categories} text={debouncedText.replace(/\s+/g, '')} handleText={handleText} />
    </section>
  );
}

export function readSearchResult() {
  if (typeof window !== 'undefined') {
    const result = localStorage.getItem('searchResult');
    return result ? JSON.parse(result) : null;
  }
  return null;
}