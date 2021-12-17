/* eslint-disable */
import { Button, Card, CardContent, Grid, Link, Typography } from '@material-ui/core'
import { saveAs } from 'file-saver'
import GetAppIcon from '@material-ui/icons/GetApp'
import dateUtils from 'utils/date-fns-utils'

const RenderFile = ({ name, downloadUrl }) => {
  return (
    <Grid container spacing={3} style={{ marginLeft: 30, marginRight: 30 }}>
      <Grid item xs>
        <Typography color='textSecondary' style={{ whiteSpace: 'pre-line' }} gutterBottom>
          <Link onClick={() => saveAs(downloadUrl, name)} style={{ cursor: 'pointer' }}>
            {name}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

const EvolutionRenderCard = ({ comment, dateCreated, medic }) => {
  const dateParsed = dateUtils.parse(dateCreated, 'yyyy-MM-dd HH:mm:ss')
  const dateFormatted = dateUtils.format(dateParsed, 'dd-MM-yyyy HH:mm')

  const medicName = `${medic?.personInfo?.firstName} ${medic?.personInfo?.lastName}`

  return (
    <Card className='' variant='outlined'>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs />
          <Grid item>
            <Typography color='textSecondary' gutterBottom>
              {dateFormatted}
            </Typography>
          </Grid>
          
        </Grid>
        <Grid item style={{marginTop: 15, marginBottom: 15}}>
            <Typography color='textSecondary' gutterBottom style={{ whiteSpace: 'pre-line' }}>
              {comment}
            </Typography>
          </Grid>
        <Grid container spacing={3}>
          <Grid item xs />
          <Grid item>
            <Typography color='textSecondary'>
              {medicName}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default EvolutionRenderCard
