import Avatar from '@mui/material/Avatar';
import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import "./css/AllQuestions.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// mport { makeStyles } from '@mui/styles';





const avatarStyle = {
  fontSize: "0.5rem",
  backgroundColor: "rgb(210,180,140)",
  width:"20px",
  height:"20px"
};

const  AllQuestions = ({ data })=> {
const [profile,setProfile] = useState([]);

const navigate = useNavigate()
  const getProfile = async()=>{
    try {
      await axios.get(`http://localhost:8000/users/${data.user}`,)
      .then((res) => setProfile(res.data.data));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      getProfile();
  }, [])




  return (
    <>

        <Box sx={{display:'flex',borderBottom:"1px solid #ddd",pb:3,pt:3}}>
        <Box sx={{margin:"0px 20px 0px 30px"}}>
                <Box sx={{display: 'flex'}}>
                    <Typography   sx={{color:	"#3b4045",mb:1,fontSize:"13px",cursor:"pointer",lineHeight:"17px"}}>{data.votes.length}</Typography>
                    <Typography  sx={{color:	"#3b4045",mb:1,fontSize:"13px",cursor:"pointer",lineHeight:"17px"}} >votes</Typography>
                </Box>
                <Box sx={{display: 'flex',mt:1}}>
                    <Typography  sx={{color:	"#3b4045",mb:1,fontSize:"13px",cursor:"pointer",lineHeight:"17px"}} >{data.answerDetails.length}</Typography>
                    <Typography sx={{color:	"#3b4045",mb:1,fontSize:"13px",cursor:"pointer",lineHeight:"17px"}}>answers</Typography>
                </Box>
                <Box sx={{display: 'flex',mt:1}}>
                    <Typography  sx={{color:	"#3b4045",mb:1,fontSize:"13px",cursor:"pointer",lineHeight:"17px"}}>{data.views}</Typography>
                    <Typography sx={{color:	"#3b4045",mb:1,fontSize:"13px",cursor:"pointer",lineHeight:"17px"}}>views</Typography>
                </Box>
                </Box>
        {/* </Grid> */}
        {/* <Grid md={9} sx={9}> */}
        <Box className="question-answer">
              <Typography variant="p" sx={{color:	"#0074cc",mb:1,fontSize:"17px",cursor:"pointer"}}  onClick={()=>navigate(`/viewquestion/${data._id}`)}>  {data.title}</Typography>                  
              <Typography variant="p" sx={{color:	"#3b4045",mb:1,fontSize:"13px",cursor:"pointer",lineHeight:"17px",height:"60px"}}  onClick={()=>navigate(`/viewquestion/${data._id}`)}>  {data.body}</Typography>                  
                      
                      <Box sx={{marginRight:"50px"}}>
                        <Box  
                        sx={{
                         display: { xs: 'block', sm: 'block', md: 'flex'},
                        marginTop: '30px',
                        }}>
                            {data?.tags.map((tag) => (
                              <Typography
                                className="question-tags"
                                sx={{display:"inline"}}
                              >
                                {tag} 
                              </Typography>
                            ))}
                            
                          </Box>
                          </Box> 
                            <Box sx={{display:"flex",marginTop:{xs:"20px",sm:"0px",md:"0px"},flexDirection: 'row-reverse',}}>
                                <Typography sx={{fontSize:"12px"}}>{profile.name}</Typography>
                                <Avatar sx={avatarStyle} />
                            </Box>
                     
              </Box>
              </Box>
      
    </>
  );
}


export default AllQuestions;


// <Box className="all-questions">
// <Box className="all-questions-container">
//     <Box className="all-questions-left">
//     <Box className="all-options">
//                 <Box sx={{display: 'flex'}}>
//                     <span  style={{marginRight:"5px"}}>{data.votes.length}</span>
//                     <span>votes</span>
//                 </Box>
//                 <Box sx={{display: 'flex',mt:1}}>
//                     <span  style={{marginRight:"5px"}} >{data.answerDetails.length}</span>
//                     <span>answers</span>
//                 </Box>
//                 <Box sx={{display: 'flex',mt:1}}>
//                     <span  style={{marginRight:"5px"}}>{data.views}</span>
//                     <span>views</span>
//                 </Box>
//                 </Box>
//                     </Box>
//                     <Box className="question-answer">
//                       {/* <Link to='/question'>{data.title}</Link> */}
//                       {/* <Box className="question-answer"> */}
//                         <Typography variant="p" sx={{color:	"#0074cc",mb:1,fontSize: 20,cursor:"pointer"}}  onClick={()=>navigate(`/viewquestion/${data._id}`)}>  {data.title}</Typography> 
//                       {/* </Box> */}
//                       {/* <Box  sx={{width:"90%"}}>
//                 </Box> */}

//               <Box  
//               sx={{
//               display: 'flex',
//               }}>
//                   {data?.tags.map((tag) => (
//                     <span
//                       className="question-tags"
//                     >
//                       {tag} 
//                     </span>
//                   ))}
//             </Box> 
//     </Box>
//             <Box sx={{display:"flex"}}>
//                   <div  style={{display:"flex"}}>
//                     <Avatar />
//                         <p>{profile.name}</p>
//                 </div>
//               </Box>
//   </Box>
// </Box>