import React, { Component } from "react";
import TabQuestion from "../tabQuestion/index";
import TabQuestionTap from "../tabQuestionTap/index";
import TextFoldingUnfolding from '../../../Textfoldingunfolding/index'
import "./style.less";
//通过有顺序的题目编号寻找对应的提
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
              number: 1,
            },
            {
              number: 2,
            },
            {
              number: 3,
            },
            {
              number: 4,
            },
          ],
        },
        {
          type: 2,
          detail: [
            {
              number: 5,
            },
            {
              number: 6,
            },
            {
              number: 7,
            },
            {
              number: 8,
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
			todoList,
      list,
      listMianData,
      type: listMianData[0].type,
			currentNumber: listMianData[0].detail[0].number,//通过顺序的题号实现
			isLoading:false
    });
  }
  rendertypes = (v) => {
    const { listMianData } = this.state;
    listMianData.map((item, index) => {
      item.detail.map((key, indexs) => {
        if (v == key.number) {
          this.setState({
            type: item.type,
						currentNumber: v,
						isLoading:false,
						examIndex:index
          });
        }
      });
    });
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
		const { currentNumber,todoList } = this.state;
    if (currentNumber == 1 && type == "prev") {
      return;
		} else if (currentNumber == todoList[todoList.length-1].number && type == "next"){
			return
		}
		 var currentNumbers;
    currentNumbers = currentNumber + 1;
    if (type == "prev") {
      currentNumbers = currentNumber - 1;
      this.rendertypes(currentNumbers);
    } else {
      currentNumbers = currentNumber + 1;
      this.rendertypes(currentNumbers);
    }
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
            className={currentNumber == 1 ? "topgray-button" : "top-button"}
            onClick={() => {
              this.current("prev");
            }}
          >
            上一题
          </div>
          <div
            className={currentNumber==todoList[todoList.length-1].number?"topgray-button" : "top-button"}
            onClick={() => {
              this.current("next");
            }}
          >
            下一题
          </div>
        </div>
				{/*题目当前索引和总数*/}
				<div className="tab-count">
					<span>{currentNumber}</span>
					<span>/{todoList.length}</span>
				</div>

        <TextFoldingUnfolding/>
		  </div>
    );
  }
}

export default Tab;
