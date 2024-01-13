import { Link } from 'react-router-dom'
import React, { useState } from 'react'

export const CustomeInput = ({ onFocusPlaceholder, onBlurPlaceholder, type, placeholder, id, onChange }) => {
  const [focusUserMail, setFocusUserMail] = useState(false)
  //  console.log(onChange)
  return (
    <>
      {focusUserMail && <h3 >{id}</h3>}
      <input
        onFocus={(e) => {
          e.target.placeholder = `${onFocusPlaceholder}`;
          // if(onFocusPlaceholder.length >0) {
          //   setFocusUserMail(true)
          // }else{
          //   setFocusUserMail(false) 
          // }        
          setFocusUserMail(true);
        }}
        onBlur={(e) => {
          e.target.placeholder = `${onBlurPlaceholder}`;
          setFocusUserMail(false);
        }}
        type={`${type}`}
        placeholder={`${placeholder}`}
        className='border p-3 rounded-lg'
        id={`${id}`}
        onChange={onChange}
      />
    </>
  )
}

function SignUp() {

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json();
    console.log(data)

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <CustomeInput onFocusPlaceholder={""} onBlurPlaceholder={"username"} type={"text"} id={"username"} onChange={handleChange} placeholder={"username"} />
        < CustomeInput onFocusPlaceholder={""} onBlurPlaceholder={"email"} type={"email"} id={"email"} onChange={handleChange} placeholder={"email"} />
        < CustomeInput onFocusPlaceholder={""} onBlurPlaceholder={"password"} type={"password"} id={"password"} onChange={handleChange} placeholder={"password"} />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp