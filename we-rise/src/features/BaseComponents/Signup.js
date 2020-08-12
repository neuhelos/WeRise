import React, { useState } from 'react';
import { signup } from '../../Utilities/firebaseFunctions';
import { storage } from '../../firebase'
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import {apiURL} from '../../Utilities/apiURL'
import {useHistory} from 'react-router-dom'
const Signup = () => {
    const [firstn, setFirstn] = useState("")
    const [lastn, setLastn] = useState("");
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [UploadPic, setUploadPic] = useState(null);
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    const API = apiURL()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res = await signup(email, password);
             await axios.post(`${API}/users`,{
               id: res.user.id,
               email,
               firstn,
               lastn,
               bio,
               user_pic,
             });
             history.push("/")
             
        }
        catch (err){
            console.log(err.message)
        }
    }

    const handleClick = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
      };
  
      const handleupload = () => {
        const uploadTask = storage.ref(`image/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            storage
            .ref("image")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                setUploadPic(url)
            })
          }
        )
      }
  
      console.log("image: ", image);
  



    return (
        <div>

        <h3>Sign up!</h3>
        <form onSubmit = {handleSubmit}>
            <input required id = 'email' placeholder = 'Email' value = {email} onChange = {(e) => {
                setEmail(e.currentTarget.value)
            }}/>
               <input placeholder = 'bio' value = {bio} onChange = {(e) => {
                setBio(e.currentTarget.value)
            }}/>
            <input placeholder = 'firstn' value = {firstn} onChange = {(e) => {
                setFirstn(e.currentTarget.value)
            }}/>
               <input  placeholder = 'lastn' value = {lastn} onChange = {(e) => {
                setLastn(e.currentTarget.value)
            }}/>


            <input required id = 'password' placeholder = 'Password' type = "password"  value = {password} onChange = {(e) => {
                setPassword(e.currentTarget.value)}} />
            
            <button>signUp</button>
        </form>

        <input  type = "file" onChange = {handleClick} />
        <button onClick={handleupload}>Upload</button>

        <img src = {UploadPic}  width="500" height="400"/>
        </div>
    )
}

export default Signup;
