import React, { useState } from 'react';
import { signUp } from '../../Utilities/firebaseFunctions';
import { storage } from '../../Utilities/firebase'
import axios from 'axios'


const SignUpModal = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState(null)
    const [UploadPic, setUploadPic] = useState("https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [socialmedia, setSocailMedia] = useState("")
    
   


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
             await signUp(email, password);
          //    let res =  await axios.post(`${API}/users`, {
          //     firstName: firstName,
          //     lastName: lastName,
          //     password: password,
          //     email: email,
          //     user_pic: UploadPic,
          //     bio : bio,
          //     socialMedia: socialMedia
          // })

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
  
      console.log("image: ", UploadPic);
  



    return (
        <div>

        <form onSubmit = {handleSubmit}>

            <input required id = 'firstName' placeholder = 'First Name' value = {firstName} onChange = {(e) => {
                setFirstName(e.currentTarget.value)
            }} />
                
            <input required id = 'lastName' placeholder = 'Last Name' value = {lastName} onChange = {(e) => {
                setLastName(e.currentTarget.value)
            }}/>
              <br/>
            <input required id = 'email' placeholder = 'Email' value = {email} onChange = {(e) => {
                setEmail(e.currentTarget.value)
            }}/>

            <input required id = 'password' placeholder = 'Password' type = "password"  value = {password} onChange = {(e) => {
                setPassword(e.currentTarget.value)}} />
              <br/>
            <textarea required id = 'bio' placeholder = 'Bio' type = "text"  value = {bio} onChange = {(e) => {
                setBio(e.currentTarget.value)}} />

            <input  id = 'socailMedia' placeholder = 'socail Media' type = "text"  value = {socialmedia} onChange = {(e) => {
                setSocailMedia(e.currentTarget.value)}} />
            
            <button>signUp</button>
        </form>

        Profile Picture: <input  type = "file" onChange = {handleClick} />
        <button onClick={handleupload}>Upload</button>

        {/* <img src = {UploadPic}  width="500" height="400"/> */}
        </div>
    )
}

export default SignUpModal;