import { Typography ,Box} from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

const ConfirmAccount = () => {
const [confirm,setConfirm] = useState("")
const {confirmationToken} = useParams()
const confirmAccount = async ()=>{
   await axios.get(`https://webscrapping-backend-task.herokuapp.com/users/confirm-account/:${confirmationToken}`)
   .then((res)=>{
    setConfirm(res.data.message)
   })

}

    useEffect(() => {
        confirmAccount()
    }, [])
    if(confirm ==="Success")
    {
        Navigate("/")
    }
    

  return (
    <>
        {
            confirm === "Success"? (
                <>
                <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
>
 
 <Typography>Your account has been confirmed</Typography>

</Box>
                </>
            ):null
        }
    </>
  )
}

export default ConfirmAccount