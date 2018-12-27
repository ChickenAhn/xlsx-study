import React, { useState } from 'react'
import { Paper, Typography, Button, withStyles } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import XLSX from 'xlsx'

function File(props) {
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
  const { classes } = props
  return (
    <Paper className={classes.root} elevation={1}>
      {file ? (
        <>
          <CheckIcon className={classes.fileIcon} color="primary" />
          <Typography variant="subtitle2">{file.name}</Typography>
          <Typography
            className={classes.fileSize}
            variant="subtitle2"
            color="textSecondary"
          >
            {bytesToSize(file.size)}
          </Typography>
        </>
      ) : (
        <Typography variant="subtitle2" color="textSecondary">
          Please upload file...
        </Typography>
      )}
      <div className={classes.control}>
        <input
          accept=".xlsx, .xls"
          className={classes.input}
          id="flat-button-file"
          type="file"
          onChange={event => handleChange(event)}
        />
        <label htmlFor="flat-button-file">
          <Button component="span">upload</Button>
        </label>
        <Button component="span" disabled={!file} onClick={handleParse}>
          parse
        </Button>
      </div>
    </Paper>
  )
}

export default withStyles(styles)(File)
