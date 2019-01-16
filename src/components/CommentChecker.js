import React, { useState } from 'react'
import uuidv4 from 'uuid/v4'

import { Grid, Typography, withStyles, Paper } from '@material-ui/core'
import { GetFileExtension, checkComment } from '../utils/File'
import FileInput from './FileInput'
import FileItem from './FileItem'
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
      const fileId = uuidv4()
      // Validate extension
      if (ext === 'xls' || ext === 'xlsx') {
        newState = { ...newState, [fileId]: f }
      }
    })
    setFiles({ ...files, ...newState })
  }

  const handleActive = async index => {
    const f = files[index]
    setActiveIndex(index)
    if (!f.comments) {
      // setIsCheckingComment(true)
      f.comments = await checkComment(f)
      // setIsCheckingComment(false)
    }
  }
  const handleDismiss = index => {
    if (index === activeIndex) setActiveIndex(null)
    const newState = Object.keys(files).reduce((object, key) => {
      if (key !== index) {
        object[key] = files[key]
      }
      return object
    }, {})
    setFiles(newState)
  }

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
              Object.keys(files).map(id => (
                <Grid item key={id}>
                  <FileItem
                    active={id === activeIndex}
                    file={files[id]}
                    onClickActive={event => handleActive(id)}
                    onClickDismiss={event => handleDismiss(id)}
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
