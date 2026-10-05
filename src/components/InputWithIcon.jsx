import React from 'react'

export default function InputWithIcon({icon , onchange , placeholder , value}) {
  return (
<div className="relative w-full">
  {icon}
  <input
    type="text"
    className="w-full rounded-md border-2 border-gray-300 p-2 pl-10 focus:outline-none focus:border-indigo-500"
    value={value}
    onChange={onchange}
    placeholder={placeholder}
  />
</div>  )
}
