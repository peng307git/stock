import React from 'react'
import './index.less'
import Info from '../common/info/index';
import TradeList from '../common/tradeList';
import Header from '../common/header/header'

export default class Account extends React.Component {
    constructor(props){
    super(props)
    this.state = {
      info:{
        total:9999.00,
        totaltages:-23.89,
        cantages:98,
        yingkui:98982,
        totalnum:987654,
        paiming:199,
        shizhi:12345678,
        totalmony:9898989,
        renqi:111
      },
      tradelist:[
        {
          name:"万达集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:987,
          bili:-76.00
        },
        {
          name:"苹果集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:987,
          bili:99.00
        },
        {
          name:"三星集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:-987,
          bili:-76.00
        },,
        {
          name:"苹果集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:987,
          bili:99.00
        },
        {
          name:"三星集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:-987,
          bili:-76.00
        },
        {
          name:"苹果集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:987,
          bili:99.00
        },
        {
          name:"三星集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:-987,
          bili:-76.00
        },{
          name:"苹果集团",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:987,
          bili:99.00
        },
        {
          name:"安布雷拉",
          total:98765432.12,
          mony:3.88,
          mony_1:9.88,
          num:1800,
          num_1:1800,
          yingkui:-987,
          bili:-76.00
        }
      ]
    }
  }
  
    render() {
      let {pathnext} = this.props.location.state;
        return (
          <div>
            <Header path={pathnext}/>
            <div className="App">
                <Info {...this.state}/>
                <TradeList {...this.state}/>
            </div>
          </div>
           
        );
    }
}