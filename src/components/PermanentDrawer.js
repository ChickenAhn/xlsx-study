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
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { Home, MessageSquare, Eye, Scissors, FileText } from 'react-feather'

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
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
    link: '/',
    icon: <Home />
  },
  {
    name: 'Parser',
    link: 'parser',
    icon: <FileText />
  },
  {
    name: 'Comment Checker',
    link: 'comment-checker',
    icon: <MessageSquare />
  },
  {
    name: 'Find Hidden Sheet',
    link: 'find-hidden-sheet',
    icon: <Eye />
  },
  {
    name: 'Fill Out Form',
    link: 'fill-out-form',
    icon: <Scissors />
  }
]

function PermanentDrawer(props) {
  const { classes, children, location } = props
  console.log(location)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <List>
          <ListItem>
            <ListItemText primary="Xlsx-study" secondary="datalobby v0.1.0" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {menues.map((menu, index) => (
            <ListItem component={Link} to={menu.link} key={index}>
              <ListItemIcon>{menu.icon}</ListItemIcon>
              <ListItemText primary={menu.name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  )
}

PermanentDrawer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PermanentDrawer)
