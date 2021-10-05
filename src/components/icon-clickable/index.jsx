import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  cursorPointer: {
    cursor: 'pointer'
  }
}))

const IconClickable = ({ Icon, onClick, ...restProps }) => {
  const classes = useStyles()

  return (
    <Icon
      onClick={onClick}
      {...restProps}
      className={classes.cursorPointer}
    />
  )
}

export default IconClickable
