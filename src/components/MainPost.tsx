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
  // 함수를 호출해서 반환받지 않고 바로 localstorage getItem으로 값을 받아서 초기값으로 설정하면 페이지가 동작은 하지만 build 했을 때 prerender error가 난다. 이는 next-js가 제공하는 SSR에서는 window, document와 같은 브라우저 전역 객체를 사용할 수 없기 때문이다. window 객체는 client-side에만 존재하기 때문에 페이지가 client에 로드되고 window 객체가 정의될 때까지 localStorage에 접근할 수 없어서 localStorage is not defined라는 에러가 난다.

  
  // prerender error를 방지하는 방법으로는 window처리 말고도 useEffect를 사용할 수 있다. useEffect는 렌더링할 때 실행되므로, 초기 서버 빌드 시 useEffect 내부 코드는 실행되지 않는다. useEffect는 client-side에서만 실행되므로 localStorage에 안전하게 접근이 가능하기 때문에 필요한 것들을 useEffect로 감싸주는것도 좋은 방법이다.
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {  // 검색어가 변경될 때마다 호출되는 함수
    const searchText = e.target.value;
    setText(searchText);
    // 검색어를 localStorage의 searchText 키에 저장한다
    localStorage.setItem('searchText', searchText);  
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {  // 검색어를 제출할 때 호출되는 함수이다. 
    e.preventDefault();
     // 검색어에 해당하는 검색 결과를 업데이트하고 로컬 스토리지에 저장한다.
    const searchResult = posts.filter(post => post.title.includes(debouncedText));
    setSearchResult(searchResult);  
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
  }

  const handleText = () => {
    // Filterable에 전달할 함수 text가 있는 상태에서 category를 클릭하면 실행할 함수. 
    // 검색어와 검색 결과를 로컬 스토리지에서 제거한다.
    setText('');
    localStorage.removeItem('searchText');
    setSearchResult([]);
    localStorage.removeItem('searchResult');
  }


  // 페이지 이동 시 발생하는 이벤트를 처리하기 위한 useEffect이다.
  // 뒤로 가기 버튼을 눌렀을 때 이전 상태가 유지되는 것은 브라우저의 기본 동작이다. 사용자가 검색어를 입력하고 검색 결과를 보고 뒤로 가기 버튼을 누르면 이전 페이지의 상태로 되돌아가게 되는데, 우리는 이전 페이지의 상태를 로컬 스토리지에 저장했으므로 이전 상태가 복원되어 이전 검색어와 검색 결과가 유지되게 된다.
  // 이러한 동작은 브라우저의 내장 기능이며, 우리가 추가한 코드는 이러한 기능을 이용하여 검색어와 검색 결과를 브라우저가 자동으로 관리하도록 하는 데 도움을 준다.
  useEffect(() => {
    // 페이지 이동 시 검색 정보를 초기화하기 위한 콜백 함수를 정의 
    // 사용자가 뒤로 가기 버튼을 누르거나 브라우저의 이전/다음 버튼을 사용하여 페이지를 이동할 때 발생하는 'popstate' 이벤트를 처리하기 위한 코드
    // 브라우저의 뒤로 가기 버튼이나 이전/다음 버튼을 클릭하면 "popstate" 이벤트가 발생하고, 이를 통해 페이지의 이동을 감지할 수 있다. 이 코드는 해당 이벤트가 발생할 때 실행될 콜백 함수를 등록하고, 페이지가 이동될 때 해당 이벤트 리스너를 제거하는 역할을 합니다.
    // 그리고 이벤트 리스너 내부에서는 localStorage에서 검색어와 검색 결과를 제거하여 이전 검색 정보를 초기화합니다. 이렇게 함으로써 사용자가 뒤로 가기를 누를 때 이전의 검색 정보가 유지되지 않도록 합니다.
    // 이 코드가 없어도 동작은 하지만 이 코드가 없으면 사용자가 뒤로 가기를 눌렀을 때 이전 검색 정보가 초기화되지 않고 남아있을 수 있다. 그러면 다른 검색어로 새로 검색을 해도 이전 정보가 남아있어서 검색 결과가 다르게 나올 수 있다. 이는 사용자 경험에 영향을 줄 수 있다. 이렇게 함으로써 사용자는 다시 검색할 때 항상 초기화된 상태에서 시작할 수 있다.
    const handleBackButton = () => {
      // 로컬 스토리지에서 검색어와 검색 결과를 제거한다.
      localStorage.removeItem('searchText');
      localStorage.removeItem('searchResult');
    };

     // 'popstate' 이벤트 리스너를 등록한다
    window.addEventListener('popstate', handleBackButton);

     // 컴포넌트가 언마운트될 때 'popstate' 이벤트 리스너를 제거한다.
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    }

  }, [])  // useEffect는 컴포넌트가 처음 렌더링될 때 한 번만 실행되어야 하므로 빈 배열을 전달

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
  // localstorage의 searchResult를 가져와서 searchResult에 저장하고 없으면 빈 배열을 저장해야하는데 클라이언트 컴포넌트에서는 localstorage를 사용할 수 없다. 따라서 따로 함수로 만들어서 window 처리를 해준다음에 반환하는 값으로 초기값을 설정해준다.
  if (typeof window !== 'undefined') {
    // typeof window !== 'undefined'를 해줘서 페이지가 client에 마운드될 때까지 기다렸다가 localstorage에 접근할 수 있도록 한다. window 객체가 참조되지 않을 경우 undefined를 반환하도록 설정하게 되면 localstorage를 접근하기 전에 localstorage가 정의되어서 prerender error가 사라진다.
    const result = localStorage.getItem('searchResult');
    return result ? JSON.parse(result) : null;
  }
  return null;
}