/* eslint-disable */
import { Button, Card, CardContent, Grid, Link, Typography } from '@material-ui/core'
import { saveAs } from 'file-saver'
import GetAppIcon from '@material-ui/icons/GetApp'
import dateUtils from 'utils/date-fns-utils'
import { downloadZip } from "client-zip/index.js"

const RenderFile = ({ name, downloadUrl }) => {
  return (
    <Grid container spacing={3} style={{ marginLeft: 30, marginRight: 30 }}>
      <Grid item xs>
        <Typography color='textSecondary' style={{ whiteSpace: 'pre-line' }} gutterBottom>
          <Link onClick={() => saveAs('http://cdn.isosalud.cl/' + downloadUrl, name)} style={{ cursor: 'pointer' }}>
            {name}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

const CollectionFiles = ({ collectionName, date, medicUser, documents }) => {
  const dateParsed = dateUtils.parse(date, 'yyyy-MM-dd HH:mm:ss')
  const dateFormatted = dateUtils.format(dateParsed, 'dd-MM-yyyy HH:mm')

  const medicName = `${medicUser?.personInfo?.firstName} ${medicUser?.personInfo?.lastName}`

  const downloadCollection = () => {
    saveAs('http://cdn.isosalud.cl/radiografias.zip', 'radiografias.zip')

    /*const fetchs = documents.map( async ({downloadUrl, name}) => {
      return {
        name: name, 
        input: await window.fetch('http://cdn.isosalud.cl/' + downloadUrl)
      }
    })

    console.log(fetchs)

    const zipBlob = await downloadZip(fetchs).blob()

    saveAs(zipBlob, collectionName)

    console.log(documents)
    */
  }

  return (
    <Card className='' variant='outlined'>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom>
              {collectionName}
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Typography color='textSecondary' gutterBottom>
              {dateFormatted}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {documents.map(file => <RenderFile key={file.id} {...file} />)}
          <Grid item>
            <Grid key='downloadButton' item>
              <Button
                onClick={downloadCollection}
                variant='contained'
                color='primary'
              //              className={classes.button}
                endIcon={<GetAppIcon />}
              >
                Descargar colección
              </Button>
            </Grid>
          </Grid>
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

export default CollectionFiles
