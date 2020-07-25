import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'

import Dropzone from '../BaseComponents/FileDropzone'
import CategoryDropdown from './WorkshopCategoryDropdown'
import { useInput, useSelect } from '../../Utilities/CustomHookery'
import { APIURL } from '../../Utilities/apiURL'
import { storage } from '../../Utilities/firebase'

const useStyles = makeStyles((theme) => ({
    root: {
        '& * + *': {
            marginTop: theme.spacing(1)
        },
        width: '100%',
        '& *': {
            fontFamily: 'audiowide',
            textAlign: 'center'
        }
    },
    input: {
        width: '100%',
    },
    dateTimePicker : {
        width: '100%',
    }
}));


const AddWorkshop = ({handleCloseModal}) => {

    const classes = useStyles();

    const currentUser = useSelector( state => state.currentUserSession )

    const title = useInput("")
    const description = useInput("")
    const category = useSelect("")

    const [selectedDate, handleDateChange] = useState(new Date());
    const [skills, setSkills] = useState([])

    const [workshopImage, setWorkshopImage,] = useState(null)

    const handleSkillsTagsChange = (event, values) => {
        setSkills(values)
    }

    const handleImageChange = (imageFile) => {
       if(imageFile[0]){
        handleupload(imageFile[0])
       }
        
    }

    const handleupload = (imageFile) => {
        const uploadTask = storage.ref(`Workshop/${imageFile.name}`).put(imageFile);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            storage
            .ref("Workshop")
            .child(imageFile.name)
            .getDownloadURL()
            .then(url => {
                setWorkshopImage(url)
                console.log(url)
            })
          }
        )
      }

    const handleSubmit = async (event) => {
        event.preventDefault()
        handleCloseModal()
        let res = await axios.post(`${apiURL}/workshops`, {
            user_id: currentUser.uid,
            title: title.value,
            description: title.value,
            date: selectedDate,
            startTime: selectedDate.getTime(),
            endTime: null,
            workshop_image: workshopImage
        })
    }

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Typography variant="h6">Create Your Workshop</Typography>
                <TextField className={classes.input} id="filled-basic" label="Workshop Title" placeholder="Enter Workshop Title" variant="filled" {...title}/>
                <CategoryDropdown category={category}/>
                <TextField className={classes.input} id="filled-textarea" label="Workshop Description" placeholder="Enter a Brief Description of Your Workshop" multiline variant="filled" {...description}/>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <DateTimePicker className={classes.dateTimePicker} value={selectedDate} disablePast onChange={handleDateChange} label="Workshop Date and Start Time"/>
                </MuiPickersUtilsProvider>
                <Autocomplete className={classes.input} multiple id="tags-filled" options={[]} defaultValue={""} freeSolo
                    onChange={handleSkillsTagsChange}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                    <TextField {...params} variant="filled" label="Workshop Skills" placeholder="Enter One or More Skills & Press Enter" />
                    )}
                />
                <Dropzone handleImageChange={handleImageChange} />
                <Button variant="contained" color="primary" type="submit"> SUBMIT </Button>
            </form>
        </Grid>
    )
}

export default AddWorkshop;