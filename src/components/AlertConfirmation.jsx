import React from 'react'
import Alert from '@mui/material/Alert';


export default function AlertConfirmation({text, status}) {
  return (
    <Alert className='w-full shadow-lg mb-4' severity={status}>
    {text}
  </Alert>  )
}
