import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from '../firebase'
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess,
signoutUserStart, signoutUserFailure, signoutUserSuccess } from "../redux/user/userSlice";
import  {useDispatch}from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Profile() {
  const fileRef=useRef(null)
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    console.log(storage)
    const fileName = new Date().getTime()+ file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred /
      snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress));
    },
    (error)=>{
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (getDownloadURL)=> setFormData({...formData, avatar:getDownloadURL})
      )
    }
    );
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
      {
        method :'POST',
        headers:{
          'content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      }); 
      const data = await res.json();
      console.log("update user response===>", data)
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }else{
        dispatch (updateUserSuccess(data));
      }
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }

  }

  const deleteAccount=async()=>{
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`,
      {
        method:'DELETE',
        headers:{
          'content-type':'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
      }else{
        dispatch (deleteUserSuccess(data))
        if (data == "User deleted successfully") {
          toast.success(" Your Account deleted successfully ");
          setTimeout(() => navigate("/sign-in"), 1000);
        }  
      }
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    };
    };

    const signoutAccount=async()=>{
      console.log("signout action")
      try{
        dispatch(signoutUserStart());
  
        const res = await fetch('api/auth/signout');
        const data = await res.json();
        if (data.success === false) {
          dispatch(signoutUserFailure(data.message));
        }else{
          dispatch (deleteUserSuccess(data))
          if (data == "user has been logged out") {
            toast.success(" Your Account has been logged out successfully ");
            setTimeout(() => navigate("/sign-in"), 1000);
          }
        }
      }catch(error){
        dispatch(signoutUserFailure(error.message));
      };
    };
  

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form  onSubmit={handleSubmit}  className="flex flex-col gap-4">
        <input
        onChange={(e)=>setFile(e.target.files[0])} 
         type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=>fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center"
        /> 
        <p className="text-sm self-center">
          {fileUploadError?
          (<span className="text-red-700">Error image upload(image must be less than 2 mg)</span>):
          filePerc > 0 && filePerc < 100 ?(
            <span>{`Uploading ${filePerc}%`}</span>
          ): filePerc===100 ?(
            <span className="text-green-700">Image Successfully Uploaded!</span>
          ) : ('')}
        </p>
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          update
        </button>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          create listing
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={deleteAccount} className="text-red-700 cursor-pointer">Delete account</span>
        <span onClick={signoutAccount} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
