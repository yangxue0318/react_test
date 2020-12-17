import React, { Component } from 'react'
import { Button } from 'antd'
import copy from 'copy-to-clipboard';
import QRCode from 'qrcode.react'
class Ercode extends Component {
	state = {
		ahref: "https://www.baidu.com/s?tn=02003390_43_hao_pg&isource=infinity&iname=baidu&itype=web&ie=utf-8&wd=react%E5%A4%8D%E5%88%B6%E5%89%8D%E7%AB%AF%E9%93%BE%E6%8E%A5",
		erwe: 'https://wanmi-b2b.oss-cn-shanghai.aliyuncs.com/202012161057152592.jpg'
	}
	//使用方法
	copyUrl = () => {
		copy(this.state.ahref);
	}
	downloadCode=()=>{
		var Qr=document.getElementById('qrCode');  
		console.log(Qr)
		let image = new Image();
		image.src = Qr.toDataURL("image/png");
		var a_link=document.getElementById('aId');
		a_link.href=image.src;
	}
	render() {
		var miniProgramUrl = this.state.erwe;

		return (
			<div>
				<span>{this.state.ahref}</span>
				<QRCode
								id="qrCode"
								value={this.state.erwe}
								size={200} // 二维码的大小
								fgColor="#000000" // 二维码的颜色
								style={{ margin: 'auto' }}
								// imageSettings={{ // 二维码中间的logo图片
								// 		src: image,
								// 		height: 60,
								// 		width: 60,
								// 		excavate: true, // 中间图片所在的位置是否镂空
								// }}
      />   	
				<Button onClick={this.copyUrl}>复制</Button>	
				<a onClick={this.downloadCode} download id='aId'>下载</a>
		</div>
		)
	}
}
export default Ercode