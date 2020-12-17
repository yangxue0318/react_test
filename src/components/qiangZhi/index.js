import React,{Component} from 'react'
import './style.less'
import sky from './image/sky.jpg'
import sun from './image/timg.gif'
class Qianzhi extends Component{
    render(){
        return (
            <div className="qiang-boll">
							<div className="top-call">
								<img src={sky} className="top-boll-sky"/>
								<img src={sun} className="top-boll-sun"/>
							</div>
						</div>
        )
    }
}
export default Qianzhi