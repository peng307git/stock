import React from 'react'
import './modal.less'
export default class Modal extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.myclose = this.myclose.bind(this)
        this.submit = this.submit.bind(this)
    }
    myclose(){
        this.props.close(false)
    }
    submit(){
        this.props.ok_submit();
    }
    render() {
        let data = this.props.data
        console.log(this.props.data);
        return (
            <div className="modal">
                <div className="posi">
                    <h6>{data.title}</h6>
                    
                        {
                            data.action ? (
                                <div className="bodys action_text">
                                    {data.action}
                                </div>
                            ):(
                                <div className="bodys">
                                <div className="left">
                                    <div className="top10">名称 <div className="huoqu">{data.name}</div></div>
                                    <div>数量 <div className="huoqu">{data.qty}</div></div>
                                </div>
                                <div className="right">
                                    <div className="top10">持仓单号 <div className="huoqu">{data.hdorid}</div></div>
                                    <div>价格 <div className="huoqu">{data.orprice}</div></div>
                                </div>
                                </div>
                            )
                        }
                        
                    
                    <div className="btn_warp">
                        <div onClick={this.submit} className="color129">确定</div>
                        <div onClick={this.myclose} className="close">取消</div>
                    </div>
                </div>
            </div>
        );
    }
}