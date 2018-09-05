import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import Select from "../Select";
const Wrap = styled.div`
  display: flex;
  align-items: center;
  line-height: ${p => p.theme.size};
  font-size: 14px;
  & > * {
    flex-grow: 0;
    flex-shrink: 0;
    height: ${p => p.theme.size};
  }
  ${props => props.defaultStyles};
`;
const PageItem = styled.span`
  display: inline-block;
  width: ${p => p.theme.size};
  text-align: center;
`;
const Left = styled.div`
  width: ${p => p.theme.size};
  border: 1px solid #dbdbdb;
`;
const Right = styled.div`
  width: ${p => p.theme.size};
  border: 1px solid #dbdbdb;
`;
const Count = styled.div``;
const SelectPageSize = styled(Select)`
  display: inline-block;
  width: auto;
  padding: 0 28px 0 12px;
  &::after {
    right: 10px;
  }
  li.active {
    background: #fffbe0;
  }
`;
const JumpTo = styled.div`
  margin: 0 10px;
  & > input {
    background: transparent;
    width: ${p => p.theme.size};
    text-align: center;
    border: 1px solid #dbdbdb;
    margin: 0 7px;
  }
`;
const Submit = styled.div``;
class Pagination extends PureComponent {
  state = {
    currentPage: ""
  };
  SubmitText = "确定";
  goto = page => e => {
    // this.props.onChange(page);
    console.log(page);
  };

  render() {
    const {
      className,
      defaultStyles,
      children,
      currentPage = 5,
      fastJumpSize = 2,
      size,
      total,
      pageSize
    } = this.props;
    const pageLength = Math.ceil(total / pageSize);
    const pageArr = this.getPageArr(pageLength, fastJumpSize, currentPage);
    console.log(pageArr);
    return (
      <ThemeProvider theme={{ size: size }}>
        <Wrap defaultStyles={defaultStyles} className={className}>
          <Left onClick={this.goto(currentPage - 1)} />
          {pageArr.map(ele => {
            if (typeof ele == "number") {
              return (
                <PageItem key={ele} onClick={this.goto(ele)}>
                  {ele}
                </PageItem>
              );
            }
            return <PageItem key={ele}>...</PageItem>;
          })}
          <Right onClick={this.goto(currentPage + 1)} />
          <Count>共{total}条</Count>
          <SelectPageSize
            defaultValue={10}
            inputRender={({ value }) => (value ? value.label : "")}
            options={[5, 10, 20, 30].map(ele => ({
              label: `${ele}条/页`,
              value: ele
            }))}
          />
          <JumpTo>
            跳至<input defaultValue={1} />页
          </JumpTo>
          <Submit>{this.SubmitText}</Submit>
        </Wrap>
      </ThemeProvider>
    );
  }

  getPageArr = (pageLength, fastJumpSize, currentPage) => {
    const centerVisibleSize = fastJumpSize * 2 + 1;
    if (pageLength <= centerVisibleSize + 4) {
      // 足够显示所有项目时不显示`...`快速跳转
      return Array(pageLength)
        .fill("")
        .map((ele, index) => index + 1);
    } else {
      const centerArr = [];
      const fillArr = (min, max) => {
        return Array(max - min + 1)
          .fill("")
          .map((ele, index) => min + index);
      };

      if (currentPage <= 2 + fastJumpSize) {
        let arr = [
          ...fillArr(
            1,
            Math.max(centerVisibleSize, currentPage + fastJumpSize)
          ),
          "next",
          pageLength
        ];
        return arr;
      }
      if (currentPage >= pageLength - fastJumpSize - 1) {
        let arr = [
          1,
          "prev",
          ...fillArr(
            Math.min(
              pageLength - centerVisibleSize + 1,
              currentPage - fastJumpSize
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
  onChange = () => {};
}

Pagination.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  currentPage: PropTypes.number,
  size: PropTypes.string,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number
};
export default Pagination;
