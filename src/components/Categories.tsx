import React from 'react';

type Props = {
  categories: string[],
  selected: string | null,
  onClick: (category: string) => void; 
}

export default function Categories({categories, selected, onClick}: Props) {
  return (
    <section className=' w-36 text-center p-6'>
      <h2 className='text-xl font-bold'>카테고리</h2>
      <ul className='flex flex-col gap-1 pt-8'>
        {categories.map(category => <li className={`cursor-pointer hover:text-blue-600 ${category === selected && 'text-blue-600 font-bold'}`} key={category} onClick={() => onClick(category)}>
          {category}
        </li>)}
      </ul>
    </section>
  );
}

