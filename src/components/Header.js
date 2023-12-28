import React, { useState } from 'react';
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai';
import {MdKeyboardArrowDown} from 'react-icons/md';
import { images } from '../constants';

const NavItemsInfo=[
    {name:"Home", type:"link"},
    {name:"Articles", type:"link"},
    {name:"Pages", type:"dropdown", items:["About Us", "Contact Us"] },
    {name:"Pricing", type:"link"},
    {name:"Faq", type:"link"}
]

const NavItem=({item})=>{

    const [dropdown,setDropdown]=useState(false);

    const toggleDropdownHandler=()=>{
        setDropdown((currState)=>{
            return !currState;
        });
    };

    return(
        <li className='relative group'>
            {item.type==="link"?(<>
                    <a href="/" className='px-4 py-2'>{item.name}</a>
                    <span className='cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100'>/</span>
                </>):(<div className='flex flex-col items-center'>
                    <button className='px-4 py-2 flex gap-x-1 items-center' onClick={toggleDropdownHandler}>
                       <span>{item.name}</span>
                        <MdKeyboardArrowDown/>
                    </button>
                    <div className={` ${dropdown? "block" : "hidden" } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}>
                        <ul className='bg-dark-soft lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden'>
                            {item.items.map((page,index)=>(
                                    <a href="/" key={index} className='lg:hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-soft'>
                                        {page}
                                    </a>
                            ))}
                        </ul>
                    </div>
                </div>)
            }
        </li>
    );
};

export default function Header() {
    const [NavIsVisible,setNavIsVisible]=useState(false);

    const navVisibilityHandler=()=>{
        setNavIsVisible((currState)=>{
            return !currState;
        });
    };

  return (
    <section className='sticky top-0 left-0 right-0 z-50 bg-white'>
        <header className='container mx-auto px-5 flex justify-between py-4 items-center'>
            <div>
                <img src={images.logo} className='w-16' alt=""/>
            </div>
            <div className='lg:hidden z-50'>
                {NavIsVisible? <AiOutlineClose className='h-6 w-6' onClick={navVisibilityHandler}/>:<AiOutlineMenu className='h-6 w-6' onClick={navVisibilityHandler}/>}
            </div>
            <div className={`${NavIsVisible?"right-0":"-right-full"} transition-all duration-500 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] fixed flex flex-col justify-center w-full lg:w-auto lg:justify-end lg:flex-row top-0 bottom-0 lg:static gap-x-9 items-center`}>
                <ul className='text-white lg:text-dark-soft items-center gap-y-4 flex flex-col lg:flex-row gap-x-5 font-semibold'>
                   {NavItemsInfo.map((item)=>(
                    <NavItem key={item.name} item={item}/>
                   ))}
                </ul>
                <button className='mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300'>Sign In</button>
            </div>
        </header>
    </section>
  )
}
