import React from 'react'


export default function Search({value,onChange}) {




  return (
    <div>
    <input value={value} onChange={onChange} type="text" placeholder="Search"  />
  </div>
  )
}
