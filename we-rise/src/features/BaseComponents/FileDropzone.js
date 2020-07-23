import React, {Component} from 'react'
import {DropzoneAreaBase} from 'material-ui-dropzone'

class Dropzone extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <DropzoneAreaBase
        onChange={this.handleChange.bind(this)}
        />
    )
  }
}

export default Dropzone