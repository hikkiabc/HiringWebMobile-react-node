import React, { Component } from 'react'

export default class index extends Component {

  render() {
    console.log(this.props);

    return (
      <div>
        <button onClick={() => this.props.history.go('/')
        }>Go to Home-Page</button>
      </div>
    )
  }
}
