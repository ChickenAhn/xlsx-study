import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
})

const menues = [
  {
    name: 'Home',
    link: '/'
  },
  // {
  //   name: 'Parser',
  //   link: 'parser'
  // },
  {
    name: 'Comment Checker',
    link: 'comment-checker'
  }
]

function PermanentDrawer(props) {
  const { classes, children } = props

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>{children}</main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="right"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {menues.map((menu, index) => (
            <ListItem component={Link} to={menu.link} key={index}>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </div>
  )
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PermanentDrawer)
