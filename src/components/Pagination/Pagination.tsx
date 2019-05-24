import * as React from "react";
import styled from "styled-components";
import Select from "../Select/index";
import { Type3 as Btn } from "../Btn/index";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";

const defaultColor = "#06aea6";
interface PropsSize {
  size?: string;
}
interface WrapProps extends PropsSize {
  defaultStyles?: string;
}
const Wrap = styled.div<WrapProps>`
  display: flex;
  align-items: center;
  line-height: ${props => props.size};
  font-size: 14px;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
    height: ${props => props.size};
  }
  ${props => props.defaultStyles};
`;
const PageItem = styled.span<PropsSize>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  min-width: ${props => props.size};
  cursor: pointer;
  &.active {
    color: ${props => props.theme.mainColor || defaultColor};
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
      color: ${props => props.theme.mainColor || defaultColor};
      letter-spacing: -2px;
      transform: scale(0.8, 1.2);
    }
  }
  &.wjc-fast-jump__next:hover {
    position: relative;
    &::before {
      content: ">>";
      font-size: 12px;
      color: ${props => props.theme.mainColor || defaultColor};
      letter-spacing: -2px;
      transform: scale(0.8, 1.2);
    }
  }
`;
const Left = styled.div<PropsSize>`
  width: ${props => props.size};
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
const Right = styled.div<PropsSize>`
  width: ${props => props.size};
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
    color: ${props => props.theme.mainColor || defaultColor};
  }
`;
const JumpTo = styled.div<PropsSize>`
  display: flex;
  align-items: center;
  margin: 0 10px;
  & > input[type="number"] {
    height: ${props => props.size};
    background: transparent;
    width: ${props => props.size};
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
  line-height: ${props => props.size};
`;
export interface Props {
  className?: string;
  defaultStyles?: string;
  size?: string;
  viewAble?: string[];
  staticStr?: string[];
  total: number;
  pageSize: number;
  onChange?: (currentPage: number, pageSize: number, total: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  siblingViewSize?: number;
  currentPage?: number;
  pageSizeList: number[];
}
interface State {
  jumpToValue: string;
}
class Pagination extends React.PureComponent<Props, State> {
  state = {
    jumpToValue: ""
  };

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
    // const currentPage = value;
    const pageLength = Math.ceil(total / pageSize);

    const pageArr = this.getPageArr(pageLength, siblingViewSize, currentPage);
    return (
      <Wrap
        size={size}
        defaultStyles={defaultStyles}
        className={"wjc-pagination " + className || ""}
      >
        {viewAble.includes("prevNext") && (
          <Left
            size={size}
            onClick={currentPage === 1 ? null : this.goto(currentPage - 1)}
            className={`wjc-page-prev ${currentPage === 1 ? "disable" : ""}`}
          />
        )}
        {viewAble.includes("pageList") &&
          pageArr.map(ele => {
            if (typeof ele == "number") {
              return (
                <PageItem
                  size={size}
                  key={ele}
                  onClick={this.goto(ele)}
                  className={`wjc-page-item ${
                    ele === currentPage ? "active" : ""
                  }`}
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
            onClick={
              currentPage === pageLength ? null : this.goto(currentPage + 1)
            }
            size={size}
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
            className={"wjc-page-size__select"}
            value={pageSize}
            inputRender={({ value }: { value: { label: any } }) =>
              value ? value.label : ""
            }
            options={pageSizeList.map(ele => ({
              label: `${ele}${staticStr[2]}`,
              value: ele
            }))}
            onChange={this.changePageSize}
          />
        )}
        {viewAble.includes("jumpTo") && (
          <JumpTo size={size} className={"wjc-jump-to"}>
            {staticStr[3]}
            <input
              type="number"
              onKeyDown={this.keyDownJumpTo}
              value={this.state.jumpToValue}
              onChange={this.changeJumpToInput}
            />
            {staticStr[4]}
          </JumpTo>
        )}
        {viewAble.includes("submit") && (
          <Submit className={"wjc-jump-to__submit"} onClick={this.submitJumpTo}>
            {staticStr[5]}
          </Submit>
        )}
      </Wrap>
    );
  }
  goto = (page: number) => () => {
    const { onChange } = this.props;
    onChange && onChange(page, this.props.pageSize, this.props.total);
  };
  getPageArr = (
    pageLength: number,
    siblingViewSize: number,
    currentPage: number
  ) => {
    const centerVisibleSize = siblingViewSize * 2 + 1;
    if (pageLength <= centerVisibleSize + 4) {
      // 足够显示所有项目时不显示`...`快速跳转
      return Array(pageLength)
        .fill("")
        .map((ele, index) => index + 1);
    } else {
      const fillArr = (min: number, max: number) => {
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
  changePageSize = (value: number) => {
    const { onPageSizeChange, onChange } = this.props;
    onChange && onChange(this.props.currentPage || 1, value, this.props.total);
    onPageSizeChange && onPageSizeChange(value);
  };
  changeJumpToInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      jumpToValue: e.target.value
    });
  };
  keyDownJumpTo = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    this.goto(Math.min(Math.max(+this.state.jumpToValue, 1), pageLength))();
    this.clearJumpTo();
  };
  clearJumpTo = () => {
    this.setState({
      jumpToValue: ""
    });
  };
}

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
