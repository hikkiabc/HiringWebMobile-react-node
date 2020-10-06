import React, { Component } from 'react'
import { resetUpdate } from '../../../redux/actions'
import { connect } from 'react-redux'

class employer extends Component {

  componentWillMount() {
    this.props.resetUpdate()
  }
  render() {
    return (
      <div>
        employer
      </div>
    )
  }
}
export default connect(state => state, { resetUpdate })(employer)