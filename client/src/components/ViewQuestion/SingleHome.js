import React, { useEffect,useState } from 'react'
import Sidebar from '../Main/Sidebar'


import { Box, Grid } from '@mui/material'
import MainQuestion from './SingleQuestion'
import { useParams } from 'react-router-dom'
import axios from 'axios'



const SingleHome = () => {
//   const {id} = useParams()
// const [question,setQuestion] = useState([])
// console.log(id)
// const viewQuestion = async () =>{
//   try {
//     await axios.get(`http://localhost:8000/api/question/${id}`)
//     .then((res) => setQuestion(res.data));
//   } catch (error) {
//     console.log(error);
//   }
// }

//   useEffect(()=>{
//     viewQuestion()
//   },[id])
// console.log(question)
  return (
   <> 
        {/* <Box
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          pl: 5,
          m: 1,
          width: '100%',
          }}>
          <Sidebar />
          
        </Box>
    */}

    <Grid container >
            <Grid xs={0} md={1.2}></Grid>
              <Grid  xs={0} md={1.7}>
                <Sidebar sx={{ display: { xs: 'none', md: 'block', lg: 'none' } }} />
              </Grid>
              <Grid xs={12} md={6}>
              <MainQuestion />
              </Grid>
            <Grid xs={0} md={1.7}></Grid>
        </Grid>

   </>
  )
}

export default SingleHome