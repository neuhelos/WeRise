import React, { useState } from 'react'

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField'

import CategoryDropdown from './WorkshopCategoryDropdown'
import Input from '../BaseComponents/Input'
import { useInput, useSelect } from '../../Utilities/CustomHookery'

const AddWorkshop = () => {
    return (
        <Container maxWidth="sm">
            <TextField id="filled-basic" label="Title" variant="filled" />
        <CategoryDropdown />
      </Container>
    )
}

export default AddWorkshop;





// - Workshop Category (Checkbox Dropdown)
// - Workshop Description
// - Skills Being Taught (Input Field Hashtag-Like)
// - Calendar Date
// - Start and End Time