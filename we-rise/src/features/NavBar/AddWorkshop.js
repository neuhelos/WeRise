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


const AddWorkshop = ({handleCloseModal}) => {

    const classes = useStyles();

    const currentUser = useSelector( state => state.currentUserSession )

    const title = useInput("")
    const description = useInput("")
    const category = useSelect("")

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [time, setTime] = useState(['', '']);

    const [participants, setParticipants] = useState(1)

    const [skills, setSkills] = useState([])

    const [workshopImage, setWorkshopImage,] = useState(null)

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const dateFormatter = (selectedDate) => {
        let year = selectedDate.year
        let month = selectedDate.month
        month = month.length === 1 ? '0' + month : month
        let date = selectedDate.day
        date = date.length === 1 ? '0' + date : date
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
        let res = await axios.post(`${apiURL}/workshops`, {
            id: id,
            user_id: currentUser.uid,
            title: title.value,
            description: description.value,
            startTime: `${dateFormatter(selectedDate)} ${time[0]}`,
            endTime: `${dateFormatter(selectedDate)} ${time[1]}`,
            //participants: participants,
            workshop_image: workshopImage
        })

        skills.forEach( async (skill) => {
            let res = await axios.post(`${apiURL}/workshopSkills`, {
                workshop_Id: id,
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
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
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
                <Button variant="contained" color="primary" type="submit"> SUBMIT </Button>
            </form>
        </Grid>
    )
}

export default AddWorkshop;