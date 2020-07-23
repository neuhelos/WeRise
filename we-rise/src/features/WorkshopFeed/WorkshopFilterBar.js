import React, {useState} from 'react'

import { makeStyles } from '@material-ui/core/styles'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'

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

const WorkshopFilterBar = ({dateRange, handleDateChange}) => {
    
    const handleChange = handleDateChange

 
    const classes = useStyles()

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
                onChange={handleChange}
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