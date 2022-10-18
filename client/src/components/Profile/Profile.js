import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { store } from '../../App'
const Profile = () => {

    const {profile,setToken,token} = useContext(store)
  const navigate = useNavigate()
useEffect(() => {
 if(!token) navigate('/')
}, [])

const handleLogout  = ()=>{
  setToken(localStorage.removeItem("jwt-token"))
  navigate('/')

}

console.log(profile)
  return (
   <>
    <Grid container>
        <Grid item xs={3} md={3}></Grid>
        <Grid item xs={6} md={6}>
          <Grid container>
            <Grid item xs={4} md={4}>
              <Box sx={{width:"150px",height:"150px"}} >
                <img src={profile.profile} style={{width:"maxWidth",height:"maxHeight"}} alt="profile" />
              </Box>
            </Grid>
            <Grid item xs={1} md={1}></Grid>
            <Grid item xs={7} md={7}>
              <Box>
                <Typography>{profile.name}</Typography>
                <Typography>{profile.email}</Typography>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Button component={Link} to='/' variant='contained'>Go back</Button>
            <Button onClick={handleLogout} variant='contained'>Logout</Button>
          </Box>
        </Grid>
        <Grid item xs={3} md={3}></Grid>
    </Grid>
   </>
  )
}

export default Profile