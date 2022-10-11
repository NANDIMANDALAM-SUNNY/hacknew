import Avatar from '@mui/material/Avatar';
import React, { useEffect, useState,useContext } from "react";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HistoryIcon from "@mui/icons-material/History";
import axios from "axios";
import { Link ,useParams,useNavigate} from "react-router-dom";
import "./index.css";
import { Box, Grid, Typography } from "@mui/material";
import { convertFromRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomComponent from "./CustomComponent";
import localization from "../config/localization";
import toolbar from "../config/toolbar";
import DOMPurify from 'dompurify';
import SingleHome from './SingleHome';
import { store } from '../../App';




const avatarStyle = {
  fontSize: "0.5rem",
  backgroundColor: "rgb(210,180,140)",
  width:"20px",
  height:"20px",
 borderRadius:" 3px"

};



const SingleQuestion = ({data}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState(null);

  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
 

 const navigate = useNavigate()
  const [token,setToken] = useContext(store);
  const [show, setShow] = useState(false);
  const [question,setQuestion] = useState([])
  const {id} = useParams()
  const [body, setBody] = useState("");
  const [profile, setProfile] = useState({});
  const [comment, setComment] = useState("");
  let user;
  if(question.length>0){
    user =question[0].user
  }
  const handleVotes = ()=>{
    try {
      axios.post(`http://localhost:8000/api/question/votes/${id}`,{"user":user})
      .then(response => {
        window.alert(response.data.message)
        viewQuestion()
  
      })
    } catch (error) {
      window.alert(error);
    }
  }





const viewQuestion = async () =>{
  try {
    await axios.get(`http://localhost:8000/api/question/${id}`,)
    .then((res) => setQuestion(res.data));
  } catch (error) {
    console.log(error);
  }
}

let html = DOMPurify.sanitize(contentState)
html = html.slice(3,html.length-5)  


const postAnswer = async () =>{
  try {
    await axios.post(`http://localhost:8000/api/answer`,{"question_id":id,"answer":html,"user":question[0].user},{
      headers:{
        'jwt-token':token
      }
    })
   .then(response => {
    window.alert(response.data.message)
    viewQuestion()
  
  })
  } catch (error) {
    alert("error")
  }
}


const  postComment = async () =>{
  try {
    await axios.post(`http://localhost:8000/api/comment`,{"question_id":id,"comment":comment,"user":question[0].user},{
      headers:{
        'jwt-token':token
      }
    })
   .then(response => {
    window.alert(response.data.message)
    viewQuestion()
  
  })
  } catch (error) {
    alert("error")
  }
}


  useEffect(()=>{
      viewQuestion()
      getProfile()
  },[user])
console.log(question.votes)



const getProfile = async()=>{
  try {
    await axios.get(`http://localhost:8000/users/${question[0].user}`)
    .then((res) => setProfile(res.data.data));
  } catch (error) {
    console.log(error);
  }
}
console.log(profile)
  return (
    <>

    {
      question [0] ?<>
      
      <div className="main">
       <div className="main-container">
         <Box className="main-top"  >
           <Typography  sx={{fontSize:"27px",color:"#3b4045",lineHeight:"36.45px"}}  >{question[0].title}</Typography>
           <Link to="/addquestion">
             <button>Ask Question</button>
           </Link>
         </Box>
         <div className="main-desc">
           <div className="info">
             <p>
               Asked
               <span>{new Date(question[0]?.created_at).toLocaleString()}</span>
             </p>
             <p>
               Active<span>today</span>
             </p>
             <p>
               Viewed<span>{question[0].views}times</span>
             </p>
           </div>
         </div>
         <div className="all-questions">
           <div className="all-questions-container">
             <div className="all-questions-left">
               <div className="all-options">
                 <p className="arrow"  onClick={handleVotes} >▲</p>
             <p className="arrow">
              {question[0].votes.length}
             </p>

                 <p className="arrow">▼</p>

               <BookmarkIcon />

                 <HistoryIcon />
               </div>
             </div>
             <div className="question-answer">
               <Typography  variant ='p'  sx={{fontSize:"15px",lineHeight:"22.5px"}}>{question[0].body}</Typography>
               <Box  
                      sx={{
                      display: 'flex',
                      }}>
                          {question[0]?.tags.map((tag) => (
                            <span
                              className="question-tags"
                            >
                              {tag} 
                            </span>
                          ))}
                    </Box> 
               <div className="author">
               {/* 64 x 64 px */}

                 <Typography sx={{fontSize:"12px",lineHeight:"15.6923px"}}>
                   asked 
                    {new Date(question[0]?.created_at).toLocaleString()}
                 </Typography>


            



                 <Box sx={{display:"flex",alignItems:"center"}}>
                   <Avatar sx={avatarStyle}/>
                   <Typography sx={{fontSize:"13px",color:"#0074cc"}}> { profile && profile.name  }</Typography>
                 </Box>
               </div>
               <div className="comments">
                 <div className="comment">
                    {question[0].comments.map((item)=>{
                      return <>
                      <div sx={{display:"flex"}}>
                        <span style={{paddingRight:"10px"}}>{item.comment}</span>
                          <span style={{color:"blue"}}>{new Date(item?.created_at).toLocaleString()}</span>
                      </div>
                      </>
                    })}
                 </div>
                 <p onClick={() => setShow(!show)}>Add a comment</p>
                 {show && (
                   <div className="title">
                     <textarea
                       style={{
                         margin: "5px 0px",
                         padding: "10px",
                         border: "1px solid rgba(0, 0, 0, 0.2)",
                         borderRadius: "3px",
                         outline: "none",
                       }}
                       value={comment}
                       onChange={(e) => setComment(e.target.value)}
                       type="text"
                       placeholder="Add your comment..."
                       rows={5}
                     />
                     <button
                       onClick={postComment}
                       style={{
                         maxWidth: "fit-content",
                       }}
                     >
                       Add comment
                     </button>
                   </div>
                 )}
               </div>
             </div>
           </div>
         </div>


              <Box sx={{display:""}}>
              <Typography sx={{fontSize:"19px",lineHeight:"24.7px",color:'#232629'}}> { question[0]?.answerDetails.length} Answers</Typography> 
                    <Box>
                    {
                        question[0]?.answerDetails.map((item)=>{
                        return <>
                        <Grid container sx={{m:3}}>
                            <Grid item >
                            <Typography variant="p" >{item.answer}</Typography>
                            </Grid>                          
                                <Grid item xs>                                 
                                <Grid container direction="row-reverse">      
                                <Grid item>
                          <span style={{marginRight:"auto",color:"blue"}}>{new Date(item?.created_at).toLocaleString()}</span>

                                </Grid>
                              </Grid>
                            </Grid>   
                      </Grid>
                        </>
                      })
                        }
                    </Box>
          </Box>

         <div
           style={{
             flexDirection: "column",
           }}
           className="all-questions"
         >
           {/* <Box
             style={{
               marginBottom: "20px",
               fontSize: "1.3rem",
               fontWeight: "300",
             }}
           >
           {
            question[0]?.answerDetails.map((item)=>{
            return <>
              <span>{item.answer}</span>
            </>
           })
            }
              
           </Box> */}
{/*          
         {
          question[0]?.answerDetails.map((item)=>{
            return <>
            <div className="author">
                 <span>
                   asked 
                    {new Date(item?.created_at).toLocaleString()}
                 </span>
                 <div className="auth-details">
                   <Avatar />
                   <p> {   profile.name  }</p>
                 </div>
               </div>

            </>
          })
         } */}

          






        </div>
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>

        {/*  */}
        
      <Editor
        editorState={editorState}
        toolbarClassName="editor-toolbar"
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        onEditorStateChange={handleEditorStateChange}
        onContentStateChange={handleContentStateChange}
        toolbar={toolbar}
        localization={localization}
        spellCheck
        // stripPastedStyles
        toolbarCustomButtons={[<CustomComponent />]}
      />

          

      {/* <div dangerouslySetInnerHTML={{ __html: contentState }} /> */}
   

      </div>
      <button
        
        style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}

        onClick={postAnswer}
      >
        Post your answer
      </button>
    </div>
        
      </>:null
    }


    </>
  )
}

