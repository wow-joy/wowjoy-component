import * as React from "react";
import styled from "styled-components";

export const StyledTrack = styled.div.attrs<{ positionStyle: React.CSSProperties }>(props => ({
  style: props.positionStyle
}))<{ vertical?: boolean; positionStyle: React.CSSProperties }>`
  position: absolute;
  ${p => (p.vertical ? `width: 4px;` : `height: 4px;`)}
  background-color: #91d5ff;
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

interface Props {
  className: string;
  vertical: boolean;
  offset: number;
  length: number;
}

const Track = (props: Props) => {
  const { className, vertical, offset, length } = props;

  const positionStyle = vertical
    ? {
        bottom: `${offset}%`,
        height: `${length}%`
      }
    : {
        left: `${offset}%`,
        width: `${length}%`
      };

  return (
    <StyledTrack
      className={`wjc-slider-track ${className || ""}`}
      positionStyle={positionStyle}
      vertical={vertical}
      {...{ vertical, length }}
    />
  );
};

export default Track;
