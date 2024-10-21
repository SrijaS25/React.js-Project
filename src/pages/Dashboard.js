import { useEffect, useState } from "react"
import { UserDetailssApi } from "../services/Api"
import NavBar from "../components/NavBar"
import { useNavigate } from "react-router-dom"
import { Logout,isAuthenticated } from "../services/Auth"
import { Navigate } from "react-router-dom"
import './Dashboard.css'
export default function DashBoardPage() {

   const navigate= useNavigate() 
 const [user,setUser]=  useState({name:"",email:"",localId:""})

 useEffect(()=>{
    if(isAuthenticated()){
        UserDetailssApi().then((response)=>{
            setUser({
             name:response.data.users[0].displayName,
             email:response.data.users[0].email,
             localId:response.data.users[0].localId,
         })
           })
    }

 },[])

 const logoutUser=()=>{
    Logout();
    navigate('/login')
 }
 if (!isAuthenticated()) {
    // redireact to dashboard
    return <Navigate to="/login" />
  }


    return (
        <>
         <NavBar logoutUser={logoutUser}/>
        <main role="main" className="container mt-5">
            <div className="container">
                <div className="text-center mt-5">
                    <h3>Dashboard page</h3>
                  {user.name && user.email && user.localId?
                   (<div>
                   <p className="text-bold " >Hi <span>{user.name},</span> <br/> your Firebase ID is <span> {user.localId}</span></p>
                   <p>Your Email is <span>{user.email}</span> </p>
                   </div>):<p>Loading....</p>}
                </div>
            </div>
        </main>
        </>
    )
}