import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiDropzoneArea: {
            root: {
                minHeight: '100px',
                backgroundColor: '#F5F5F5',
                marginBottom: '0.5rem'
            },
            text: {
                fontSize: '1rem'
            }
        }
    }
})

const Dropzone = ({ handleImageChange, dropzoneText }) => {

    return (

        <MuiThemeProvider theme={theme}>
            <DropzoneArea
                acceptedFiles={['image/*']}
                onChange={handleImageChange}
                dropzoneText={dropzoneText}
                filesLimit={1}
                previewGridProps={{container: {justify: 'center'}}}
            />
        </MuiThemeProvider>
    )
}

export default Dropzone