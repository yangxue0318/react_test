import React,{Component} from 'react'
import './style.less'
//文本的展开与收起
class TextFoldingUnfolding extends Component{
	constructor(){
		super()
		this.state={
			contents:'百度翻译依托互联网数据资源和自然语言处理技术优势，致力于帮助用户跨越语言鸿沟，方便快捷地获取信息和服务。',
			isShow:false,
		}
	}
	textFolding=(content)=>{
		let str=""
		if(content.length>20){
			str=content.substring(0,20)+'.......'
		}
		return str
	}
	onShowOrClose=()=>{
		const {isShow}=this.state
		this.setState({
			isShow:!isShow
		})
	}
    render(){
			const {contents,isShow}=this.state
        return (
            <div className="text-folding">
							<p>
							<span>{isShow?contents:this.textFolding(contents)}</span>	
							<span onClick={this.onShowOrClose} style={{color:'greenyellow'}}>{isShow?'收起':'展开'}</span>
							</p>
						</div>
        )
    }
}
export default TextFoldingUnfolding