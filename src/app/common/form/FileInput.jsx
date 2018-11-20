import React, { Component } from "react";

class FileInput extends Component {
  state = {
    picture: null,
    pictureUrl: null
  };

  render(id) {
    const { input } = this.props;
    delete input.value;
    return (
      <div>
        <input
          type="file"
          name="photoFile"
          id={id}
          accept=".jpg, .png, .jpeg"
          {...input}
          onChange={event => {
            this.displayPicture(event);
          }}
          style={{
            display: "block"
          }}
        />
        {this.state.pictureUrl && (
          <img
            src={this.state.pictureUrl}
            display="block"
            width="200"
            height="200"
            style={{
              marginTop: "20px"
            }}
            alt=""
          />
        )}
        {/* <img src={this.state.pictureUrl} alt=""/> */}
      </div>
    );
  }

  displayPicture(event) {
    let reader = new FileReader();
    let uploadedImage = event.target.files[0];
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
