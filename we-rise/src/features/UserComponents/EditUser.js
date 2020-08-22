import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import {useInput, useSelect} from '../../Utilities/CustomHookery'
import {apiURL} from '../../Utilities/apiURL'
import {storage} from '../../Utilities/firebase'

const useStyles  = makeStyles((theme)=>({
    root:{},
    container:{},
    input:{},
}))
const EditUser=()=>{
const classes = useStyles()
const [firstn, setFirstn] = useState("");
const [lastn, setLastn] = useState("");
const [email, setEmail] = useState("");
const [bio, setBio] = useState("");
const [userImage, setUserImage] = useState(null)

const handleFirstName = (firstn)=>{
    setFirstn(firstn)
}
const handleLastName = (lastn)=>{
    setLastn(lastn)
}
const handleEmail = (email)=>{
    setEmail(email)
}
const handleBio=(bio)=>{
    setBio(bio)
}
const handleImage=(user_pic)=>{
    if(user_pic[0]){
        handleUpload(user_pic[0])
    }
}

const handleUpload = (user_pic)=>{
    const uploadTasks = storage.ref(`posts/${user_pic.name}`).put(user_pic);
    // debugger
    uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
        console.log(error);
        },
        () => {
            storage
            .ref("posts")
            .child(user_pic.name)
            .getDownloadURL()
            .then(url => {
                setUserImage(url)
                console.log(url)
            })
        }
    )

}
const handleSubmit=async(event)=>{
    try {
        
    } catch (error) {
        
    }
}
    return(
        <div>

        </div>
    )

}

export default EditUser;