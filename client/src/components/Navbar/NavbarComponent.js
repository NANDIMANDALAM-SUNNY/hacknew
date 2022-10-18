import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../../App'
import logo from '../../images/navbarlogo.png'

const NavbarComponent = () => {
const {search,setSearch,token,profile,setProfile} = useContext(store)


  const getProfile = async ()=>{
    try {
      const data = await axios.get("https://webscrapping-backend-task.herokuapp.com/users/get-profile",{
        headers: {
          "jwt-token" : token
        }
      }).then((res)=>setProfile(res.data.data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProfile()
  }, [token])
  console.log(profile)

  return (
    <>
    {
      token && profile!==undefined? <>
      <nav class="navbar navbar-expand-sm navbar-dark " style={{background:"#2874F0"}}>
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:void(0)"><img src={logo} width="130x" height="35px"/>  </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item" >
            <form class="d-flex">
            <input class="form-control me-2" type="text" placeholder="Search mobile name"  onChange={(e)=>setSearch(e.target.value)}/>
          </form>
        </li>
        <li>
            <Avatar     component={Link}  >
            <Link to="/profile">
              <img src={profile.profile}  style={{borderRadius:"50%",height:"40px",width:"40px"}}/>
            </Link>
            </Avatar>
        </li>
      </ul>
    </div>
  </div>
</nav>
      </>:null
    }
    
    </>
  )
}

export default NavbarComponent