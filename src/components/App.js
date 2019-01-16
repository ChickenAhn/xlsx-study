import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { withStyles } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'

import Parser from './Parser'
import PermanentDrawer from './PermanentDrawer'
import Home from './Home'
import CommentChecker from './CommentChecker'
import { lightBlue } from '@material-ui/core/colors'
import NotYet from './NotYet'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    marginTop: '3%',
    marginBottom: '3%'
  },
  title: {
    textAlign: 'center'
  }
})

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      light: lightBlue[100],
      main: lightBlue[500],
      dark: lightBlue[900]
    }
    // secondary: grey
  }
})

const App = props => {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <PermanentDrawer>
          <Route exact path="/" component={Home} />
          <Route path="/parser" component={NotYet} />
          <Route path="/comment-checker" component={CommentChecker} />
          <Route path="/find-hidden-sheet" component={NotYet} />
          <Route path="/fill-out-form" component={NotYet} />
        </PermanentDrawer>
      </Router>
      {/* <Grid container className={classes.root} spacing={16} justify="center">
        <Grid item xs={12} className={classes.header} />
        <Grid item xs={12} md={10}>
          
        </Grid>
      </Grid> */}
    </MuiThemeProvider>
  )
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default withStyles(styles)(App)
