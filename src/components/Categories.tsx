import React from 'react';

type Props = {
  categories: string[],
  selected: string | null,
  onClick: (category: string) => void; 
}

export default function Categories({categories, selected, onClick}: Props) {
  return (
    <section className='w-full text-center md:p-6 md:w-36'>
      <h2 className='hidden font-bold text-left text-md md:text-xl md:block'>카테고리</h2>
      <ul className='flex text-md gap-3 py-2 md:pt-8 md:flex-col md:gap-1'>
        {categories.map(category => <li className={`cursor-pointer hover:text-blue-600 ${category === selected && 'text-blue-600 font-bold'}`} key={category} onClick={() => onClick(category)}>
          {category}
        </li>)}
      </ul>
    </section>
  );
}

