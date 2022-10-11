import React from 'react'
import Sidebar from './Sidebar'
import './css/index.css'
import Main from './Main'
import { Box, Grid } from '@mui/material'
const Home = () => {
  return (
   <> 
        <Grid container >
            <Grid xs={0} md={1.2}></Grid>
              <Grid  xs={0} md={1.7}>
                <Sidebar sx={{ display: { xs: 'none', sm: 'none' } }} />
              </Grid>
              <Grid xs={12} md={6}>
                <Main />
              </Grid>
            <Grid xs={0} md={1.7}></Grid>
        </Grid>



  
   
   </>
  )
}

export default Home