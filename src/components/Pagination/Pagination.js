import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Select from "../Select";
import { Type3 as Btn } from "../Btn";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
const defaultColor = "#06aea6";
const Wrap = styled.div`
  display: flex;
  align-items: center;
  line-height: ${p => p.themeSize};
  font-size: 14px;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
    height: ${p => p.themeSize};
  }
  ${props => props.defaultStyles};
`;
const PageItem = styled.span`
  display: inline-block;
  padding: 0 8px;
  min-width: ${p => p.themeSize};
  text-align: center;
  cursor: pointer;
  &.active {
    color: ${p => p.theme.mainColor || defaultColor};
  }
  &.wjc-fast-jump__prev,
  &.wjc-fast-jump__next {
    position: relative;
    &::before {
      content: "···";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      font-size: 18px;
      color: #999;
    }
  }
  &.wjc-fast-jump__prev:hover {
    position: relative;
    &::before {
      content: "<<";
      font-size: 12px;
      color: ${p => p.theme.mainColor || defaultColor};
      letter-spacing: -2px;
      transform: scale(0.8, 1.2);
    }
  }
  &.wjc-fast-jump__next:hover {
    position: relative;
    &::before {
      content: ">>";
      font-size: 12px;
      color: ${p => p.theme.mainColor || defaultColor};
      letter-spacing: -2px;
      transform: scale(0.8, 1.2);
    }
  }
`;
const Left = styled.div`
  width: ${p => p.themeSize};
  border: 1px solid #dbdbdb;
  cursor: pointer;
  position: relative;
  &.disable {
    cursor: not-allowed;
  }
  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    margin: auto;
    border-right: 4px solid #ccc;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }
`;
const Right = styled.div`
  width: ${p => p.themeSize};
  border: 1px solid #dbdbdb;
  cursor: pointer;
  position: relative;
  &.disable {
    cursor: not-allowed;
  }
  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0;
    height: 0;
    margin: auto;
    border-left: 4px solid #ccc;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
  }
`;
const Count = styled.div`
  margin: 0 12px;
`;
const SelectPageSize = styled(Select)`
  display: inline-block;
  width: auto;
  padding: 0 28px 0 12px;
  &::after {
    right: 10px;
  }
  li:hover {
    background: #fffbe0;
  }
  li.active {
    color: ${p => p.theme.mainColor || defaultColor};
  }
`;
const SelectPageSizeInputItem = styled.div`
  padding: 10px 4px;
  &:hover {
    background: #fff;
  }
  input {
    height: ${p => p.themeSize};
    background: transparent;
    width: ${p => p.themeSize};
    text-align: center;
    border: 1px solid #dbdbdb;
    margin-right: 5px;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;
const JumpTo = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px;
  & > input[type="number"] {
    height: ${p => p.themeSize};
    background: transparent;
    width: ${p => p.themeSize};
    text-align: center;
    border: 1px solid #dbdbdb;
    margin: 0 7px;
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;
const Submit = styled(Btn)`
  line-height: ${p => p.themeSize};
