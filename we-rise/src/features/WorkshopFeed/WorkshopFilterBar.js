import React, {useState} from 'react'

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

import { categories } from '../BaseComponents/WorkshopCategories'


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
        fontFamily: 'audiowide',
        width: '50%',
        height: '3rem',
        margin: theme.spacing(1)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
        backgroundColor: '#F5F5F5',
        borderRadius: '4px',
        width: '50%'
    },
    select: {
        fontFamily: 'audiowide',
    },
    inputLabel: {
        width: '100%',
        fontFamily: 'audiowide',
        textAlign: 'center'
    }
}))

const WorkshopFilterBar = ({dateRange, handleDateChange, selectCategories, handleSelectChange}) => {

    const classes = useStyles()

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }

    const dateConverter = (date) => {
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        return `${month+1}-${day}-${year}`
    }

    const buttonDateRangeLabel = !dateRange[0].endDate ? 
        "Select Date Range" : 
        `${dateConverter(dateRange[0].startDate)} thru 
        ${dateConverter(dateRange[0].endDate)}`

    return (
        <>

        <Grid container display="flex" direction="row" justify="center" alignItems="center" wrap='nowrap'>
            <Button className={classes.button} variant="contained" color="primary" onClick={toggleModal} size='small'>{buttonDateRangeLabel}</Button>
            <FormControl className={classes.formControl}>
                <InputLabel className={classes.inputLabel} id="multiple-select-label">Filter Categories</InputLabel>
                <Select
                className={classes.select}
                labelId="multiple-select"
                id="multiple-select"
                multiple
                value={selectCategories}
                onChange={handleSelectChange}
                input={<Input style={{textAlign: 'center' }}/>}
                renderValue={(selected) => selected.length > 1 ? "Multiple Categories" : selected[0]}
                MenuProps={MenuProps}
                >
                {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                    <Checkbox checked={selectCategories.indexOf(category) > -1} />
                    <ListItemText primary={category}/>
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