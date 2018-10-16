import React, { Component } from 'react'

class Hotel extends Component {
    state = {
        id: null
    }

    //get the hotel id from the link
    componentDidMount() {
        var id = this.props.match.params.hotel_id;
        console.log(id);
        this.setState({
            id: id
        })
        console.log(this.state.id) 
    }


    render() {
        // check if the hotel exists 
        const hotel = this.state.id ? (
            <div> Hotel ID: {this.state.id}</div>
        ) : (
            <div> Hotel is not existed</div>
        )


        return(
            <div> 
                { hotel }
            </div>
        )
    }
}

export default Hotel