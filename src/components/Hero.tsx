import Image from 'next/image';
import React from 'react';
import profileImage from '../../public/images/profile.png';

export default function Hero() {
  return (
    <section>
      <div className='flex items-center'>
        <Image
          src={profileImage}
          alt='Image of the author'
          width={200}
          height={200}
          style={{width:200, height:200, borderRadius: "100px"}}
        />
        <div>
          <p className='pl-4'>
            저의 블로그를 찾아주셔서 감사합니다.<br />
            프론트엔드 개발자를 꿈꾸는 김인아입니다.<br/>
            기록하는 것을 즐기고, 새로운 경험과 생각을 나누는 것을 좋아합니다.<br />
            그동안 배운 것들, 경험한 것들, 그리고 생각하는 것들을 정리하고 공유하고자 합니다.
          </p>
        </div>
      </div>
      <div>
        
      </div>
    </section>
  );
}

