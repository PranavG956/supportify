"use client"

import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { useSession,signOut } from 'next-auth/react'

const Navbar = () => {

    const { data: session } = useSession();
    const [isopen, setisopen] = useState(false)

  return (
    <div className="bg-black text-white sticky top-0 z-10">
        <div className="nav flex flex-col sm:flex-row justify-between items-center py-5 px-[5vw] gap-[15px]">
        <ul className="flex gap-3">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="injected-svg invert" data-src="https://cdn.hugeicons.com/icons/save-money-dollar-solid-sharp.svg?v=2.0" role="img" color="#000000">
              <path d="M16.6586 14.8079L12.7161 16.1907C12.723 16.211 12.7286 16.2319 12.733 16.2534C12.7761 16.4663 12.7987 16.6871 12.7987 16.9134C12.7987 17.3089 12.5584 17.6826 12.1717 17.8038L9.33295 18.6936C8.62969 18.9141 7.87685 18.8365 7.22606 18.4795L4.8761 16.9727L5.40659 16.1286L7.71218 17.6083C8.12797 17.8317 8.59943 17.8766 9.03979 17.7385L11.7406 16.8919V16.7584C11.6685 15.7777 10.9181 14.9918 9.98566 14.9918H8.82083C8.45035 14.9918 8.08463 14.8972 7.75252 14.715L5.47122 13.4636C5.21547 13.3233 4.93297 13.25 4.6462 13.25H2.25V20.3223L9.19484 22.6587C9.70827 22.8315 10.2591 22.7573 10.7273 22.4511L19.75 16.5979C19.0349 14.6745 17.4503 14.5283 16.6586 14.8079Z" fill="#000000"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M8.35371 13.6191L7.42987 13.1123C6.68227 11.9205 6.25 10.5107 6.25 9.00002C6.25 4.71981 9.7198 1.25002 14 1.25002C18.2802 1.25002 21.75 4.71981 21.75 9.00002C21.75 11.0487 20.9551 12.9118 19.6569 14.2976C19.364 14.0513 19.0454 13.8603 18.7112 13.7219C17.8258 13.3553 16.913 13.3928 16.2437 13.6288L12.3747 14.9858C11.8429 14.2489 11.003 13.7418 9.98566 13.7418H8.82083C8.6649 13.7418 8.50544 13.7023 8.35371 13.6191ZM12.1358 4.83936C12.4543 4.6005 12.8358 4.4281 13.25 4.33361L13.25 3.50002L14.75 3.50002V4.33453C15.5387 4.51517 16.2347 4.98028 16.5646 5.68029L15.2078 6.31974C15.0905 6.07099 14.6684 5.75002 14 5.75002C13.5943 5.75002 13.2559 5.87429 13.0358 6.03936C12.8159 6.20425 12.75 6.3748 12.75 6.50002C12.75 6.62524 12.8159 6.79578 13.0358 6.96068C13.2559 7.12574 13.5943 7.25002 14 7.25002C14.6989 7.25002 15.3604 7.46153 15.8642 7.83936C16.3682 8.21736 16.75 8.79681 16.75 9.50002C16.75 10.2032 16.3682 10.7827 15.8642 11.1607C15.5457 11.3995 15.1642 11.5719 14.75 11.6664V12.5H13.25V11.6655C12.4613 11.4849 11.7653 11.0198 11.4354 10.3197L12.7922 9.68029C12.9095 9.92904 13.3316 10.25 14 10.25C14.4057 10.25 14.7441 10.1257 14.9642 9.96068C15.1841 9.79578 15.25 9.62524 15.25 9.50002C15.25 9.3748 15.1841 9.20425 14.9642 9.03936C14.7441 8.87429 14.4057 8.75002 14 8.75002C13.3011 8.75002 12.6396 8.5385 12.1358 8.16068C11.6318 7.78268 11.25 7.20323 11.25 6.50002C11.25 5.79681 11.6318 5.21736 12.1358 4.83936Z" fill="#000000"></path>
              </svg>
            </li>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link className="flex items-center" href="/search"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" className="rotatex-180 injected-svg" data-src="https://cdn.hugeicons.com/icons/search-01-solid-rounded.svg?v=2.0" role="img" color="#ffffff">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11Z" fill="#ffffff"></path>
            </svg><span>Search</span></Link></li>
        </ul>
        <div className="">
          {session ?(   
            <div className="flex gap-3 justify-center items-center">     
            <button onClick={() => setisopen(!isopen)} onBlur={() => {setTimeout(() => {
              setisopen(false)
            }, 300);}}  type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center">Menu <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg></button>


            {isopen && <div id="dropdown" className="z-10 absolute top-16 bg-gray-800 divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                  </li>
                  <li>
                    <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Your Page</Link>
                  </li>
                  <li>
                    <Link href="/earnings" className="block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                  </li>
                  <li>
                    <div onClick={()=>signOut()} className="cursor-pointer block px-4 py-2 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</div>
                  </li>
                </ul>
            </div> }  
            {/* <button onClick={()=>signOut()} type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center">SignOut</button> */}
            </div>
          ) :(
            <Link href="/login">
            <div className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center">Login</div>
            </Link>
          )}  
        </div>
        </div>
    </div>
  )
}

export default Navbar