export default SingleQuestion




// <div className="main">
// <div className="main-container">
//   <div className="main-top">
//     <h2 className="main-question">Question Title </h2>
//     <Link to="/addquestion">
//       <button>Ask Question</button>
//     </Link>
//   </div>
//   <div className="main-desc">
//     <div className="info">
//       <p>
//         Asked
//         {/* <span>{new Date(data[0]?.created_at).toLocaleString()}</span> */}
//       </p>
//       <p>
//         Active<span>today</span>
//       </p>
//       <p>
//         Viewed<span>{question[0] ? `${question[0].views}`:0} times</span>
//       </p>
//     </div>
//   </div>
//   <div className="all-questions">
//     <div className="all-questions-container">
//       <div className="all-questions-left">
//         <div className="all-options">
//           <p className="arrow">▲</p>
//       <p className="arrow">0</p>

//           <p className="arrow">▼</p>

//         <BookmarkIcon />

//           <HistoryIcon />
//         </div>
//       </div>
//       <div className="question-answer">
//         {/* <p>{ReactHtmlParser(questionData?.body)}</p> */}

//         <div className="author">
//           <small>
//             asked 
//             {/* {new Date(questionData?.created_at).toLocaleString()} */}
//           </small>
//           <div className="auth-details">
//             {/* <Avatar {...stringAvatar(questionData?.user?.displayName)} /> */}
//             <Avatar />
//             <p>
//               {/* {questionData?.user?.displayName
//                 ? questionData?.user?.displayName
//                 : "Natalia lee"} */} profile
//             </p>
//           </div>
//         </div>
//         <div className="comments">
//           <div className="comment">
//             {/* {questionData?.comments &&
//               questionData?.comments.map((_qd) => (
//                 <p key={_qd?._id}>
//                   {_qd.comment}{" "}
//                   <span>
//                     - {_qd.user ? _qd.user.displayName : "Nate Eldredge"}
//                   </span>{" "}
//                   {"    "}
//                   <small>
//                     {new Date(_qd.created_at).toLocaleString()}
//                   </small>
//                 </p>
//               ))} */}
//               <p>This is comment</p>
//           </div>
//           <p onClick={() => setShow(!show)}>Add a comment</p>
//           {show && (
//             <div className="title">
//               <textarea
//                 style={{
//                   margin: "5px 0px",
//                   padding: "10px",
//                   border: "1px solid rgba(0, 0, 0, 0.2)",
//                   borderRadius: "3px",
//                   outline: "none",
//                 }}
//                //  value={comment}
//                //  onChange={(e) => setComment(e.target.value)}
//                 type="text"
//                 placeholder="Add your comment..."
//                 rows={5}
//               />
//               <button
//                //  onClick={handleComment}
//                 style={{
//                   maxWidth: "fit-content",
//                 }}
//               >
//                 Add comment
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
//   <div
//     style={{
//       flexDirection: "column",
//     }}
//     className="all-questions"
//   >
//     <p
//       style={{
//         marginBottom: "20px",
//         fontSize: "1.3rem",
//         fontWeight: "300",
//       }}
//     >
//      Answers
//     </p>
  
//  </div>
// </div>
// <div className="main-answer">
//  <h3
//    style={{
//      fontSize: "22px",
//      margin: "10px 0",
//      fontWeight: "400",
//    }}
//  >
//    Your Answer
//  </h3>
//  <ReactQuill
//    // value={answer}
   
//    className="react-quill"
//    theme="snow"
//    style={{
//      height: "200px",
//    }}
//  />
// </div>
// <button
 
//  style={{
//    marginTop: "100px",
//    maxWidth: "fit-content",
//  }}
// >
//  Post your answer
// </button>
// </div>