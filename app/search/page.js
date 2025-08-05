'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { fetchallusers } from '../actions/useractions'
import { useRouter } from 'next/navigation'

const Page = () => {
    const [search, setsearch] = useState("")
    const [user, setuser] = useState([])
    const router = useRouter()

    const getData = async () => {
        const data = await fetchallusers(search);
        setuser(data);
        console.log("user", data);
    }

    useEffect(() => {
        getData();
        console.log("search", search);
    }, [search])


  return (
    <div className="flex flex-col justify-start items-center px-[10vw] min-h-[calc(100vh-155px)] sm:min-h-[calc(100vh-116px)] text-white">
      <div className="mt-3 flex justify-center items-center">
        <input type="text" className="border-white border p-2 rounded-l-md border-r-black focus:outline-none" placeholder="Search Username" value={search} onChange={(e) => setsearch(e.target.value)} />
        <button className="border border-white text-white p-2 rounded-r-md cursor-pointer duration-300 hover:bg-stone-400 hover:invert hover:border-black" type="button" id="button-addon2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotatex-180 injected-svg" data-src="https://cdn.hugeicons.com/icons/search-01-solid-rounded.svg?v=2.0" role="img" color="#ffffff">
            <path fillRule="evenodd" clipRule="evenodd" d="M11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C13.125 20 15.078 19.2635 16.6177 18.0319L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L18.0319 16.6177C19.2635 15.078 20 13.125 20 11C20 6.02944 15.9706 2 11 2ZM4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 14.866 14.866 18 11 18C7.13401 18 4 14.866 4 11Z" fill="#ffffff"></path>
            </svg></button>
      </div>
      <div className="mt-5">
        {search && <p>Searching for: {search}</p>}
        <div className="flex flex-col gap-3 items-stretch">
          {Array.isArray(user) && user.length > 0 ? user.map((u) => (
            <div onClick={() => router.push(`/${u.name}`)} key={u.id} className="cursor-pointer hover:bg-gray-600 duration-300 bg-gray-800 p-4 rounded-lg flex items-center justify-start min-w-[250px] gap-4 ">
              <img src={u.profile} alt={u.name} className="w-12 h-12 rounded-full" />
              <h2 className="text-xl font-semibold">{u.name}</h2>
            </div>
          )) : (
            <p className="text-gray-400">No users found</p>
          )}

      </div>
    </div>
    </div>
  )
}

export default Page
