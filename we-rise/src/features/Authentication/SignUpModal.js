import React, { useState } from 'react';
import { signUp } from '../../Utilities/firebaseFunctions';
import { storage, firestore } from '../../Utilities/firebase'
import { useHistory} from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../../Utilities/apiURL'


import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import Dropzone from '../BaseComponents/FileDropzone'
import { useInput } from '../../Utilities/CustomHookery'


const useStyles = makeStyles((theme) => ({
  root: {
      width: '100%',
      '& *': {
          fontFamily: 'audiowide',
          textAlign: 'center',
          outlineColor: '#36386D',
          border: 'none',
      },
  },
  container: {
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  inputFullWidth: {
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  input: {
      fontFamily: 'audiowide',
      width: '100%'
  },
  divider: {
    margin: theme.spacing(0.25)
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const SignUpModal = ({toggleModal, toggleSignInModal}) => {

    
  const classes = useStyles()

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

  const history = useHistory();
  

  const handleSkillsTagsChange = (event, values) => {
    setSkills(values)
  }

  const handleImageChange = (imageFile) => {
    if(imageFile[0]){
      handleUpload(imageFile[0])
    }
  }

  const handleCurrentUser = () => {
    toggleModal()
    toggleSignInModal()
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {
      let userId
      await signUp(email.value, password.value).then( authUser => {
        userId = authUser.user.uid;
        firestore
          .collection('users')
          .doc(userId)
          .set({userId: userId, firstName: firstName.value, lastName: lastName.value, email: email.value})
      }, error => {
        console.log(error)
      });
      
      let res =  await axios.post(`${apiURL()}/users`, {
        id: userId,
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
              user_id: userId,
              skills: skill.toLowerCase()
        })
      })
    } catch (err){
      console.log(err)
      alert(err.message)
      return(<p>{err.message}</p>)
    }
    history.push("/CommunityDashboard")
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
      <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
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
          <TextField className={classes.inputFullWidth} id="bio" label="Short Bio" placeholder="Tell Folx About Yourself" variant="filled" multiline rows={4} {...bio} required/>
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
            <Button className={classes.button} variant="contained" color="primary" onClick={handleCurrentUser}> HAVE AN ACCOUNT? </Button>
            <Button className={classes.button} variant="contained" color="primary" type="submit"> CREATE NEW ACCOUNT </Button>
          </Grid>
        </form>
      </Grid>
    )
}

export default SignUpModal;