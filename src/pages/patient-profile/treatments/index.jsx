import { Button, Grid, Paper } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import TreatmentCard from './components/TreatmentCard'
import { DataMock } from 'mock/data'
import TreatmentDetails from './components/TreatmentDetails'
import { useState } from 'react'

const styles = {
  root: {
    width: '100%',
    height: '100%'
    //    marginTop: theme.spacing(3)
  },
  tableWrapper: {
    marginLeft: 25,
    marginRight: 25,
    paddingTop: 15
  }
}

const TreatmentPlansPage = (props) => {
  const { classes } = props
  const [openModalDetails, setOpenModalDetails] = useState(false)

  const handleCloseModal = () => {
    setOpenModalDetails(false)
  }

  const handleOpenModal = (id) => {
    setOpenModalDetails(true)
  }

  return (
    <>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Grid container justify='flex-end'>
            <Grid key='addEvolution' item>
              <Button
                onClick={() => {
                }}
                variant='contained'
                color='primary'
                className={classes.button}
                endIcon={<AddIcon />}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid container justify='flex-start' spacing={3} style={{ marginTop: 10, marginBottom: 10 }}>
            {DataMock.treatments().map(({
              id,
              treatment,
              startDate,
              lastDate,
              author,
              status,
              specialty
            }) => (
              <Grid key={id} item xs={12}>
                <TreatmentCard
                  handleOpenDetails={handleOpenModal} key={id} id={id}
                  treatment={treatment} startDate={startDate} lastDate={lastDate}
                  author={author} status={status} specialty={specialty}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </Paper>
      <TreatmentDetails open={openModalDetails} handleClose={handleCloseModal} />
    </>
  )
}

export default withStyles(styles)(TreatmentPlansPage)
