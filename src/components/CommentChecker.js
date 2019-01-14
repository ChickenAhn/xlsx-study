import React, { useState } from 'react'
import FileInput from './FileInput'
import { GetFileExtension } from '../utils/File'
import { Grid } from '@material-ui/core'

function CommentChecker() {
  const [files, setFile] = useState()

  const handleChange = event => {
    const f = event.target.files
    setFile(f)
  }

  return (
    <div>
      <FileInput files={files} handleChange={handleChange} />
    </div>
  )
}

export default CommentChecker
