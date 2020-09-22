import React, { Component } from "react";
import "./style.less";
class TabQuestionTap extends Component {
  constructor() {
    super();
    this.state = {
			contents:[
				{
					item:5,
				},
				{
					item:6,
				},
				{
					item:7,
				},
				{
					item:8,
				}
			]
		};
  }
  render() {
		const {contents} =this.state
    return (
			<div className="tabquestion-total">
				<div className="tabquestion-content">
					{
						contents.map((v,index)=>{
							return (
								<div key={index}>
								{v.item}
								</div>
							)
						})
					}
				</div>
			</div>
		)
  }
}
export default TabQuestionTap;
