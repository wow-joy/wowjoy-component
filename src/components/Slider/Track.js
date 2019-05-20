import React from "react";
import styled from "styled-components";

const StyledTrack = styled.div`
  position: absolute;
  ${p => (p.vertical ? `width: 4px;` : `height: 4px;`)}
  background-color: #91d5ff;
  border-radius: 4px;
  transition: background-color 0.3s ease;
`;

const Track = props => {
  const { className, included, vertical, offset, length } = props;

  const positonStyle = vertical
    ? {
        bottom: `${offset}%`,
        height: `${length}%`
      }
    : {
        left: `${offset}%`,
        width: `${length}%`
      };

  return included ? (
    <StyledTrack
      className={`wjc-slider-track ${className || ""}`}
      style={positonStyle}
      vertical={vertical}
      {...{ vertical, length }}
    />
  ) : null;
};

export default Track;
