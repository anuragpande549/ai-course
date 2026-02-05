'use client'
import React from 'react'
import { UserInputConext } from '../../_context/userInputContext'
import { useState } from 'react'


function CreateCourseLayout({children}) {
    const [userCourseInput, setUserCourseInput] = useState([])
  return (
      <div>
        <UserInputConext.Provider value={{setUserCourseInput,userCourseInput}}>       
        {children}
    </UserInputConext.Provider>
    </div>
  )
}

export default CreateCourseLayout