import { TextField } from '@mui/material'

type InputProps = {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  property: string
}

export const Input = (props: InputProps) => {
  const { value, setValue, property } = props
  return (
    <>
      <p>{property}</p>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{ width: '300px' }}
        variant="outlined"
      />
    </>
  )
}
