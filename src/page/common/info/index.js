import React from 'react';

import './index.less'

export default class Info extends React.Component {
    constructor(props){
        super(props)
    }
    componentDidMount (){
    }
    render() {
        let account = this.props.infos;
        return (
                this.props.infos ? (
                    <div className="info_main">
                <div className="left">
                    <div className="top">
                        总盈亏
                        <div className= {`totalnumber ${account.zong > 0 ? 'redcolor' : 'greencolor'}`} > 
                            {account.zong > 0 ? '+' + account.zong : account.zong}
                        </div>
                        <div className={`totaltages ${account.newzong > 0 ? 'redcolor' : 'greencolor'}`}>{}%</div>
                    </div>
                    <div className="foot">
                         仓位
                         <div className="cantages">{account.changwei}%</div>
                    </div>
                </div>
                <div className="content">
                    当日盈亏
                    <div className={`number ${account.newzong > 0 ? 'redcolor' : 'greencolor'}`}> 
                        {account.newzong > 0 ? '+' + account.newzong : account.newzong} 
                    </div>
                    可用资金
                    <div>{account.fmg}</div>
                    大赛排名
                    <div>{account.pvbe}</div>
                </div>
                <div className="right">
                    持有市值
                    <div>{account.shizhi}</div>
                    总资产
                    <div>{account.total_mony}</div>
                    订阅人气
                    <div>{account.pvbe}</div>
                </div>
            </div> ):(
                    <div></div>
                )
            );
        }
            
       
}