import { Component } from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
      // if we move to another component
      // this fuction will be called   
      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
  
    // all react component has children
    // children will be passed to index.js
    render() {
      return this.props.children
    }
  }
  
  export default withRouter(ScrollToTop)