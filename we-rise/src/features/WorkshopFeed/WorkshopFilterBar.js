import React, {useState} from 'react'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'
import { makeStyles } from '@material-ui/core/styles'

import { DateRange } from 'react-date-range';
import Grid from '@material-ui/core/Grid'
import Modal from '../BaseComponents/Modal'
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'audiowide'
    },
    button: {
        fontFamily: 'audiowide'
    }
}))

const WorkshopFilterBar = () => {
    
    const classes = useStyles()

    const [dateRange, setDateRange] = useState([
        {
        startDate: new Date(),
        endDate: null,
        key: 'selection'
        }
    ]);

    const handleDateChange = (item) => {
        setDateRange([item.selection])
    }

    const [open , setOpen] = useState(false)
    const toggleModal = () => {
        setOpen(!open)
    }
    
    return (
        <>

        <Grid>
            <Button className={classes.button} variant="contained" color="primary" onClick={toggleModal}> Select Date Range </Button>
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