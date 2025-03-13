import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-600 animate-bounce"></div>
      </div>
    </div>
  )
}

export default Loading