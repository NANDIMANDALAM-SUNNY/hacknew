import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signUpSchema } from "../FormsValidations/SignupForm";
import React from 'react'
import { useFormik } from "formik";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';


const Register = () => {
    const navigate = useNavigate();
  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit :async (values,action)=>{
      await  axios.post("http://localhost:8000/users/signup",values)
        .then((res)=>{
            console.log(res.data)
            alert("Registered Successfully")
            navigate('/login')
        })
        .catch((err)=>{
            console.log(err);
            alert(err)
        })
        console.log(values)
        action.resetForm()
    },
    onChange:(values)=>{
        console.log(values)
    }
  });
  return (    
    <>




<Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  style={{ minHeight: '50vh' }}
>

  <Grid item xs={3}>
   <Grid container>
    <Grid item  sx={{height:500,mt:3}}>
    <Box
          sx={{
            my: 2,
            mx: 4,
          }}
        >
    <Typography variant='h5'  sx={{mt:4}}>Join the Stack Overflow community</Typography>
    <Typography variant='h6' sx={{pt:4,fontSize:15}}> <span sx={{mr:3}}><LiveHelpIcon  sx={{color:"#0A95FF"}}/></span>  Get unstuck — ask a question</Typography>
    <Typography variant='h6' sx={{pt:4,fontSize:15}}><span sx={{mr:3}}><LiveHelpIcon sx={{color:"#0A95FF"}} /></span>Unlock new privileges like voting and commenting</Typography>
    <Typography variant='h6' sx={{pt:4,fontSize:15}}> <span sx={{mr:3}}><LiveHelpIcon sx={{color:"#0A95FF"}} /></span> Save your favorite tags, filters, and jobs</Typography>
    <Typography variant='h6' sx={{pt:4,fontSize:15}}> <span sx={{mr:3}}><LiveHelpIcon sx={{color:"#0A95FF"}}/></span> Earn reputation and badges</Typography>

        </Box>
    </Grid>
    <Grid item  component={Paper} sx={{width:400,height:500,mt:3}} elevation={6}>
    <Box
          sx={{
            my: 2,
            mx: 4,          
          }}
        >
          <Box component="form"  noValidate autoComplete='off' onSubmit={handleSubmit} >
                                            <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        label="Display Name"
                                        // name="email"
                                        id="name"
                                        type="name"
                                        // autoComplete="email"
                                        // autoFocus
                                        onChange={handleChange}
                                        placeholder="Enter your Name"
                                        onBlur={handleBlur}
                                        value={values.name}
                                        />
                                         {/* {errors.fname && touched.fname && <p className="error">{errors.fname}</p>} */}
                                         {errors.name && touched.name ? (<div>{errors.name}</div>) : null}
    

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

                  <Typography variant='p' sx={{fontSize:15}} >By clicking “Sign up”, you agree to our terms of service, privacy policy and cookie policy</Typography>
          </Box>
        </Box>
             <Typography sx={{ml:3}} >Already having account ?  <Typography  component={RouterLink} to='/login'>Login here</Typography></Typography>   
    </Grid>
   </Grid>
  </Grid>   
   
</Grid> 
    </>

  );
};
export default Register;
