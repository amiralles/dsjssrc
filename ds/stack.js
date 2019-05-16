"use strict";
const { Node } = require("./node.js");

var Stack = (function() {
  function Stack() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  function push(data) {
    let node = new Node(data);
    if (this.length == 0)
      this.tail = node;

    node.next = this.head;
    this.head = node;
    this.length += 1;
  }

  function pop() {
    if (this.length < 1) return;

    this.head = this.head.next;
    if (this.length == 1)
      this.tail = null;
    this.length -= 1;
  }

  function peek() {
    return this.head;
  }

  function size() {
    return this.length;
  }

  function clear() {
    while (this.peek())
      this.pop();
  }

  function print() {
    if (this.length == 0) {
      console.log("empty");
    }
    else {
      let current = this.head;
      while(current) {
        console.log(current.data);
        current = current.next;
      }
    }
  }

  Stack.prototype.push  = push;
  Stack.prototype.pop   = pop;
  Stack.prototype.peek  = peek;
  Stack.prototype.size  = size;
  Stack.prototype.clear = clear;
  Stack.prototype.print = print;

  return Stack;
}());

module.exports = { Stack };
