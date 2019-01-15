import React from 'react'
import {
  Paper,
  Typography,
  withStyles,
  Grid,
  IconButton
} from '@material-ui/core'
import CommentIcon from '@material-ui/icons/Comment'
const styles = theme => ({
  paper: {
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  commentLabel: {
    display: 'flex'
  },
  commentLocation: {
    marginLeft: theme.spacing.unit
  }
})

function FileDetail(props) {
  const {
    file: { comments },
    classes
  } = props

  return (
    <Grid container spacing={8}>
      {comments ? (
        comments.map(sheet => {
          const [sheetName, cells] = Object.entries(sheet)[0]
          return cells.map(cell => {
            const [cellIndex, comment] = Object.entries(cell)[0]
            return comment.map((c, index) => {
              console.log(c)
              return (
                <Grid item xs={12} key={`${sheetName}-${cellIndex}-${index}`}>
                  <Paper className={classes.paper} elevation={1}>
                    <Grid container spacing={8}>
                      <Grid item xs={12} md={3} lg={2}>
                        <div className={classes.commentLabel}>
                          <IconButton>
                            <CommentIcon fontSize="small" />
                          </IconButton>
                          <div className={classes.commentLocation}>
                            <Typography
                              variant="subtitle2"
                              component="span"
                              color="primary"
                            >
                              {sheetName}
                            </Typography>
                            <Typography component="span" color="textSecondary">
                              {cellIndex}
                            </Typography>
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={9}>
                        <Typography key={index}>{c.t}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              )
            })
          })
        })
      ) : (
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={0}>
            <Typography color="textSecondary">코멘트가 없슴다</Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  )
}

export default withStyles(styles)(FileDetail)
