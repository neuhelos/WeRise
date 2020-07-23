import React, {useState} from 'react'

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'

import { DateRange } from 'react-date-range';
import Grid from '@material-ui/core/Grid'
import Modal from '../BaseComponents/Modal'
import Button from '@material-ui/core/Button';

const WorkshopFilterBar = () => {
    
    
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

            <Button variant="contained" color="primary"> Select Date Range </Button>
        </Grid>
        
            <Modal open={open}>
                <DateRange
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                />
            </Modal>
        </>
    )
}

export default WorkshopFilterBar;