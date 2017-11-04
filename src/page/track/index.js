import React, { Component } from 'react'

import './index.less'
export default class Trands extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
     )
  }
}