import React from 'react';
import {BsCheckLg} from 'react-icons/bs';
import {images} from '../constants';

export default function ArticleCard({className}) {
  return (
    <div className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className } `}>
      <img src={images.postImage} className='w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60' alt="title-img"/>
      <div className='p-5'>
        <h2 className='font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]'>Future of work</h2>
        <p className='text-dark-light mt-3 text-sm md:text-lg'>Majority of people will work in jobs that don't exist today</p>
        <div className='flex justify-between flex-nowrap items-center mt-6'>
            <div className='flex items-center gap-x-2 md:gap-x-2.5'>
                <img src={images.postProfile} alt="post profile" className='h-9 w-9 md:h-10 md:w-10'/>
                <div className='flex flex-col'>
                    <h4 className='font-bold italic text-dark-soft text-sm md:text-base'>Viola Manisa</h4>
                    <div className='flex items-center gap-x-2'>
                        <span className='bg-[#36B37E] w-fit bg-opacity-20 p-1 rounded-full '><BsCheckLg className='w-2 h-2 text-[#36B37E]'/></span>
                        <span className='italic text-dark-light text-xs md:text-sm'>Verified writer</span>
                    </div>
                </div>
            </div>
            <span className='font-bold italic text-dark-light text-xs md:text-base'>02 May</span>
        </div>
      </div>
    </div>
  )
}
