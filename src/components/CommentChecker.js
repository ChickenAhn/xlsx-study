import React from 'react'

function CommentChecker() {
  return (
    <div>
      <FileInput
        file={file}
        handleChange={handleChange}
        handleParse={handleParse}
      />
    </div>
  )
}

export default CommentChecker
