import React,{useEffect,useState,useContext} from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./css/Main.css";
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Grid } from "@mui/material";

const Main = () =>{
  const [questions, setQuestions] = useState([]);

  const getData = async()=>{
    try {
      await axios.get(`http://localhost:8000/api/allquestions`,)
      .then((res) => setQuestions(res.data));
    } catch (error) {
      console.log(error);
    }
  }
console.log(questions)
  useEffect(() => {
    getData();
  },[]);
  // console.log(questions)
  return (
    <>
   {/* <div className="main">
     <div className="main-container">
       <div className="main-top">
         <h2>Top Questions</h2>
         <Link to="/addquestion">
           <button>Ask Question</button>
         </Link> */}

          {/* <a href="/add-question"> */}

         {/* </a> */}
       {/* </div>
       <div className="main-desc"> */}
         {/* <p>{questions.length} questions</p> */}
         {/* <div className="main-filter">
           <div className="main-tabs">
             <div className="main-tab">
               <Link to="/">Newest</Link>
             </div>
             <div className="main-tab">
               <Link to="/">Active</Link>
             </div>
             <div className="main-tab">
               <Link to="/">More</Link>
             </div>
           </div>
           <div className="main-filter-item">
             <FilterListIcon />
             <p>Filter</p>
           </div>
         </div>
       </div> */}
       
          {
            questions.map((item,index)=>{
              return <>
                  <AllQuestions data={item}  key={index} />
              </>
            })
          }
  
 
      {/* </div>
    </div> */}
    
     
    </>
  );
}

export default Main;
