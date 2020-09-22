import React, { Component } from "react";
import "./style.less";
class TabQuestion extends Component {
  constructor() {
    super();
    this.state = {
			contents:[
				{
					item:1,
				},
				{
					item:2,
				},
				{
					item:3,
				},
				{
					item:4,
				},
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
export default TabQuestion;
