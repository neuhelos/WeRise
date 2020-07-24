import React from 'react'
import { DropzoneArea } from 'material-ui-dropzone'

import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides: {
        MuiDropzoneArea: {
            root: {
                minHeight: '150px',
                backgroundColor: '#F5F5F5',
            },
            text: {
                fontSize: '1rem'
            }
        }
    }
})

const Dropzone = ({handleImageChange}) => {

    //const classes = useStyles()

    return (

        <MuiThemeProvider theme={theme}>
            <DropzoneArea
                acceptedFiles={['image/*']}
                onChange={handleImageChange}
                dropzoneText={"Select Your Workshop Image"}
                filesLimit={1}
                previewGridProps={{container: {justify: 'center'}}}
            />
        </MuiThemeProvider>
    )
}

export default Dropzone