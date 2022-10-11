import React,{useState,useEffect,useContext} from 'react'
import './addquestion.css';
import { useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomComponent from "../ViewQuestion/CustomComponent";
import localization from "../config/localization";
import toolbar from "../config/toolbar";
import DOMPurify from 'dompurify';
import {store} from '../../App'
import { TagsInput } from "react-tag-input-component";
import jwt_decode from "jwt-decode";
import axios from "axios";

const AddQuestion = () => {
  const [token,setToken] = useContext(store);
  const navigate = useNavigate();
  const [title,setTitle] = useState("")
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState(null);
  const [selected, setSelected] = useState(["Javascript"]);
  const handleContentStateChange = (contentState) => {
    setContentState(draftToHtml(contentState));
  };

  const handleEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  let html = DOMPurify.sanitize(contentState)
  html = html.slice(3,html.length-5)  
  console.log(html)


const postQuestion = async ()=>{
  try {
    await axios.post(`http://localhost:8000/api/question`,{"title":title,"body":html,"tags":selected,"user":decoded.id},{
        headers:{
          'jwt-token':token
        }
    })
  .then(res => {
    alert("Question added successfully!");
    navigate('/')
  })

  } catch (error) {
    console.log("error");
  }
  
}
let decoded;
useEffect(()=>{
  if(!token) navigate('/login')
  
  },[])
  if (token){
    decoded = jwt_decode(token);
  }


  return (
   <>
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                {/* <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  modules={Editor.modules}
                  className="react-quill"
                  theme="snow"
                /> */}

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

              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <TagsInput
                     value={selected}
                     onChange={setSelected}
                     name="tags"
                     placeHolder="Enter tags"
                   />
              </div>
            </div>
          </div>
        </div>

        <button  className="button" onClick={postQuestion}>
          Add your question
        </button>
      </div>
    </div>

   </>
  )
}

export default AddQuestion






// import React, { useState } from "react";
// import { TagsInput } from "react-tag-input-component";
// import "./styles.css";

// export default function App() {
//   const [selected, setSelected] = useState(["papaya"]);

//   return (
//     <div>
//       <h1>Add Fruits</h1>

//       <pre>{JSON.stringify(selected)}</pre>

//       <TagsInput
//         value={selected}
//         onChange={setSelected}
//         name="fruits"
//         placeHolder="enter fruits"
//       />
//       <em>press enter to add new tag</em>
//     </div>
//   );
// }
