
import React,{useContext, useEffect} from 'react'
import axios from 'axios';
import { Link as RouterLink,useNavigate } from 'react-router-dom';
import { loginSchema } from "../FormsValidations/LoginForm";
import { useFormik } from "formik";
import {store} from '../../App'
import './style.css'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';



const Login = () => {
     const navigate = useNavigate();
  const [token,setToken] = useContext(store);
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      email: '',
      password:""
    },
    validationSchema: loginSchema,
    onSubmit :async (values,action)=>{
      await  axios.post("http://localhost:8000/users/login",values)
        .then((res)=>{
          setToken(res.data.data)
          alert(res.data.message)
        })
        .catch((err)=>{
          alert('Invalid Credentials')
        })
        action.resetForm()
    },
    onChange:(values)=>{
        console.log(values)
    }
  });
//   // jwttoken
   if(token){
     localStorage.setItem('jwt-token',token);
     console.log(token)
     navigate('/')
   } 
 

  return (
    <>
     <Grid container justifyContent="center" alignItems="center">
     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png" style={{width:"100px",height:"100px"}}/>
     </Grid>
<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  style={{ minHeight: '100vh' }}
>

  <Grid item xs={3}>
  <Grid item  component={Paper} sx={{width:400,height:350,pt:3}} elevation={6}>
     
    <Box
          sx={{
            mx: 4,          
          }}
        >
          <Box component="form"  noValidate autoComplete='off' onSubmit={handleSubmit} >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  // autoFocus
                  onChange={handleChange}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Password"
                  // autoFocus
                  onChange={handleChange}
                  id="password"
                  type="password"
                  placeholder="Enter Password"
                  onBlur={handleBlur}
                  value={values.password}
                                />
                  {errors.password && touched.password && (<p className="error">{errors.password}</p>)}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Sign up
                    </Button>
          </Box>
        </Box>
             <Typography sx={{ml:3}} >Don't have account ?  <Typography  component={RouterLink} to='/register'>Sign up</Typography></Typography>   
    </Grid>
   </Grid>
   
</Grid> 
    </>
  )
}

export default Login