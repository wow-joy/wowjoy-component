function formatPlacement(placement) {
  return placement
    .replace(/([a-z])([A-Z])/, "$1-$2")
    .toLowerCase()
    .split("-");
}

const placementsMap = ({
  triggerRect: { x, y, width: tWidth, height: tHeight },
  contentRect: { width: cWidth, height: cHeight },
  arrowPointAtCenter
}) => {
  return {
    top: {
      arrowStyle: `
        top: 100%;
        left: 50%;
        margin-left: -6px;
      `,
      contentOffset: [x - (cWidth - tWidth) / 2, y - cHeight - 5],
      transformOrigin: [cWidth / 2, cHeight + 5]
    },
    topLeft: {
      arrowStyle: `
        top: 100%;
        left: ${arrowPointAtCenter ? tWidth / 2 - 6 : 15}px;
      `,
      contentOffset: [x, y - cHeight - 5],
      transformOrigin: [arrowPointAtCenter ? tWidth / 2 : 15 + 6, cHeight + 5]
    },
    topRight: {
      arrowStyle: `
        top: 100%;
        right: ${arrowPointAtCenter ? tWidth / 2 - 6 : 15 - 6}px;
      `,
      contentOffset: [x - (cWidth - tWidth), y - cHeight - 5],
      transformOrigin: [
        arrowPointAtCenter ? cWidth - tWidth / 2 : cWidth - 15 - 6,
        cHeight + 5
      ]
    },
    bottom: {
      arrowStyle: `
        bottom: 100%;
        left: 50%;
        margin-left: -6px;
      `,
      contentOffset: [x - (cWidth - tWidth) / 2, y + tHeight + 5],
      transformOrigin: [cWidth / 2, -5]
    },
    bottomLeft: {
      arrowStyle: `
        bottom: 100%;
        left: ${arrowPointAtCenter ? tWidth / 2 - 6 : 15}px;
      `,
      contentOffset: [x, y + tHeight + 5],
      transformOrigin: [arrowPointAtCenter ? tWidth / 2 : 15 + 6, -5]
    },
    bottomRight: {
      arrowStyle: `
        bottom: 100%;
        right: ${arrowPointAtCenter ? tWidth / 2 - 6 : 15}px;
      `,
      contentOffset: [x - (cWidth - tWidth), y + tHeight + 5],
      transformOrigin: [cWidth - 15 - 6, -5]
    },
    right: {
      arrowStyle: `
        right: 100%;
        top: 50%;
        margin-top: -6px;
      `,
      contentOffset: [x + tWidth + 5, y + (tHeight - cHeight) / 2],
      transformOrigin: [0, cHeight / 2 - 6]
    },
    rightTop: {
      arrowStyle: `
        right: 100%;
        top: ${arrowPointAtCenter ? tHeight / 2 - 6 : 15}px;
      `,
      contentOffset: [x + tWidth + 5, y],
      transformOrigin: [0, arrowPointAtCenter ? tHeight / 2 : 15]
    },
    rightBottom: {
      arrowStyle: `
        right: 100%;
        bottom: ${arrowPointAtCenter ? tHeight / 2 - 6 : 15}px;
      `,
      contentOffset: [x + tWidth + 5, y + tHeight - cHeight],
      transformOrigin: [0, arrowPointAtCenter ? tHeight / 2 : cHeight - 15]
    },
    left: {
      arrowStyle: `
        left: 100%;
        top: 50%;
        margin-top: -6px;
      `,
      contentOffset: [x - cWidth - 5, y + (tHeight - cHeight) / 2],
      transformOrigin: [cWidth, cHeight / 2 - 6]
    },
    leftTop: {
      arrowStyle: `
        left: 100%;
        top: ${arrowPointAtCenter ? tHeight / 2 - 6 : 15}px;
      `,
      contentOffset: [x - cWidth - 5, y],
      transformOrigin: [cWidth, arrowPointAtCenter ? tHeight / 2 : 15]
    },
    leftBottom: {
      arrowStyle: `
        left: 100%;
        bottom: ${arrowPointAtCenter ? tHeight / 2 - 6 : 15}px;
      `,
      contentOffset: [x - cWidth - 5, y + tHeight - cHeight],
      transformOrigin: [cWidth, arrowPointAtCenter ? tHeight / 2 : cHeight - 15]
    }
  };
};

const gapMap = {
  left: "left",
  right: "left",
  top: "top",
  bottom: "top"
};
const shadowOffset = {
  left: ["1px", 0],
  right: ["-1px", 0],
  top: [0, "1px"],
  bottom: [0, "-1px"]
};
const reverse = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top"
};

function reverseDirection(
  [direction, conetntDirection],
  {
    triggerRect: { x, y, width: tWidth, height: tHeight },
    contentRect: { width: cWidth, height: cHeight }
  }
) {
  if (
    (direction === "left" && cWidth > x - 10) ||
    (direction === "right" && cWidth + tWidth + x > window.innerWidth - 10) ||
    (direction === "top" && cHeight > y - 10) ||
    (direction === "bottom" && cHeight + tHeight + y > window.innerHeight - 10)
  ) {
    direction = reverse[direction];
  }
  if (
    (conetntDirection === "left" && cWidth + x > window.innerWidth - 10) ||
    (conetntDirection === "right" && cWidth > x + tWidth) ||
    (conetntDirection === "top" && cHeight + y > window.innerHeight) ||
    (conetntDirection === "bottom" && cHeight > tHeight + y)
  ) {
    conetntDirection = reverse[conetntDirection];
  }
  return [direction, conetntDirection];
}

export default (placement, { autoAdjustOverflow, arrowPointAtCenter }) => {
  return ({ triggerRect, contentRect }) => {
    let item = placementsMap({ triggerRect, contentRect, arrowPointAtCenter })[
      placement
    ];
    let [direction, conetntDirection] = formatPlacement(placement);
    let newPlacement = placement;

    if (autoAdjustOverflow) {
      [direction, conetntDirection] = reverseDirection(
        [direction, conetntDirection],
        {
          triggerRect,
          contentRect
        }
      );
      newPlacement = `${direction}${
        conetntDirection
          ? conetntDirection.replace(/\w/, m => m.toUpperCase())
          : ""
      }`;
      item = placementsMap({ triggerRect, contentRect, arrowPointAtCenter })[
        newPlacement
      ];
    }

    const leftOrTop = direction === "left" || direction === "top";
    return {
      ...item,
      borderDerectionClass: direction,
      arrowStyle: `${item.arrowStyle}filter: drop-shadow(${shadowOffset[
        direction
      ].join(" ")} 1px rgba(0, 0, 0, 0.1));`,
      popBoxStyle: `margin-${gapMap[direction]}: ${
        leftOrTop ? "-5px" : "5px"
      };`,
      transformOrigin: item.transformOrigin.map(a => a + "px").join(" ")
    };
  };
};
