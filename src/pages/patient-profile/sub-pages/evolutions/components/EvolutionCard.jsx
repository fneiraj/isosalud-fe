import { Card, CardContent, Grid, Typography } from '@material-ui/core'

const EvolutionCard = ({ id, date, author, description }) => {
  return (
    <Card className='' variant='outlined'>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom>
              #{id}
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Typography color='textSecondary' gutterBottom>
              {date}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Typography color='textSecondary' style={{ whiteSpace: 'pre-line' }} gutterBottom>
            {description}
          </Typography>
        </Grid>
        <Grid container>
          <Grid item xs />
          <Grid item>
            <Typography color='textSecondary'>
              Dr/a: {author}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EvolutionCard
