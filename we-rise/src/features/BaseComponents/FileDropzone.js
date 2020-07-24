import React, {Component} from 'react'
import { DropzoneArea } from 'material-ui-dropzone'


const Dropzone = ({handleImageChange}) => {

    return (

        <DropzoneArea
            acceptedFiles={['image/*']}
            onChange={handleImageChange}
            dropzoneText={"Select Your Workshop Image"}
            filesLimit={1}
            previewGridProps={{container: {justify: 'center'}}}
            />
    )
}

export default Dropzone