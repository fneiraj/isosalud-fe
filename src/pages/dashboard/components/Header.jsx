import { Grid, Typography } from '@material-ui/core'

const Header = () => {
  const patientName = 'Fernando Neira'
  const date = new Date()
  const time = date.getHours()

  const dateFormatted = '13 Dic 2021 11:14 am.'

  const greetings = time < 12 ? 'Buenos días' : 'Buenas tardes'

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant='h4'>
          {greetings}, {patientName}!
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ marginTop: 10 }}>
        <Typography variant='subtitle2'>
          {dateFormatted}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Header
