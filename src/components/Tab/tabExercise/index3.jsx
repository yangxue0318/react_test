import React, { Component } from "react";
import TabQuestion from "../tabQuestion/index";
import TabQuestionTap from "../tabQuestionTap/index";
import "./style.less";
//题号不固定，按下标找对应的值
class Tab extends Component {
  constructor() {
    super();
    this.state = {
			isLoading:true,
      currentNumber: "1",
			list: [],
			todoList:[],
      type: "",
      examIndex: 0,
      listMianData: [],
      questionTypeList: [
        {
          type: 1,
          detail: [
            {
              number: 11,
            },
            {
              number: 22,
            },
            {
              number: 31,
            },
            {
              number: 42,
            },
          ],
        },
        {
          type: 2,
          detail: [
            {
              number: 25,
            },
            {
              number: 36,
            },
            {
              number: 47,
            },
            {
              number: 28,
            },
          ],
        },
      ],
    };
  }
  componentDidMount() {
    const { questionTypeList } = this.state;
    //数组去重，并将所有去重完的数组进行合并
    const listMianData = questionTypeList.map((item) => {
      item.detail.reduce((prev, next) => {
        return prev.concat(next.number);
      }, []);
      return item;
    });
    const list = questionTypeList.map((item) => {
      item.detail.reduce((prev, next) => {
        return prev.concat(next);
      }, []);
      return item.detail;
    });
    const todoList = list.reduce((prev, next) => {
      return prev.concat(next);
    });
    this.setState({
      examIndex:0,
			todoList,
      list,
      listMianData,
      type: listMianData[0].type,
      currentNumber: listMianData[0].detail[0].number,//通过顺序的题号实现
			isLoading:false
    });
  }
  rendertypes = (v) => {
    const { listMianData,	todoList, } = this.state;
    listMianData.map((item, index) => {
      item.detail.map((key, indexs) => {
        if (v == key.number) {
          this.setState({
            type: item.type,
						currentNumber: v,
						isLoading:false,
            
          });
        }
      });
    });
    todoList.map((itemsd,index)=>{
      if(itemsd.number==v){
        this.setState({
          examIndex:index
        })
      }
    })

  };
  renderQuestionType = () => {
    const activeType = this.state.type;
    switch (activeType) {
      case 1:
        return <TabQuestion />;
      case 2:
        return <TabQuestionTap />;
    }
	};
  current = (type) => {
    const { currentNumber,todoList,examIndex } = this.state;
    if (examIndex == 0 && type == "prev") {
      return;
		} else if (examIndex == [todoList.length-1] && type == "next"){
			return
		}
		 var examIndexs;
    if (type == "prev") {
      examIndexs = examIndex - 1;
      this.rendertypes(todoList[examIndexs].number);
    } else {
      examIndexs = examIndex + 1;
  
      this.rendertypes(todoList[examIndexs].number);
    }
    this.setState({
      examIndex:examIndexs
    })
  };
  render() {
    const { questionTypeList, currentNumber,todoList,isLoading,examIndex } = this.state;
    return (
			isLoading?'isLoading.......':
      <div className="tab-total">
        {/*列表左侧布局*/}
        <div className="tab-left-tab">
          {questionTypeList.map((item, index) => {
            return (
              <div key={index}>
                <div className="text-btn">
                  {item.type == 1 ? "单选题" : null}
                  {item.type == 2 ? "多选题" : null}
                </div>
                <div className="tab-number">
                  {item.detail.map((v, keys) => {
                    return (
                      <div
                        key={keys}
                        className={
                          currentNumber != v.number ? "tab-card" : "card-tab"
                        }
                        onClick={() => {
                          this.rendertypes(v.number);
                        }}
                      >
                        {v.number}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {/*列表右上侧布局*/}
        <div className="tab-right-question">{this.renderQuestionType()}</div>
        <div className="tst-btn">
          <div
            className={examIndex == 0 ? "topgray-button" : "top-button"}
            onClick={() => {
              this.current("prev");
            }}
          >
            上一题
          </div>
          <div
            className={examIndex==todoList.length-1?"topgray-button" : "top-button"}
            onClick={() => {
              this.current("next");
            }}
          >
            下一题
          </div>
        </div>
				{/*题目当前索引和总数*/}
				<div className="tab-count">
					<span>{examIndex+1}</span>
					<span>/{todoList.length}</span>
				</div>
		  </div>
    );
  }
}

export default Tab;
