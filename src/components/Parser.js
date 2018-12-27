import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FileInput from './FileInput'

function Parser(props) {
  const [file, setFile] = useState()

  const handleChange = event => {
    const file = event.target.files[0]
    const ext = getFileExtension(file.name)
    if (ext === 'xlsx' || ext === 'xls') {
      setFile(file)
    }
  }
  const rABS = false // true: readAsBinaryString ; false: readAsArrayBuffer
  const handleParse = () => {
    const reader = new FileReader()
    reader.onload = e => {
      let data = e.target.result
      if (rABS) data = new Uint8Array(data)
      const workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' })

      // Do something here
      console.log(workbook)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }

  return (
    <FileInput
      file={file}
      handleChange={handleChange}
      handleClick={handleClick}
    />
  )
}

export default Parser
