import React, { useState } from 'react'

import { Grid, Typography, withStyles, Paper } from '@material-ui/core'
import FileInput from './FileInput'
import FileItem from './FileItem'
import { GetFileExtension, checkComment } from '../utils/File'
import FileDetail from './FileDetail'

const styles = theme => ({
  resultArea: {
    marginTop: theme.spacing.unit * 2
  },
  paper: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
})

function CommentChecker(props) {
  const { classes } = props
  const [files, setFiles] = useState()
  const [activeIndex, setActiveIndex] = useState(null)
  const [isCheckingComment, setIsCheckingComment] = useState(false)

  const handleChange = event => {
    const uploadedFiles = event.target.files
    let newState

    Object.keys(uploadedFiles).map(index => {
      const f = uploadedFiles[index]

      const ext = GetFileExtension(f.name)
      // Validate extension
      if (ext === 'xls' || ext === 'xlsx') {
        newState = { ...newState, [index]: f }
      }
    })

    setFiles(newState)
  }

  const handleToggle = async index => {
    const f = files[index]
    if (!f.comments) {
      // setIsCheckingComment(true)
      f.comments = await checkComment(f)
      // setIsCheckingComment(false)
    }
    setActiveIndex(index)
  }
  console.log(files)

  return (
    <div>
      <FileInput files={files} handleChange={handleChange} />
      {files && (
        <div className={classes.resultArea}>
          <Typography color="textSecondary">업로드 결과</Typography>
        </div>
      )}
      <Grid container spacing={8}>
        <Grid item xs={4}>
          <Grid container spacing={8}>
            {files &&
              Object.keys(files).map((n, index) => (
                <Grid item xs={12} key={index}>
                  <FileItem
                    active={index === activeIndex}
                    file={files[n]}
                    onClick={event => handleToggle(index)}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={8}>
          {activeIndex !== null ? (
            <FileDetail file={files[activeIndex]} />
          ) : null}
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(CommentChecker)
