import { Button } from '@mui/material'

type ButtonMessage = {
  message: string
}

export const AuthButton = (props: ButtonMessage) => {
  const { message } = props
  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      style={{ marginTop: '50px' }}
    >
      {message}
    </Button>
  )
}
