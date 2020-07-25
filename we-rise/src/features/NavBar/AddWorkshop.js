import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';

import Dropzone from '../BaseComponents/FileDropzone'
import CategoryDropdown from './WorkshopCategoryDropdown'
import { useInput, useSelect } from '../../Utilities/CustomHookery'
import { apiURL } from '../../Utilities/apiURL'
import { storage } from '../../Utilities/firebase'

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
    input: {
        width: '100%',
        fontFamily: 'audiowide',
        marginBottom: theme.spacing(1)
    },
    datePicker : {
        fontFamily: 'audiowide',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        borderRadius: '4px',
        marginBottom: theme.spacing(1)
    },
    inputLabel: {
        padding: theme.spacing(1),
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        borderRadius: '4px',
    }
}));


const AddWorkshop = ({handleCloseModal}) => {

    const classes = useStyles();

    const currentUser = useSelector( state => state.currentUserSession )

    const title = useInput("")
    const description = useInput("")
    const category = useSelect("")

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState(['', '']);

    const [skills, setSkills] = useState([])

    const [workshopImage, setWorkshopImage,] = useState(null)

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    
    const handleTimeChange = (time) => {
        setTime(time)
    }

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

    const timeParser = (time) => {
        let timeHourMinutes = time.split(':')
        return timeHourMinutes
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        let res = await axios.post(`${apiURL}/workshops`, {
            id: uuidv4(),
            user_id: currentUser.uid,
            title: title.value,
            description: title.value,
            date: selectedDate,
            startTime: new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate(),timeParser(time[0])[0], timeParser(time[0])[1]),
            endTime: new Date(selectedDate.getFullYear(),selectedDate.getMonth(),selectedDate.getDate(),timeParser(time[1])[0], timeParser(time[1])[1]),
            workshop_image: workshopImage
        })

        let skill = skills.forEach( async (skill) => {
            let resSkills = await axios.post(`${apiURL}/workshopSkills`, {
                workshop_Id: res.id,
                skill: skill.toLowerCase()
            })
        })
        handleCloseModal()
    }

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <Typography variant="h6">Create Your Workshop</Typography>
                <TextField className={classes.input} id="filled-basic" label="Workshop Title" placeholder="Enter Workshop Title" variant="filled" {...title}/>
                <CategoryDropdown className={classes.input} category={category}/>
                <TextField className={classes.input} id="filled-textarea" label="Workshop Description" placeholder="Enter a Brief Description of Your Workshop" multiline variant="filled" {...description}/>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <KeyboardDatePicker className={classes.datePicker}
                        disablePast
                        label="Workshop Date"
                        format="MM/dd/yyyy" 
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <InputLabel className={classes.inputLabel} id="timerangepicker">Workshop Time</InputLabel>
                    <span>From<TimeRangePicker
                        labelId="timerangepicker"
                        onChange={handleTimeChange}
                        value={time}
                        disableClock
                        hourPlaceholder="hh"
                        minutePlaceholder="mm"
                        rangeDivider="To"
                    /></span>
                </MuiPickersUtilsProvider>
                <Autocomplete className={classes.input} multiple id="tags-filled" options={[]} defaultValue={""} freeSolo
                    style={{marginTop: '0.5rem'}}
                    onChange={handleSkillsTagsChange}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                    <TextField {...params} variant="filled" label="Workshop Skills" placeholder="Enter a Skill and Press Enter" />
                    )}
                />
                <Dropzone handleImageChange={handleImageChange} />
                <Button variant="contained" color="primary" type="submit"> SUBMIT </Button>
            </form>
        </Grid>
    )
}

export default AddWorkshop;