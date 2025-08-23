import React, { useEffect, useState } from 'react'

const Login = () => {
  const [loading,setLoading]=useState(false);
  const [formState,setFormState]=useState({
    email:"",
    password:"",
  });

  const submitHandler=async(e)=>{
    e.preventDefault();
    if(!formState.email || !formState.password){
      return alert("Email and Password is required");
    };
    // api call to server
    try {
      setLoading(true);
      const url = import.meta.env.VITE_SERVER_URL;
      const res=await fetch(`${url}/auth/login`,{
        method:"post",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formState),
      });
      const data=await res.json();
    // console.log(data);
    if(!data.success){
      alert(data.error);
      return;
    }
    if(data.data.user.role !== "admin"){
      alert("you are not admin!");
       return ;
    }
    const tokken = data.data.accessToken;
    const refresh=data.data.refreshToken;

    localStorage.setItem("token",tokken);
    localStorage.setItem("refresh",refresh);

    window.location.href="/";
    } catch (error) {
      console.log("Error",error);
    } finally{
      setLoading(false);
    }
  }
  // console.log(formState);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      window.location.href="/"
    }
  },[]);
  return ( 
  <div className="flex justify-center items-center h-screen">
    <form onSubmit={submitHandler} className=" rounded w-[260px] border border-gray-300 p-5  shadow-md flex flex-col gap-2 ">
      <h1 className="font-bold text-3xl text-center font-serif mb-3 ">Login</h1>
      <InputField value={formState.email} update={setFormState} lable="Email" type="email" placeholder="Enter your email"/>
      <InputField value={formState.password} update={setFormState} lable="password"  type="password" placeholder="Enter your password"/>
      <div>
        <button disabled={loading} className="bg-blue-500 text-white w-full rounded text-sm py-1 font-semibold cursor-pointer disabled:bg-gray-500 disabled:cursor-progress ">{loading?"loading...":"Login"}</button>
      </div>
    </form>
    </div>
  );
};

const InputField=({update,value,lable,type, placeholder})=>{
  return(
    <div className="flex justify-between items-center gap-2">
      <span className="text-[12px]">{lable}</span>
    <InputBox value={value} update={update} type={type} placeholder={placeholder}/>
    </div>
  );
};

const InputBox=({ update,value,type, placeholder})=>{
  return(
    <input value={value} name={type} onChange={(e)=>update((prev)=>({...prev,[e.target.name]:e.target.value}))} type={type} placeholder={placeholder} className="border border-gray-300 rounded text-[12px] p-1"/>
  );
}
export default Login