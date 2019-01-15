import React from 'react'
import { Paper, Typography, withStyles, ButtonBase } from '@material-ui/core'
import BytesToSize from '../utils/File/ByteToSize'

const styles = theme => ({
  root: {
    width: '100%'
  },
  paper: {
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
  active: {
    paddingLeft: theme.spacing.unit,
    transition: '.5s'
  },
  inActive: {
    transition: '.3s'
  },
  fileIcon: {
    marginRight: theme.spacing.unit
  },
  fileSize: {
    marginLeft: theme.spacing.unit
  }
})

function FileItem(props) {
  const { classes, file, onClick, active } = props
  return (
    <ButtonBase focusRipple className={classes.root} onClick={onClick}>
      <Paper className={classes.paper} elevation={active ? 5 : 1}>
        <Typography
          className={active ? classes.active : classes.inActive}
          variant="subtitle2"
          align="left"
        >
          {file.name}
        </Typography>
        <Typography
          className={classes.fileSize}
          variant="subtitle2"
          color="textSecondary"
        >
          {BytesToSize(file.size)}
        </Typography>
      </Paper>
    </ButtonBase>
  )
}

export default withStyles(styles)(FileItem)
