import React, { useState } from 'react'

interface input {
  correct: string;
  title: string;
  instructions: string;
  choices: string[];
}

const MultipleChoice: React.FC<input> = (data) => {

  return (
    <div className={"bg-gray-600 w-1/2 h-1/2 m-auto"}>
      <h1 className={"text-16 text-center text-white"}>{data.title}</h1>
      <div className={"grid grid-cols-4 gap-4"}>

      </div>
    </div>
  )
}

export default MultipleChoice
