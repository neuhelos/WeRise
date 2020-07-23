import React, {useState} from 'react'

import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'

import { DateRange } from 'react-date-range';
import Grid from '@material-ui/core/Grid'
import Modal from '../BaseComponents/Modal'
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        }
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
    },
    button: {
        fontFamily: 'audiowide'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        backgroundColor: '#F5F5F5',
        borderRadius: '2px',
    },
    select: {
        textAlign: 'left',
        fontFamily: 'audiowide',
    }
}))


const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

const WorkshopFilterBar = ({dateRange, handleDateChange, selectCategories, handleSelectChange}) => {

    const classes = useStyles()

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }
    
    return (
        <>

        <Grid>
            <Button className={classes.button} variant="contained" color="primary" onClick={toggleModal}> Select Date Range </Button>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.select} id="multiple-select-label">Filter Categories</InputLabel>
                <Select
                className={classes.select}
                labelId="multiple-select"
                id="multiple-select"
                multiple
                value={selectCategories}
                onChange={handleSelectChange}
                input={<Input />}
                renderValue={(selected) => selected.length > 1 ? "Multiple Categories" : selected[0]}
                MenuProps={MenuProps}
                >
                {names.map((name) => (
                    <MenuItem key={name} value={name}>
                    <Checkbox checked={selectCategories.indexOf(name) > -1} />
                    <ListItemText primary={name}/>
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
        </Grid>
        
        <Modal open={open} toggleModal={toggleModal}>
            <DateRange
                editableDateInputs={true}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                handleCloseModal={toggleModal}
                minDate={new Date()}
            />
        </Modal>
        </>
    )
}

export default WorkshopFilterBar;