import React, { useEffect, useState } from 'react'
import Style from './Search.module.css'
export default function Search() {
  const [counter, setCounter] = useState(0)
  useEffect(() => { }, [])
  return <>
    <div className="text-center mb-5">
      <input type="text" className='w-3/4 py-1 rounded-md px-2 outline-0 border border-gray-400 search' placeholder='Search' />
    </div>

  </>
}