`;
class Pagination extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "",
      jumpToValue: "",
      pageSizeInput: props.pageSize
    };
  }
  select = null;
  componentWillMount() {
    if (!this.props.pageSize) {
      throw new Error("please set pageSize, 请设置pageSize 或 defaultPageSize");
    }
    if (!this.props.pageSizeList) {
      throw new Error("please set pageSizeList, 请设置pageSizeList");
    }
  }
  render() {
    const {
      className,
      defaultStyles,
      viewAble = [
        "prevNext",
        "pageList",
        "total",
        "pageSizeSelect",
        "jumpTo",
        "submit"
      ],
      staticStr = ["共", "条", "条/页", "跳至", "页", "确定"],
      currentPage = 1,
      siblingViewSize = 2,
      size = "32px",
      total,
      pageSizeList
    } = this.props;
    const { pageSize } = this.props;
    const pageLength = Math.ceil(total / pageSize);
    const pageArr = this.getPageArr(pageLength, siblingViewSize, currentPage);
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={"wjc-pagination " + className || ""}
        themeSize={size}
      >
        {viewAble.includes("prevNext") && (
          <Left
            themeSize={size}
            onClick={currentPage === 1 ? null : this.goto(currentPage - 1)}
            className={`wjc-page-prev ${currentPage === 1 ? "disable" : ""}`}
          />
        )}
        {viewAble.includes("pageList") &&
          pageArr.map(ele => {
            if (typeof ele == "number") {
              return (
                <PageItem
                  key={ele}
                  onClick={this.goto(ele)}
                  className={`wjc-page-item ${
                    ele === currentPage ? "active" : ""
                  }`}
                  themeSize={size}
                >
                  {ele}
                </PageItem>
              );
            }
            return (
              <PageItem
                key={ele}
                onClick={this.goto(
                  ele === "prev"
                    ? currentPage - siblingViewSize * 2 - 1
                    : currentPage + siblingViewSize * 2 + 1
                )}
                title={
                  ele === "prev"
                    ? `前进${siblingViewSize * 2 + 1}页`
                    : `向后${siblingViewSize * 2 + 1}页`
                }
                className={`wjc-fast-jump__${ele}`}
              />
            );
          })}
        {viewAble.includes("prevNext") && (
          <Right
            themeSize={size}
            onClick={
              currentPage === pageLength ? null : this.goto(currentPage + 1)
            }
            className={`wjc-page-next ${
              currentPage === pageLength ? "disable" : ""
            }`}
          />
        )}
        {viewAble.includes("total") && (
          <Count className={"wjc-page-count"}>{`${staticStr[0]}${total}${
            staticStr[1]
          }`}</Count>
        )}
        {viewAble.includes("pageSizeSelect") && (
          <SelectPageSize
            ref={el => (this.select = el)}
            className={"wjc-page-size__select"}
            value={pageSize}
            inputRender={({ option }) =>
              option ? option.label : pageSize + `${staticStr[2]}`
            }
            options={pageSizeList.map(ele => ({
              label: `${ele}${staticStr[2]}`,
              value: ele
            }))}
            onChange={this.changePageSize}
          >
            <SelectPageSizeInputItem themeSize={size}>
              <input
                type="number"
                value={this.state.pageSizeInput}
                onChange={this.changeSelectPageSizeInput}
                onKeyDown={this.changeSelectPageSizekeyDown}
              />
              {staticStr[2]}
            </SelectPageSizeInputItem>
          </SelectPageSize>
        )}
        {viewAble.includes("jumpTo") && (
          <JumpTo className={"wjc-jump-to"} themeSize={size}>
            {staticStr[3]}
            <input
              type="number"
              min="1"
              onKeyDown={this.keyDownJumpTo}
              value={this.state.jumpToValue}
              onChange={this.changeJumpToInput}
            />
            {staticStr[4]}
          </JumpTo>
        )}
        {viewAble.includes("submit") && (
          <Submit
            className={"wjc-jump-to__submit"}
            onClick={this.submitJumpTo}
            themeSize={size}
          >
            {staticStr[5]}
          </Submit>
        )}
      </Wrap>
    );
  }
  goto = page => e => {
    const { onChange } = this.props;
    onChange && onChange(page, this.props.pageSize, this.props.total);
  };
  getPageArr = (pageLength, siblingViewSize, currentPage) => {
    const centerVisibleSize = siblingViewSize * 2 + 1;
    if (pageLength <= centerVisibleSize + 4) {
      // 足够显示所有项目时不显示`...`快速跳转
      return Array(pageLength)
        .fill("")
        .map((ele, index) => index + 1);
    } else {
      const fillArr = (min, max) => {
        return Array(max - min + 1)
          .fill("")
          .map((ele, index) => min + index);
      };

      if (currentPage <= 2 + siblingViewSize) {
        let arr = [
          ...fillArr(
            1,
            Math.max(centerVisibleSize, currentPage + siblingViewSize)
          ),
          "next",
          pageLength
        ];
        return arr;
      }
      if (currentPage >= pageLength - siblingViewSize - 1) {
        let arr = [
          1,
          "prev",
          ...fillArr(
            Math.min(
              pageLength - centerVisibleSize + 1,
              currentPage - siblingViewSize
            ),
            pageLength
          )
        ];
        return arr;
      }
      return [
        1,
        "prev",
        ...fillArr(currentPage - 2, currentPage + 2),
        "next",
        pageLength
      ];
    }
  };
  changePageSize = pageSize => {
    const { onPageSizeChange, onChange } = this.props;
    this.setState({
      pageSizeInput: pageSize
    });
    onChange && onChange(this.props.value || 1, pageSize, this.props.total);
    onPageSizeChange && onPageSizeChange(pageSize);
  };
  changeSelectPageSizeInput = e => {
    const value = e.target.value;
    this.setState({
      pageSizeInput: Math.floor(value)
    });
  };
  changeSelectPageSizekeyDown = e => {
    const { pageSize } = this.props;
    if (e.keyCode === 13) {
      this.changePageSize(Math.max(1, Number(e.target.value)));
    }
    if (e.keyCode === 27) {
      this.setState({
        pageSizeInput: pageSize
      });
    }
  };
  changeJumpToInput = e => {
    this.setState({
      jumpToValue: e.target.value
    });
  };
  keyDownJumpTo = e => {
    if (e.keyCode === 13) {
      this.submitJumpTo();
    }
    if (e.keyCode === 27) {
      this.clearJumpTo();
    }
  };
  submitJumpTo = () => {
    if (this.state.jumpToValue === "") {
      return false;
    }
    const { total } = this.props;
    const { pageSize } = this.props;
    const pageLength = Math.ceil(total / pageSize);
    this.goto(Math.min(Math.max(this.state.jumpToValue, 1), pageLength))();
    this.clearJumpTo();
  };
  clearJumpTo = () => {
    this.setState({
      jumpToValue: ""
    });
  };
}

Pagination.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  size: PropTypes.string,
  viewAble: PropTypes.array,
  staticStr: PropTypes.array,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  siblingViewSize: PropTypes.number,
  currentPage: PropTypes.number,
  pageSizeList: PropTypes.array
};

export default ControllSwitchHoc({
  value: "pageSize",
  onChange: "onPageSizeChange",
  defaultValue: "defaultPageSize"
})(
  ControllSwitchHoc({
    value: "currentPage",
    defaultValue: "defaultCurrentPage"
  })(Pagination)
);
