interface InitParams {
  contentNode: HTMLElement;
  slideNode: HTMLElement;
  wrapSize: number;
  contentSize: number;
  sliderSize: number;
  isY: boolean;
}
class initAxis {
  private contentNode: HTMLElement;
  private slideNode: HTMLElement;
  private wrapSize: number;
  private contentSize: number;
  private sliderSize: number;
  private isY: boolean;

  constructor({
    contentNode,
    slideNode,
    wrapSize,
    contentSize,
    sliderSize,
    isY = true
  }: InitParams) {
    this.contentNode = contentNode;
    this.slideNode = slideNode;
    this.wrapSize = wrapSize;
    this.contentSize = contentSize;
    this.sliderSize = sliderSize;
    this.isY = isY;
  }
  private startPosition: { x: number; y: number } = {
    x: 0,
    y: 0
  };
  private initPosition = {
    x: 0,
    y: 0
  };
  startSlide(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    const { pageY, pageX } = event;
    const { sliding, endSlide, setInitPosition } = this;
    this.startPosition = {
      x: pageX,
      y: pageY
    };
    window.addEventListener("mousemove", sliding);
    window.addEventListener("mouseup", endSlide);
    setInitPosition();
  }
  setInitPosition() {
    const { transform } = window.getComputedStyle(this.slideNode);
    const matrix = transform.match(/[\.\d]+/g) || [];
    this.initPosition = {
      x: +matrix[4] || 0,
      y: +matrix[5] || 0
    };
  }

  endSlide() {
    this.startPosition = { x: 0, y: 0 };
    window.removeEventListener("mousemove", this.sliding);
    window.removeEventListener("mouseup", this.endSlide);
  }
  sliding(event: MouseEvent) {
    const { initPosition, startPosition, scrollTo } = this;
    const { x: initX, y: initY } = initPosition;
    if (this.isY) {
      let delta = event.pageY - startPosition.y + initY;
      scrollTo(delta);
    } else {
      let delta = event.pageX - startPosition.x + initX;
      scrollTo(delta);
    }
  }
  scrollTo(delta: number) {
    const { wrapSize, sliderSize, slide, contentNode, contentSize } = this;
    if (this.isY) {
      const max = wrapSize - sliderSize;
      delta = Math.max(0, Math.min(max, delta));
      slide(`${delta}px`);
      contentNode.scrollTo(
        contentNode.scrollLeft,
        (delta / wrapSize) * contentSize
      );
    } else {
      const max = wrapSize - sliderSize;
      delta = Math.max(0, Math.min(max, delta));
      slide(`${delta}px`);
      contentNode.scrollTo(
        (delta / wrapSize) * contentSize,
        contentNode.scrollTop
      );
    }
  }
  scrolling() {
    const { isY, contentNode, contentSize, wrapSize, slide } = this;
    if (isY) {
      const delta = (contentNode.scrollTop / contentSize) * wrapSize;
      slide(`${delta}px`);
    } else {
      const delta = (contentNode.scrollLeft / contentSize) * wrapSize;
      slide(`${delta}px`);
    }
  }
  slide(delta: string) {
    const { isY, slideNode } = this;

    if (isY) {
      slideNode.style.transform = `translateY(${delta})`;
    } else {
      slideNode.style.transform = `translateX(${delta})`;
    }
  }

  clickTo(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const { isY, scrollTo, setInitPosition, initPosition, sliderSize } = this;

    if ((event.target as HTMLElement).className.indexOf("wjc-scroll-bar") < 0) {
      return;
    }
    setInitPosition();
    let position, _initPosition;
    if (isY) {
      position = event.nativeEvent.offsetY;
      _initPosition = initPosition.y;
    } else {
      position = event.nativeEvent.offsetX;
      _initPosition = initPosition.x;
    }
    if (position > _initPosition + sliderSize) {
      scrollTo(position - sliderSize);
    } else {
      scrollTo(position);
    }
  }
}

export default initAxis;
