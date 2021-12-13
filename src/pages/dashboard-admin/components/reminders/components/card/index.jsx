/* eslint-disable */
import { Box, Card, CardContent, Checkbox, Fade, Grid, Typography } from '@material-ui/core'
import Scrollable from 'components/scrollable'
import { useState } from 'react'
import dateFnsInstance from 'utils/date-fns-utils'

const RemindersCard = ({ notes, setVisitArr, mobil } = {}) => {
  const [checked, setChecked] = useState([])

  const onCheckClick = ({ target }, id) => {
    setChecked(c => c.concat(id))

    setTimeout(() => {
      setVisitArr(visits => visits.filter(v => v.id !== id))
    }, 2000)
  }

  const isChecked = (id) => checked.indexOf(id) > -1

  const RenderNote = ({ comment, dateCreated, dateReminder, id }) => {


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

  return (
    <Grid container spacing={2} direction='row'>
      {notes.map(note => (
        <Grid item key={note.id} style={{ marginLeft: 10, marginRight: 10, width: '100%' }}>
          <Fade in={() => isChecked(note.id)}>
            <RenderNote {...note} />
          </Fade>
        </Grid>
      ))}
    </Grid>
  )
}

export default RemindersCard
