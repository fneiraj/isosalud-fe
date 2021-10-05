import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  scrollable: {
    maxHeight: '270px',
    width: '100%',
    overflow: 'auto'
  }
}))

const Scrollable = ({ children, maxHeight = '270px', ...rest }) => {
  const classes = useStyles()

  return (
    <div className={classes.scrollable} style={{ maxHeight: maxHeight }} {...rest}>
      {children}
    </div>
  )
}

export default Scrollable
