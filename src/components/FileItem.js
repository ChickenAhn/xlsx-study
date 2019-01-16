import React from 'react'
import classNames from 'classnames'
import {
  Paper,
  Typography,
  withStyles,
  ButtonBase,
  IconButton
} from '@material-ui/core'
import BytesToSize from '../utils/File/ByteToSize'
import { File as FileIcon, X } from 'react-feather'

const styles = theme => ({
  root: {
    display: 'flex',
    position: 'relative'
  },
  content: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 2,
    maxWidth: '150px',
    transition: '.3s'
  },
  control: {
    marginLeft: 'auto'
  },
  input: {
    display: 'none'
  },
  activeBackground: {
    backgroundColor: theme.palette.primary.light,
    transition: '.5s'
  },
  activeText: {
    color: theme.palette.primary.dark,
    transition: '.5s'
  },
  fileIcon: {
    marginBottom: theme.spacing.unit
  },
  fileName: {
    fontSize: '11px'
  },
  fileSize: {
    fontSize: '11px'
  },
  dismiss: {
    position: 'absolute',
    zIndex: 1500,
    right: 0
  }
})

const iconStyle = {
  fileIcon: {
    size: 60,
    strokeWidth: 1
  },
  dismissIcon: {
    size: 16
    // zIndex: 1000
  }
}

function FileItem(props) {
  const { classes, file, onClickActive, onClickDismiss, active } = props
  return (
    <Paper className={classes.root} elevation={active ? 5 : 1}>
      <IconButton
        disableRipple
        className={classes.dismiss}
        onClick={onClickDismiss}
      >
        <X
          width={iconStyle.dismissIcon.size}
          height={iconStyle.dismissIcon.size}
          color="gray"
        />
      </IconButton>
      <ButtonBase
        className={classNames(
          classes.content,
          active && classes.activeBackground,
          active && classes.activeText
        )}
        onClick={onClickActive}
      >
        <FileIcon
          className={classes.fileIcon}
          width={iconStyle.fileIcon.size}
          height={iconStyle.fileIcon.size}
          strokeWidth={iconStyle.fileIcon.strokeWidth}
          color="black"
        />
        <Typography className={classes.fileName} color="inherit">
          {file.name}
        </Typography>
        <Typography
          className={classes.fileSize}
          variant="subtitle2"
          color="textSecondary"
        >
          {BytesToSize(file.size)}
        </Typography>
      </ButtonBase>
    </Paper>
  )
}

export default withStyles(styles)(FileItem)
