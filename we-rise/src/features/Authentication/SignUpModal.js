import React, { useState } from 'react';
import { signUp } from '../../Utilities/firebaseFunctions';
import { storage } from '../../Utilities/firebase'
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
    marginBottom: theme.spacing(1)
  },
  input: {
      width: '100%',
      fontFamily: 'audiowide',
      marginBottom: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(0.25)
  }
}));

const SignUpModal = ( ) => {

    
  const classes = useStyles()

  const email = useInput("")
  const password = useInput("")
  const firstName = useInput("")
  const lastName = useInput("")
  const bio = useInput("")
  const [skills, setSkills] = useState([])
  const [uploadPic, setUploadPic] = useState("https://www.dts.edu/wp-content/uploads/sites/6/2018/04/Blank-Profile-Picture.jpg")

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
      handleupload(imageFile[0])
    }
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      let resSignup = await signUp(email.value, password.value);
      
      let res =  await axios.post(`${apiURL()}/users`, {
        id: resSignup.user.uid,
        firstn: firstName.value,
        lastn: lastName.value,
        email: email,
        user_pic: uploadPic,
        bio : bio.value,
        // instagram: instagram.value,
        // facebook: facebook.value,
        // twitter: twitter.value,
        // linkedin: linkedin.value
      })
      
      skills.forEach( async (skill) => {
          let res = await axios.post(`${apiURL}/usersSkills`, {
              user_id: resSignup.user.uid,
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

  const handleClick = (e) => {
      if(e.target.files[0]){
        handleupload(e.target.files[0]);
      }
    };

      const handleupload = (image) => {
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

     

      console.log("image: ", uploadPic);




    return (
      <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
        <form onSubmit = {handleSubmit}>
          <Typography className={classes.input} variant="h6">Create Your We Rise Account</Typography>
          <Grid container className={classes.container} display="flex" direction="row" justify="space-evenly" alignItems="center" wrap='nowrap'>
            <TextField id="firstName" label="Preferred First Name" placeholder="Enter First Name" variant="filled" {...firstName}/>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField  id="lastName" label="Preferred Last Name" placeholder="Enter Last Name" variant="filled" {...lastName}/>
          </Grid>
          <Grid container className={classes.container} display="flex" direction="row" justify="space-evenly" alignItems="center" wrap='nowrap'>
            <TextField id="email" label="Email" placeholder="Enter Your Email" variant="filled" {...email}/>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField id="password" type="password" label="Password" placeholder="Enter Password" variant="filled" {...password}/>
          </Grid>
          <TextField className={classes.input} id="bio" label="Short Bio" placeholder="Tell Folx About Yourself" variant="filled" multiline rows={4} {...bio}/>
          <Autocomplete className={classes.input} multiple id="userSkills" options={[]} defaultValue={""} freeSolo
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
            <TextField id="instagram" label="Instagram" placeholder="Enter Handle" variant="filled" {...instagram}/>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField id="facebook" label="Facebook" placeholder="Enter Username" variant="filled" {...facebook}/>
          </Grid>
          <Grid container className={classes.container} display="flex" direction="row" justify="space-evenly" alignItems="center" wrap='nowrap'>
            <TextField id="twitter" label="Twitter" placeholder="Enter  Handle" variant="filled" {...twitter}/>
            <Divider className={classes.divider} orientation="vertical" flexItem />
            <TextField id="linkedin" label="LinkedIn" placeholder="Enter  Username" variant="filled" {...linkedin}/>
          </Grid>
          <Dropzone handleImageChange={handleImageChange} dropzoneText={"Drop or Select Your Profile Image"}/>
          <Button variant="contained" color="primary" type="submit"> SIGN UP </Button>

        </form>
      </Grid>
    )
}

export default SignUpModal;

