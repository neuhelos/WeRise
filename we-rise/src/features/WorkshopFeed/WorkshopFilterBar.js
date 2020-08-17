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



const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide',
        margin: theme.spacing(1),
        outline: 'none'
    },
    button: {
        fontFamily: 'audiowide',
        width: '50%',
        height: '3rem',
        margin: theme.spacing(1),
        background: '#36386D'
    },
    select: {
        fontFamily: 'audiowide',
        height: '3rem',
        margin: theme.spacing(1),
        backgroundColor: 'white',
        borderRadius: '4px',
        width: '50%'    
    },
    inputLabel: {
        width: '100%',
        fontFamily: 'audiowide',
        textAlign: 'center'
    },
    dateRange: {
        margin: theme.spacing(1)
    }
}))

const WorkshopFilterBar = ({dateRange, handleDateChange, selectCategories, handleSelectChange, buttonLabelChange, selectAllCategories, clearSelectCategories }) => {

    const classes = useStyles()

    const [openMenu, setOpenMenu] = useState(false)

    const handleOpenMenu = (event) => {
        setOpenMenu(true)
    };

    const handleCloseMenu = (event) => {
        setOpenMenu(false)
        event.stopPropagation()
    };

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 350,
            }
        },
        open: openMenu,
        onClose: handleCloseMenu,
        anchorOrigin: { vertical: 'top', horizontal: 'left'},
    }

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

    const buttonDateRangeLabel = !buttonLabelChange ? 
        "Select Date Range" : 
        `${dateConverter(dateRange[0].startDate)} thru 
        ${dateConverter(dateRange[0].endDate)}`

    return (
        <>

        <Grid container display="flex" direction="row" justify="center" alignItems="center" wrap='nowrap'>
            <Button className={classes.button} variant="contained" color="primary" onClick={toggleModal} size='small'>{buttonDateRangeLabel}</Button>
            <Select
                className={classes.select}
                id="multiple-select-categories"
                displayEmpty
                multiple
                value={selectCategories}
                onChange={handleSelectChange}
                onClick={handleOpenMenu}
                input={<Input style={{textAlign: 'center'}}/>}
                renderValue={(selected) => selected.length > 1 ? "Multiple" : selected.length === 1 ? selected[0] : "Categories" }
                MenuProps={MenuProps}
                >
                    <Grid className={classes.root} container display="flex" direction="row" justify="space-around" alignItems="center" wrap='nowrap'>
                        <Button variant="contained" color="primary" onClick={selectAllCategories} size='small'>All</Button>
                        <Button variant="contained" color="primary" onClick={clearSelectCategories} size='small'>Clear</Button>
                        <Button variant="contained" color="primary" onClick={handleCloseMenu} size='small'>Select</Button>
                    </Grid>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category} >
                            <Checkbox checked={ selectCategories.indexOf(category) > -1  }/>
                            <ListItemText primary={category}/>
                        </MenuItem>
                    ))}
            </Select>
        </Grid>
        
        <Modal open={open}>
            <Grid className={classes.root} container display="flex" direction="column" justify="space-evenly" alignItems="center" wrap='nowrap'>
                <DateRange
                    className={classes.dateRange}
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    handleCloseModal={toggleModal}
                    minDate={new Date()}
                    shownDate={new Date()}
                    scroll={{ enabled: true }}
                    startDatePlaceholder="Start Date"
                    endDatePlaceholder="End Date"
                />
                <Button className={classes.button} variant="contained" color="primary" onClick={toggleModal} size='small'>SELECT</Button>
            </Grid>
        </Modal>
        </>
    )
}

export default WorkshopFilterBar;