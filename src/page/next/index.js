import React, { Component } from 'react'
import {Link} from 'react-router'
import Header from '../common/header/header'
import { URL_PATH } from '../../conf'

export default class Trands extends Component {
  render() {
    return (
      <div>
        <Header path={URL_PATH}/>
        <div className = "App">
          <Link to={`${URL_PATH}/historyList`} className="rightList_right">
            <div>历史成交</div>
            <div className="img_div"><img src={require('../img/right.png')}/></div>
          </Link>
          <Link to={`${URL_PATH}/rule`}className="rightList_right">
            <div>活动规则</div>
            <div className="img_div"><img src={require('../img/right.png')}/></div>
          </Link>
        </div>
      </div>
      
    )
  }
}