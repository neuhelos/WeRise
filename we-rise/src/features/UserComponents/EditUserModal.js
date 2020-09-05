import React, { useState, useSelector } from 'react'
import axios from 'axios'
import { useHistory} from 'react-router-dom'
import { apiURL } from '../../Utilities/apiURL'
import {storage, firestore} from '../../Utilities/firebase'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';
import { current } from '@reduxjs/toolkit'
import Dropzone from '../BaseComponents/FileDropzone'
import {useInput} from '../../Utilities/CustomHookery'
import Chip from '@material-ui/core/Chip';



const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            textAlign: 'center',
            outlineColor: '#36386D',
            border: 'none',
            margin: theme.spacing(1)
        },
    },
    image : {
        width:'50%',
        height: '50%'
    }
}))


const EditUserModal = ({ toggleModal}) => {
    // const currentUser = useSelector((state) => state.currentUserSession.uid);
  const classes = useStyles();
  const history = useHistory();
  const email = useInput("")
  const password = useInput("")
  const firstName = useInput("")
  const lastName = useInput("")
  const bio = useInput("")
  const [skills, setSkills] = useState([])
  const [uploadPic, setUploadPic] = useState("https://firebasestorage.googleapis.com/v0/b/werise-c999a.appspot.com/o/image%2FRainbowSmileyDefaultAvatar.png?alt=media&token=379959f1-6d89-43a4-bf01-92a68841c643")

  const instagram = useInput("")
  const facebook = useInput("")
  const twitter = useInput("")
  const linkedin = useInput("")

  const handleSkillsTagsChange = (event, values) => {
    setSkills(values)
  }

  const handleImageChange = (imageFile) => {
    if(imageFile[0]){
      handleUpload(imageFile[0])
    }
  }

  const handleCurrentUser = (currentUser) => {
      
    toggleModal()
    
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
  
      
      let res =  await axios.post(`${apiURL()}/users`, {
        // id: currentUser.uid,
        firstn: firstName.value,
        lastn: lastName.value,
        email: email.value,
        user_pic: uploadPic,
        bio : bio.value,
        instagram: instagram.value,
        facebook: facebook.value,
        twitter: twitter.value,
        linkedin: linkedin.value
      })
      
      skills.forEach( async (skill) => {
          let res = await axios.post(`${apiURL}/usersSkills`, {
            //   currentUser: currentUser,
              skills: skill.toLowerCase()
        })
      })
    } catch (err){
      console.log(err)
      alert(err.message)
      return(<p>{err.message}</p>)
    }
    history.push(`/Profile/${handleCurrentUser}`)
  }

    
  const handleUpload = (image) => {
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
    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
                    <form className={classes.root} onSubmit={handleSubmit}>
          <Typography className={classes.input} variant="h6">Create Your We Rise Account</Typography>
          <Grid container className={classes.container} display="flex" direction="row" justify="space-evenly" alignItems="center" wrap='nowrap'>
            <TextField className={classes.input} id="firstName" label="Preferred First Name" placeholder="Enter First Name" variant="filled" {...firstName} required />
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField  className={classes.input} id="lastName" label="Preferred Last Name" placeholder="Enter Last Name" variant="filled" {...lastName} required/>
          </Grid>
          <Grid container className={classes.container} display="flex" direction="row" justify="space-evenly" alignItems="center" wrap='nowrap'>
            <TextField className={classes.input} id="email" label="Email" placeholder="Enter Your Email" variant="filled" {...email} required/>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField className={classes.input} id="password" type="password" label="Password" placeholder="Enter Password" variant="filled" {...password} required/>
          </Grid>
          <TextField className={classes.inputFullWidth} inputProps={{style: {textAlign: 'left'}}} id="bio" label="Short Bio" placeholder="Tell Folx About Yourself" variant="filled" multiline rows={4} {...bio} required/>
          <Autocomplete className={classes.inputFullWidth} multiple id="userSkills" options={[]} defaultValue={""} freeSolo
              onChange={handleSkillsTagsChange}
              renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                      <Chip variant="filled" label={option} {...getTagProps({ index })} />
                  ))
              }
              renderInput={(params) => (
              <TextField {...params} variant="filled" label="Your Skills" placeholder="Enter a Skill You'd Like to Share & Press Enter" />
              )}
          />
          
          <Grid container className={classes.container} display="flex" direction="row" justify="space-evenly" alignItems="center" wrap='nowrap'>
            <TextField className={classes.input} id="instagram" label="Instagram" placeholder="Enter Handle" variant="filled" {...instagram}/>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField className={classes.input} id="facebook" label="Facebook" placeholder="Enter Username" variant="filled" {...facebook}/>
          </Grid>
          <Grid container className={classes.container} display="flex" direction="row" justify="space-evenly" alignItems="center" wrap='nowrap'>
            <TextField className={classes.input} id="twitter" label="Twitter" placeholder="Enter  Handle" variant="filled" {...twitter}/>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField className={classes.input} id="linkedin" label="LinkedIn" placeholder="Enter  Username" variant="filled" {...linkedin}/>
          </Grid>
          <Dropzone className={classes.container} handleImageChange={handleImageChange} dropzoneText={"Drop or Select Your Profile Image"}/>
          <Grid container display="flex" direction="row" justify="space-evenly" alignItems="center">
  
            <Button className={classes.button} variant="contained" color="primary" type="submit"> UPDATE YOUR ACCOUNT </Button>
          </Grid>
        </form>
        </Grid>
    )
}

export default EditUserModal;
