class MyEventTarget {
  constructor() {
    this.listeners = new Map();
  }
  addListener(type, listener) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    const array = this.listeners.get(type);
    if (array.indexOf(listener) === -1) {
      array.push(listener);
      return true;
    }
    return false;
  }

  dispatchEvent(type, event) {
    if (this.listeners === null) {
      // No listeners defined, thus nothing to do
      return;
    }
    const arrays = this.listeners.get(event.type);
    if (arrays !== undefined) {

      for (let i = 0; i < arrays.length; i++) {
        arrays[i].call(this, event);
      }
    }
  }
};

class MyTarget extends MyEventTarget {
  constructor(num) {
    super();
    this.num = num;
  }

  onchange(event) {
    this.num = event.msg;
  }
  onadd(event) {
    this.num++;
  }
}

onadd2 = function (event) {
  this.num += 2;
}

let myTarget = new MyTarget(5);
myTarget.addListener("change", myTarget.onchange);
myTarget.addListener("add", myTarget.onadd);
myTarget.addListener("add2", onadd2.bind(myTarget));

console.log(myTarget.num)
myTarget.dispatchEvent("change", { type: "change", msg: 1 });
console.log(myTarget.num)
myTarget.dispatchEvent("add", { type: "add", msg: 1 });
console.log(myTarget.num)
myTarget.dispatchEvent("add2", { type: "add2", msg: 1 });
console.log(myTarget.num)
