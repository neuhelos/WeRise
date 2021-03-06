import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dropzone from '../BaseComponents/FileDropzone'

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
    container: {
        marginBottom: theme.spacing(1)
    },
    input: {
        width: '100%',
        fontFamily: 'audiowide',
        marginBottom: theme.spacing(1)
    },
    datePicker : {
        fontFamily: 'audiowide',
        width: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        borderRadius: '4px',
        paddingTop: theme.spacing(1)
    },
    participants : {
        width: '40%',
        marginLeft: theme.spacing(1)
    },
    inputLabel: {
        padding: theme.spacing(1),
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        borderRadius: '4px',
    }
}));


const EditWorkshop = ({ workshop ,handleCloseModal}) => {

    const classes = useStyles();

    const currentUser = useSelector( state => state.currentUserSession.uid )
   

    const title = useInput(workshop.title)
    const description = useInput(workshop.descriptions)
    const category = useSelect(workshop.category)

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState(['', '']);

    const [participants, setParticipants] = useState(workshop.participants)

    const [skills, setSkills] = useState([])

    const [workshopImage, setWorkshopImage,] = useState(workshop.workshop_img)

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const pad = (value) => value.toString() === 1 ? '0' + value : value
    const dateFormatter = (selectedDate) => {    
        let year = selectedDate.getFullYear()
        debugger
        let month = selectedDate.getMonth() + 1
        month = pad(month)
        let date = selectedDate.getDate()
        date = pad(date)
        return `${year}-${month}-${date}`;
    }

    const handleTimeChange = (time) => {
        setTime(time)
    }

    const handleParticipantsChange = (event) => {
        setParticipants(event.target.value)
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

    const handleSubmit = async (event) => {

        event.preventDefault()
        let id = uuidv4()
        try {
            let res = await axios.put(`${apiURL()}/workshops/${workshop.workshop_id}`, {
                title: title.value,
                description: description.value,
                start_time: `${dateFormatter(new Date(selectedDate))} ${time[0]}`,
                end_time: `${dateFormatter(new Date(selectedDate))} ${time[1]}`,
                category: category.value,
                participants: participants,
                workshop_img: workshopImage
            })
        
            skills.forEach( async (skill) => {
                let resSkills = await axios.put(`${apiURL()}/workshopSkills`, {
                  workshop_Id: workshop.workshop_id,
                  skill: skill.toLowerCase()
             })
        })
        } catch (error) {
            throw Error(error)
        }
        handleCloseModal()
    }

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center">
            <form onSubmit={handleSubmit} className={classes.root}>
                <Typography variant="h6">Create Your Workshop</Typography>
                <TextField className={classes.input} id="filled-basic" label="Workshop Title" placeholder="Enter Workshop Title" variant="filled" {...title}/>
                <TextField className={classes.input} inputProps={{style: {textAlign: 'left'}}} id="filled-textarea" label="Workshop Description" placeholder="Enter a Brief Description of Your Workshop" multiline rows={3} variant="filled" {...description}/>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <InputLabel className={classes.inputLabel} id="timerangepicker">Workshop Time</InputLabel>
                    <Container className={classes.container} > 
                        <span>From:<TimeRangePicker
                            labelId="timerangepicker"
                            onChange={handleTimeChange}
                            value={time}
                            disableClock
                            hourPlaceholder="hh"
                            minutePlaceholder="mm"
                            rangeDivider="To:"
                        /></span>
                    </Container>
                    <Grid container className={classes.container} display="flex" direction="row" justify="center" alignItems="center" wrap='nowrap' >
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
                        <FormControl variant="filled" className={classes.participants}>
                            <InputLabel id="participants">Max Participants</InputLabel>
                            <Select
                            labelId="participants"
                            id="number-of-participants"
                            value={participants}
                            onChange={handleParticipantsChange}
                            >
                            <MenuItem value={1} style={{fontFamily: 'audiowide'}}>1</MenuItem>
                            <MenuItem value={2} style={{fontFamily: 'audiowide'}}>2</MenuItem>
                            <MenuItem value={3} style={{fontFamily: 'audiowide'}}>3</MenuItem>
                            <MenuItem value={4} style={{fontFamily: 'audiowide'}}>4</MenuItem>
                            <MenuItem value={5} style={{fontFamily: 'audiowide'}}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
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
                <Dropzone handleImageChange={handleImageChange} dropzoneText={"Drop or Select Your Workshop Image"}/>
                <Grid container className={classes.container} display="flex" direction="row" justify="space-around" alignItems="center">
                    <Button variant="contained" color="primary" onClick={handleCloseModal}> CANCEL </Button>
                    <Button variant="contained" color="primary" type="submit"> SUBMIT </Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default EditWorkshop;