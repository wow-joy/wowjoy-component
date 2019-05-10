const ARROW_OFFSET = 15;
const ARARROW_WIDTH = 6;
const ARROW_HEIGHT = 5;

function formatPlacement(s) {
  const m = s.match(/[A-Z]/);
  return m ? [s.slice(0, m.index), s.toLowerCase().slice(m.index)] : [s];
}

const placementsMap = ({
  triggerRect: { scrollX, scrollY, width: tWidth, height: tHeight },
  contentRect: { width: cWidth, height: cHeight },
  arrowPointAtCenter
}) => {
  return {
    top() {
      return {
        arrowStyle: `
          top: 100%;
          left: 50%;
          margin-left: -6px;
        `,
        contentOffset: [
          scrollX - (cWidth - tWidth) / 2,
          scrollY - cHeight - ARROW_HEIGHT
        ],
        transformOrigin: [cWidth / 2, cHeight + ARROW_HEIGHT]
      };
    },
    topLeft() {
      return {
        arrowStyle: `
          top: 100%;
          left: ${
            arrowPointAtCenter ? tWidth / 2 - ARARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX, scrollY - cHeight - ARROW_HEIGHT],
        transformOrigin: [
          arrowPointAtCenter ? tWidth / 2 : ARROW_OFFSET + ARARROW_WIDTH,
          cHeight + ARROW_HEIGHT
        ]
      };
    },
    topRight() {
      return {
        arrowStyle: `
          top: 100%;
          right: ${
            arrowPointAtCenter
              ? tWidth / 2 - ARARROW_WIDTH
              : ARROW_OFFSET - ARARROW_WIDTH
          }px;
        `,
        contentOffset: [
          scrollX - (cWidth - tWidth),
          scrollY - cHeight - ARROW_HEIGHT
        ],
        transformOrigin: [
          arrowPointAtCenter
            ? cWidth - tWidth / 2
            : cWidth - ARROW_OFFSET - ARARROW_WIDTH,
          cHeight + ARROW_HEIGHT
        ]
      };
    },
    bottom() {
      return {
        arrowStyle: `
          bottom: 100%;
          left: 50%;
          margin-left: -6px;
        `,
        contentOffset: [
          scrollX - (cWidth - tWidth) / 2,
          scrollY + tHeight + ARROW_HEIGHT
        ],
        transformOrigin: [cWidth / 2, -ARROW_HEIGHT]
      };
    },
    bottomLeft() {
      return {
        arrowStyle: `
          bottom: 100%;
          left: ${
            arrowPointAtCenter ? tWidth / 2 - ARARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX, scrollY + tHeight + ARROW_HEIGHT],
        transformOrigin: [
          arrowPointAtCenter ? tWidth / 2 : ARROW_OFFSET + ARARROW_WIDTH,
          -ARROW_HEIGHT
        ]
      };
    },
    bottomRight() {
      return {
        arrowStyle: `
          bottom: 100%;
          right: ${
            arrowPointAtCenter ? tWidth / 2 - ARARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [
          scrollX - (cWidth - tWidth),
          scrollY + tHeight + ARROW_HEIGHT
        ],
        transformOrigin: [cWidth - ARROW_OFFSET - ARARROW_WIDTH, -ARROW_HEIGHT]
      };
    },
    right() {
      return {
        arrowStyle: `
          right: 100%;
          top: 50%;
          margin-top: -6px;
        `,
        contentOffset: [
          scrollX + tWidth + ARROW_HEIGHT,
          scrollY - (cHeight - tHeight) / 2
        ],
        transformOrigin: [0, cHeight / 2 - ARARROW_WIDTH]
      };
    },
    rightTop() {
      return {
        arrowStyle: `
          right: 100%;
          top: ${
            arrowPointAtCenter ? tHeight / 2 - ARARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX + tWidth + ARROW_HEIGHT, scrollY],
        transformOrigin: [0, arrowPointAtCenter ? tHeight / 2 : ARROW_OFFSET]
      };
    },
    rightBottom() {
      return {
        arrowStyle: `
          right: 100%;
          bottom: ${
            arrowPointAtCenter ? tHeight / 2 - ARARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [
          scrollX + tWidth + ARROW_HEIGHT,
          scrollY + tHeight - cHeight
        ],
        transformOrigin: [
          0,
          arrowPointAtCenter ? tHeight / 2 : cHeight - ARROW_OFFSET
        ]
      };
    },
    left() {
      return {
        arrowStyle: `
          left: 100%;
          top: 50%;
          margin-top: -6px;
        `,
        contentOffset: [
          scrollX - cWidth - ARROW_HEIGHT,
          scrollY + (tHeight - cHeight) / 2
        ],
        transformOrigin: [cWidth, cHeight / 2 - ARARROW_WIDTH]
      };
    },
    leftTop() {
      return {
        arrowStyle: `
          left: 100%;
          top: ${
            arrowPointAtCenter ? tHeight / 2 - ARARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX - cWidth - ARROW_HEIGHT, scrollY],
        transformOrigin: [
          cWidth,
          arrowPointAtCenter ? tHeight / 2 : ARROW_OFFSET
        ]
      };
    },
    leftBottom() {
      return {
        arrowStyle: `
          left: 100%;
          bottom: ${
            arrowPointAtCenter ? tHeight / 2 - ARARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [
          scrollX - cWidth - ARROW_HEIGHT,
          scrollY + tHeight - cHeight
        ],
        transformOrigin: [
          cWidth,
          arrowPointAtCenter ? tHeight / 2 : cHeight - ARROW_OFFSET
        ]
      };
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
  let [direction, conetntDirection] = formatPlacement(placement);
  return ({ triggerRect, contentRect }) => {
    let newPlacement = placement;
    let newDirection = direction;
    let newConetntDirection = conetntDirection;
    if (autoAdjustOverflow) {
      [newDirection, newConetntDirection] = reverseDirection(
        [direction, conetntDirection],
        {
          triggerRect,
          contentRect
        }
      );
      newPlacement = `${newDirection}${
        newConetntDirection
          ? newConetntDirection.replace(/\w/, m => m.toUpperCase())
          : ""
      }`;
    }
    const getPlacement = placementsMap({
      triggerRect,
      contentRect,
      arrowPointAtCenter
    })[newPlacement];
    const currentPlacement = getPlacement();
    const leftOrTop = newDirection === "left" || newDirection === "top";
    return {
      ...currentPlacement,
      borderDerectionClass: newDirection,
      arrowStyle: `${
        currentPlacement.arrowStyle
      }filter: drop-shadow(${shadowOffset[newDirection].join(
        " "
      )} 1px rgba(0, 0, 0, 0.1));`,
      popBoxStyle: `margin-${gapMap[newDirection]}: ${
        leftOrTop ? "-5px" : "5px"
      };`,
      transformOrigin: currentPlacement.transformOrigin
        .map(a => a + "px")
        .join(" ")
    };
  };
};
