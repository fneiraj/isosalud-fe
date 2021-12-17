/* eslint-disable */
import { Box, Card, CardContent, Checkbox, Fade, Grid, Typography } from '@material-ui/core'
import Scrollable from 'components/scrollable'
import { useState } from 'react'
import dateFnsInstance from 'utils/date-fns-utils'

const RemindersCard = ({ notes, setVisitArr, onDeleteHandle } = {}) => {
  const [checked, setChecked] = useState([])

  const onCheckClick = ({ target }, id) => {
    setChecked(c => c.concat(id))

    setTimeout(() => {
      onDeleteHandle(id)
    }, 1000)
  }

  const isChecked = (id) => checked.indexOf(id) > -1

  const RenderNote = ({ comment, id }) => {
    return (
      <Card variant='outlined'>
        <CardContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography style={{ fontWeight: '300px' }}>

              </Typography>
              <Typography variant='body2' component='p'>
                {comment}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <div>
                <Checkbox
                  color='primary'
                  checked={isChecked(id)}
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  onChange={(event => onCheckClick(event, id))}
                />
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }

  const EmptyState = () => {
    return (
    <div>
      Sin registros
    </div>
    )
  }

  return (
    <Grid container spacing={2} direction='row'>
      {notes && notes.length > 0 ? notes.map(note => (
        <Grid item key={note.id} style={{ marginLeft: 10, marginRight: 10, width: '100%' }}>
          <Fade in={() => isChecked(note.id)}>
            <RenderNote {...note} />
          </Fade>
        </Grid>
      )) : <Grid item style={{ marginLeft: 10, marginRight: 10, width: '100%' }}><EmptyState /></Grid>}
    </Grid>
  )
}

export default RemindersCard
