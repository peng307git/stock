import React from 'react'
import './index.less'

export default class ListDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.chexiao = this.chexiao.bind(this);
    }
    componentDidMount = () => {
       
    }
    
    chexiao() {
        alert("发送撤销请求");
    }
    render() {
        return (
            <div>
                {
                    !this.props.list ? (
                        <div className="props_none">
                            <img src={ require('../../img/trade_1.png') }/>
                            <div>{this.props.tip_title}</div>
                        </div>
                    ): (
                            this.props.list.map((item, i) => {
                                return (
                                    <div className="list_main" key={i}>
                                        <div className={`top top_${item.status}`}>
                                            <div className="top_div">
                                                <div className="div_1">
                                                    {
                                                        item.ocflag == 1 ? (
                                                            <strong className="mairu">买入</strong>
                                                        ):(
                                                            <strong className="maichu">卖出</strong>
                                                        )
                                                    }
                                                    <div>{item.name}</div>
                                                    <span>{item.symbol}</span>
                                                </div>
                                                <div className="div_2">   
                                                    {
                                                        item.teqty > 1 ? ( /* 成交数量 大于1 就无法再进行撤销 */
                                                            item.teqty == item.qty ? (  /* 成交数量 == qty委托数量 */
                                                                <span className='btn'> 全部成交</span>
                                                            ):(
                                                                <span className='btn'> 部分成交</span>
                                                            )
                                                        ):(
                                                            
                                                            <span onClick={this.chexiao} className={`btn_1`}>撤销</span>
                                                        )
                                                    }

                                                </div>
                                            </div>
                                            <div className="top_div_1">
                                                <span>{item.ontime}</span> 合同号 <span>{item.ltorid}</span>
                                            </div>
                                        </div>
                                        <div className="foot">
                                            <div className="foot_top">
                                                <div>已成交／委托量</div>
                                                <div>委托价</div>
                                                <div>成交价</div>
                                            </div>
                                            <div className="foot_foot">
                                                <div>{item.teqty}/{item.qty}</div>
                                                <div>{item.ltprice}</div>
                                                <div>{item.teprice}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    )
                }
            </div>
        );
    }
}