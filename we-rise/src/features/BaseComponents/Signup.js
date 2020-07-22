import React, { useState } from 'react';
import { signup } from '../../Utilities/firebaseFunctions';
import { storage } from '../../firebase'
import Modal from '@material-ui/core/Modal';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [UploadPic, setUploadPic] = useState(null);
    const [open, setOpen] = React.useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
             await signup(email, password);
             
        }
        catch (err){
            console.log(err)
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

        <h3>Testing Sign up!</h3>
        <form onSubmit = {handleSubmit}>
            <input required id = 'email' placeholder = 'Email' value = {email} onChange = {(e) => {
                setEmail(e.currentTarget.value)
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
