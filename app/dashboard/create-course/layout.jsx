import React from 'react'
// We already wrapped Root layout with UserContextProvider, so we don't need it here.

function CreateCourseLayout({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

export default CreateCourseLayout