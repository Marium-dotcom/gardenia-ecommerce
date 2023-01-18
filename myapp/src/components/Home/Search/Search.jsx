import React from 'react'

export default function Search({value, onChange}) {
  

  return (

    
      <input className="border rounded m-2 p-1 w-75 " value={value} onChange={onChange} type="text" placeholder="Search"  />
    
  )
}
