import React, { Component } from "react";
import {message} from 'antd'
import { Editor, } from "react-draft-wysiwyg";
import {convertToRaw, ContentState,EditorState}from 'draft-js'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "./style.less";

class RichTextEditor extends Component {
	constructor(){
		super()
		this.state={
			editorState: EditorState.createEmpty(),
			//editorState: '',两种方法都可以
		}
	}
	onEditorStateChange=(editorState)=>{
		this.setState({
			editorState,
		})
	}
	formSubmit=()=>{
		var editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))//格式进行转换
	}
	uploadImageCallBack=(file)=>{
		return new Promise(
			(resolve, reject) => {
				let formData = new FormData()
				formData.append('file', file)
				let subsystemTourInfo = JSON.parse(localStorage.getItem('subsystemTourInfo')) || {}
				fetch('http://localhost:3000', {
					method: 'POST',
					headers: {
					'store-user-token':subsystemTourInfo.token
					},
					body: formData,
				}).then(res => {
					return res.json()
				}).then(res => {
					if (res.err !== 0) {
						message.error('图片上传失败', 2)
						reject(res)
					} else {
						resolve({data: {link: res.fileId}})
					}
	
				}).catch(err => {
					reject(err)
				})
			 }
		)
	}
  render() {
		const {editorState}=this.state
    return (
      <div>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
					onEditorStateChange={this.onEditorStateChange}
					toolbar={{
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
              uploadCallback:this.uploadImageCallBack,
              previewImage: true,
              inputAccept: 'image/*',
              alt: {present: false, mandatory: false,previewImage: true}
            },
          }}
        />
				<div onClick={this.formSubmit}>提交</div>
      </div>
    );
  }
}
export default RichTextEditor;
