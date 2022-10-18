import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ResetPassword = () => {
  const {token} = useParams()
  const [password, setPassword] = useState("")
  const [verify,setVerify] = useState("")



const verifyToken = async (req,res)=>{

await axios.get(`https://webscrapping-backend-task.herokuapp.com/users/reset-password/${token}`)
  .then((res)=>{
    console.log(res.data)
    setVerify(res.data.message)
  })
}
useEffect(()=>{
verifyToken()
},[])

const handleSubmit =async ()=>{
  try {
      await axios.post(`https://webscrapping-backend-task.herokuapp.com/users/new-password/${token}`,{"password":password})
      .then((res)=>{
        console.log(res.data)

      })
  } catch (error) {
    console.log(error)
  }
}



  return (
    <>
  {
    verify ==="Token verified Successfully" ? <>
     
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card >
      <CardMedia>
      <img src="https://cdn-icons-png.flaticon.com/512/6195/6195700.png"  width="150px" height="150px"  style={{marginLeft:"80px"}}/>
      </CardMedia>
      <CardContent>
        <Typography variant='h6' sx={{textAlign:'center'}}>Reset Password</Typography>
        <Box sx={{mt:3}}>
          <TextField  onChange={(e)=>setPassword(e.target.value)} type="text" placeholder='Please Enter New Password'/>
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
      </CardContent>
      </Card>
    </Box>
  
    </> : verify ==="Link has been expired" ?<>
      
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
     <Typography variant='h3'>Link has been expired</Typography>
    </Box>
    </>
    : verify ==="This link has already used to reset password"?<>
    
    <Typography variant='h3'>This link has already used to reset password></Typography>
    </>:null
  }
    </>
  )
}

export default ResetPassword