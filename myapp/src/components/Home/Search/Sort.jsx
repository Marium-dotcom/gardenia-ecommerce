import React from 'react'

export default function Sort({value,onChange}) {
  return (
    
      <div className="dropdown m-2">
  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
Sort by {value}  </button>
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <select value={value} onChange={onChange}>
    <option className="" >Lowest Price</option>
    <option className="" >Highest Price</option>

    <option className="" >Latest</option>
</select>
  </div>
</div>
    
  )
}
