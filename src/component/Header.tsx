import React from 'react'
import Image from 'next/image';

export default function Header() {
  return (
    <div className='h-[60px] flex items-center justify-between bg-white px-[80px]'>
      <Image
        src="/jorkin-logo.jpg"
        alt=''
        width={80}
        height={80}
        className='w-[48px] h-[48px] rounded-full'
      />
    </div>
  )
}
