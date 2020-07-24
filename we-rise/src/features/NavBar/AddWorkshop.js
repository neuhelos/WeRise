import React, { useState } from 'react'
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';

import Dropzone from '../BaseComponents/FileDropzone'
import CategoryDropdown from './WorkshopCategoryDropdown'
import { useInput, useSelect } from '../../Utilities/CustomHookery'

const useStyles = makeStyles((theme) => ({
    root: {
        '& * + *': {
            marginTop: theme.spacing(1)
        },
        width: '100%',
        '& *': {
            fontFamily: 'audiowide'
        }
    },
    input: {
        width: '100%',
    },
    dateTimePicker : {
        width: '100%',
    }
}));


const AddWorkshop = () => {

    const classes = useStyles();

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
        setWorkshopImage(imageFile)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // title.value
        // description.value
        // category.value
        // workshopImage
        // skills.forEach
        // selectedDate - date and time

    }

    return (
        <Grid className={classes.root} container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <TextField className={classes.input} id="filled-basic" label="Workshop Title" variant="filled" {...title}/>
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
                    <TextField {...params} variant="filled" label="Workshop Skills" placeholder="Enter Skills Taught" />
                    )}
                />
                <Dropzone handleImageChange={handleImageChange} />
                <Button variant="contained" color="primary"> SUBMIT </Button>
            </form>
        </Grid>
    )
}

export default AddWorkshop;