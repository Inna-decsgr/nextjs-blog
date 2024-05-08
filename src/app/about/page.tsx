import React from 'react';
import { AiOutlineMail } from "react-icons/ai";
import { GrDocument } from "react-icons/gr";
import { FaLaptopCode } from "react-icons/fa";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me',
  description: '블로그 작성자 소개'
}

const TITLE_CLASS = 'flex items-center gap-2 text-xl font-bold mt-12 pb-2'

export default function AboutPage() {
  return (
    <article className='w-full p-14'>
      <h2 className='text-5xl font-bold mb-6 pt-16'>About me</h2>
      <p className='text-2xl font-bold'>안녕하세요<br />저는 김인아입니다.</p>
      <p className='my-6'>
        탐구 정신이 강하고, 새로운 기술과 도구에 열려있습니다.<br/>
        문제를 해결하며 느끼는 성취감이 저의 큰 동기부여가 됩니다<br/>
        사용자 중심의 디자인과 최신 프론트엔드 기술을 활용하여<br/>
        웹 어플리케이션의 성능과 사용자 경험을 지속적으로 향상시키는 개발자가 되고 싶습니다.
      </p>
      <div>
        <h3 className={TITLE_CLASS}>
          <AiOutlineMail />
          Contact
        </h3>
        <p>anjgkwl27@gmail.com</p>
      </div>
      <div>
        <h3 className={TITLE_CLASS}>
          <GrDocument />
          Certification
        </h3>
        <p>정보처리기사 - 2021.08.20</p>
      </div>
      <div>
        <h3 className={TITLE_CLASS}>
          <FaLaptopCode />
          Skills
        </h3>
        <p>
          Javascript, React, Next.js<br />
          React Router, React Query, REST API<br />
          CSS3, Tailwind
        </p>
      </div>
    </article>
  );
}

