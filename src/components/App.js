import React from 'react'
import { Grid, Typography, withStyles } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import green from '@material-ui/core/colors/green'
import grey from '@material-ui/core/colors/grey'
import FileInput from './FileInput'

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
    primary: green,
    secondary: grey
  }
})

const App = props => {
  const { classes } = props
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container className={classes.root} spacing={16} justify="center">
        <Grid item xs={12} className={classes.header}>
          <Typography className={classes.title} variant="h4" gutterBottom>
            xlsx
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} />
        <Parser />
      </Grid>
    </MuiThemeProvider>
  )
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default withStyles(styles)(App)
