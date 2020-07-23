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

import CategoryDropdown from './WorkshopCategoryDropdown'
import { useInput, useSelect } from '../../Utilities/CustomHookery'

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
    },
  }));


const AddWorkshop = () => {

    const classes = useStyles();

    const title = useInput("")
    const description = useInput("")
    const category = useSelect("")

    const [selectedDate, handleDateChange] = useState(new Date());
    const [skills, setSkills] = useState([])

    const handleSkillsTagsChange = (event, values) => {
        setSkills(values)
    }

    const handleSubmit = (event) => {
        event.preventDefault()

    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container display="flex" direction="column" justify="center" alignItems="center" maxWidth="sm">
                <TextField id="filled-basic" label="Workshop Title" variant="filled" {...title}/>
                <CategoryDropdown category={category}/>
                <TextField id="filled-textarea" label="Workshop Description" placeholder="Enter a Brief Description of Your Workshop" multiline variant="filled" {...description}/>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                    <DateTimePicker value={selectedDate} disablePast onChange={handleDateChange} label="Date and Start Time"/>
                </MuiPickersUtilsProvider>
                <Autocomplete multiple id="tags-filled" options={[]} defaultValue={""} freeSolo
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
                <Button variant="contained" color="primary"> SUBMIT </Button>
            </Grid>
        </form>
    )
}

export default AddWorkshop;