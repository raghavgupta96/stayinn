import React, { Component } from "react";

class FileInput extends Component {
    state = {
        picture: null,
        pictureUrl: null
    }


  render() {
    const { input } = this.props;
    delete input.value;
    return (
    <div>
        <input
        type="file"
        {...input}
        onChange={event => {
          this.displayPicture(event);
        }}/>
        {this.state.pictureUrl && <img src={this.state.pictureUrl} width="200" height="200" alt=""/>}
    </div>
    )
  }

  

  displayPicture(event)
  {
      let reader = new FileReader();
      let uploadedImage = event.target.files[0]
      console.log(uploadedImage);
      reader.onloadend = () => {
          this.setState({
              picture: uploadedImage,
              pictureUrl: reader.result
          });
      };
      reader.readAsDataURL(event.target.files[0]);
  }

}



export default FileInput;
