"use strict";
const { Node } = require("./node.js");

var Queue = (function() {
  function Queue() {
    this.head   = null;
    this.tail   = null;
    this.length = 0;
  }

  function enqueue(data) {
    let node = new Node(data);
    if (!this.head)
      this.head = node;
    else
      this.tail.next = node;
    this.tail    = node;
    this.length += 1;
  }

  function dequeue() {
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
    while(this.peek())
      this.dequeue();
  }

  function forEach(fn) {
    if (!fn) return;

    let current = this.head;
    while (current) {
      fn(current);
      current = current.next;
    }
  }

  function print() {
    if (this.length == 0) {
      console.log("empty");
    }
    else {
      this.forEach(function(nd) {
        console.log(nd.data);
      });
    }
  }

  Queue.prototype.enqueue = enqueue;
  Queue.prototype.dequeue = dequeue;
  Queue.prototype.peek    = peek;
  Queue.prototype.size    = size;
  Queue.prototype.clear   = clear;
  Queue.prototype.forEach = forEach;
  Queue.prototype.print   = print;

  return Queue;
}());

module.exports = { Queue };
