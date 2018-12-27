import React from 'react'
import PropTypes from 'prop-types'
import { Paper, Typography, Button, withStyles } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import BytesToSize from '../utils/File/ByteToSize'

const styles = theme => ({
  root: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  control: {
    marginLeft: 'auto'
  },
  input: {
    display: 'none'
  },
  fileIcon: {
    marginRight: theme.spacing.unit
  },
  fileSize: {
    marginLeft: theme.spacing.unit
  }
})

function FileInput(props) {
  const { classes, file = null, handleChange, handleParse } = props
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
            {BytesToSize(file.size)}
          </Typography>
        </>
      ) : (
        <Typography variant="subtitle2" color="textSecondary">
          Please upload file...
        </Typography>
      )}
      <div className={classes.control}>
        <label htmlFor="flat-button-file">
          <input
            accept=".xlsx, .xls"
            className={classes.input}
            id="flat-button-file"
            type="file"
            onChange={event => handleChange(event)}
          />
          <Button component="span">upload</Button>
        </label>
        <Button component="span" disabled={!file} onClick={handleParse}>
          parse
        </Button>
      </div>
    </Paper>
  )
}
FileInput.propTypes = {
  classes: PropTypes.instanceOf(Object),
  file: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func,
  handleParse: PropTypes.func
}

export default withStyles(styles)(FileInput)
