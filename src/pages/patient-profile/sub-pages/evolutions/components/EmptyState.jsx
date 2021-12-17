import { Card, CardContent, Typography } from '@material-ui/core'

const EmptyState = () => {
  return (
    <Card className='' variant='outlined'>
      <CardContent>
        <Typography>
          Sin registros
        </Typography>
      </CardContent>
    </Card>
  )
}

export default EmptyState
