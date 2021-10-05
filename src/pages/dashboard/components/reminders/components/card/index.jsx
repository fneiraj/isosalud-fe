import { Box, Card, CardContent, Checkbox, Fade, Grid, Typography } from '@material-ui/core'
import Scrollable from 'components/scrollable'
import { useState } from 'react'

const RemindersCard = ({ visitsArr, setVisitArr, mobil } = {}) => {
  const [checked, setChecked] = useState([])

  const onCheckClick = ({ target }, id) => {
    setChecked(c => c.concat(id))

    setTimeout(() => {
      setVisitArr(visits => visits.filter(v => v.id !== id))
    }, 2000)
  }

  const isChecked = (id) => checked.indexOf(id) > -1

  const BodyCard = ({ id, time, patient, description }) => (
    <Card variant='outlined' style={{ width: '100%' }}>
      <CardContent>
        <Grid container>
          <Grid item xs={10}>
            <Typography style={{ fontWeight: '300px' }}>
              {patient}
            </Typography>
            <Typography variant='body2' component='p'>
              {description}
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

  const RenderDesktop = () => (
    <Grid container spacing={2} direction='row'>
      {visitsArr.map(visit => (
        <Grid item key={visit.id} style={{ marginLeft: 10, marginRight: 10, width: '100%' }}>
          <Fade in={() => isChecked(visit.id)}>
            <BodyCard {...visit} />
          </Fade>
        </Grid>
      ))}
    </Grid>
  )

  const RenderMobil = () => (
    <Scrollable>
      <Box style={{ width: '100%', overflow: 'auto' }}>
        <Grid container direction='row' wrap='nowrap'>
          {visitsArr.map(visit => (
            <Grid item key={visit.id} style={{ width: '233px' }}>
              <Fade in={() => isChecked(visit.id)}>
                <BodyCard {...visit} />
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Scrollable>
  )

  return mobil ? <RenderMobil /> : <RenderDesktop />
}

export default RemindersCard
