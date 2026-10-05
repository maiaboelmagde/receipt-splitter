import React from 'react'

export default function EmptyContent({children}) {
  return (
    <div className="text-center text-gray-500 border-dashed border-2 border-gray-300 p-4 rounded-md grid place-items-center">
      {children || "No content to display"}
    </div>
  )
}
