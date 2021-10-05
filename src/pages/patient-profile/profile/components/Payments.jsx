import { Card, CardContent, Grid, Link as MuiLink, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(14),
    height: theme.spacing(14),
    fontSize: theme.spacing(10)
  },
  bold: {
    fontWeight: 500
  },
  right: {
    float: 'right'
  },
  smallFont: {
    fontWeight: 230,
    fontSize: 14
  },
  noteItem: {
    '&:hover': {
      background: '#E5E5E5',
      cursor: 'pointer'
    }
  }
}))

const Payments = ({ handleAddNote }) => {
  const classes = useStyles()

  const notes = [
    {
      id: 1,
      title: 'Pago 1',
      author: '$100',
      date: 'En espera',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum eros vitae faucibus viverra. Praesent volutpat mattis dui, sit amet tincidunt risus viverra eget. Vestibulum condimentum nisi lacus, a lobortis orci ultrices a. Duis ornare eros eget sapien venenatis, et pharetra urna auctor. Duis vitae nisi a arcu tincidunt vulputate. Nullam odio quam, ultrices tempus enim eu, mattis finibus velit. Proin iaculis fringilla tellus, non auctor diam tempor ut. In ut elit non nibh gravida consectetur in eu turpis. Nulla ut urna dui. Nulla sollicitudin nec quam ut posuere. Nunc aliquet faucibus metus eget euismod.'
    },
    {
      id: 2,
      title: 'Pago 2',
      author: '$300',
      date: 'Pagado',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum eros vitae faucibus viverra. Praesent volutpat mattis dui, sit amet tincidunt risus viverra eget. Vestibulum condimentum nisi lacus, a lobortis orci ultrices a. Duis ornare eros eget sapien venenatis, et pharetra urna auctor. Duis vitae nisi a arcu tincidunt vulputate. Nullam odio quam, ultrices tempus enim eu, mattis finibus velit. Proin iaculis fringilla tellus, non auctor diam tempor ut. In ut elit non nibh gravida consectetur in eu turpis. Nulla ut urna dui. Nulla sollicitudin nec quam ut posuere. Nunc aliquet faucibus metus eget euismod.'
    },
    {
      id: 3,
      title: 'Pago 3',
      author: '$125',
      date: 'Pagado',
      note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum eros vitae faucibus viverra. Praesent volutpat mattis dui, sit amet tincidunt risus viverra eget. Vestibulum condimentum nisi lacus, a lobortis orci ultrices a. Duis ornare eros eget sapien venenatis, et pharetra urna auctor. Duis vitae nisi a arcu tincidunt vulputate. Nullam odio quam, ultrices tempus enim eu, mattis finibus velit. Proin iaculis fringilla tellus, non auctor diam tempor ut. In ut elit non nibh gravida consectetur in eu turpis. Nulla ut urna dui. Nulla sollicitudin nec quam ut posuere. Nunc aliquet faucibus metus eget euismod.'
    }
  ]

  const renderNote = ({ id, title, author, date }) => (
    <Typography component='div' className={classes.noteItem}>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography>{author}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.smallFont}>{date}</Typography>
        </Grid>
      </Grid>
    </Typography>
  )

  const Notes = () => (
    <Grid container>
      {notes.map(note => (
        <Grid item xs={12} key={note.id}>
          {renderNote(note)}
        </Grid>
      ))}
    </Grid>
  )

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' gutterBottom>
          Pagos
          <MuiLink component={Link} to='/' className={classes.right}>
            Ver todos
          </MuiLink>
        </Typography>
        <Notes />
      </CardContent>
    </Card>
  )
}

export default Payments
