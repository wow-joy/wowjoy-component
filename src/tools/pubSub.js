/**
 * @description 订阅/发布
 * @param initFunc 初始化函数，第一顺位执行， 无法被remove和clear
 * @returns {add} 订阅事件， 匿名函数允许注册，但无法被remove
 * @returns {remove} 清除指定事件
 * @returns {clear} 清空所有订阅事件
 * @returns {publish} 发布事件
 *
 */
class pubSub {
  constructor(initFunc) {
    this.initFunc = initFunc;
    this.callBacks = {};
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.clear = this.clear.bind(this);
    this.publish = this.publish.bind(this);
  }
  add(func) {
    this.callBacks[func.name] = func;
  }
  remove(func) {
    delete this.callBacks[func.name];
  }
  clear(func) {
    this.callBacks = {};
  }
  publish() {
    this.initFunc && this.initFunc();
    for (const key in this.callBacks) {
      if (this.callBacks.hasOwnProperty(key)) {
        const element = this.callBacks[key];
        element();
      }
    }
  }
}

export default pubSub;
