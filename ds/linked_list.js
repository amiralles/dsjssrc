"use strict";

const { Node } = require("./node.js");

var LinkedList = (function() {
  function LinkedList() {
    this.head   = null;
    this.tail   = null;
    this.length = 0;
  }

  function insert(data) {
    let node = new Node(data);
    if (!this.head)
      this.head = node;
    else
      this.tail.next = node;

    this.tail = node;
    this.length += 1;
  }

  function remove(node) {
    if (!node) return;
    if (this.length < 1) return;

    let succeed = false;
    if (node == this.head) {
      if (!this.head.next)
        this.head = this.tail = null;
      else
        this.head = this.head.next;
      succeed = true;
    }
    else {
      let tmp = this.head;
      while(tmp && tmp.next != node)
        tmp = tmp.next;

      if (tmp) {
        succeed  = true;
        tmp.next = node.next;
      }
    }

    if (succeed)
      this.length -= 1;
  }

  function cat(list) {
    if (!list) return;
    if (list.length < 1) return;

    if (this.head) {
      // If head is set, tail is also set. We
      // don't have to null check it.
      this.tail.next = list.head;
    }
    else {
      // The current list is empty.
      this.head = list.head;
    }

    this.length += list.length;
  }

  function clear() {
    while (this.length)
      this.remove(this.head);
  }

  function findFirst(predicate) {
    if (!predicate) return;
    if (this.length < 1) return;

    let current = this.head;
    while (current) {
      if (predicate(current))
        break;
      current = current.next;
    }
    return current;
  }

  function includes(data) {
    if (this.length < 1) return false;

    let current = this.head;
    while (current) {
      if (current.data == data)
        return true;
      current = current.next;
    }
    return false;
  }

  function* iterator(list) {
    if (list.length < 1) return;

    let current = list.head;
    while(current) {
      yield current;
      current = current.next;
    }
  }

  function forEach(fn) {
    let i = iterator(this);
    let c = null;

    while ((c = i.next()) && !c.done)
      fn(c.value);
  }

  function print() {
    if (this.length == 0) {
      console.log("empty");
    }
    else {
      this.forEach((node) => {
        console.log(node.data);
      });
    }
  }

  LinkedList.prototype.insert    = insert;
  LinkedList.prototype.remove    = remove;
  LinkedList.prototype.cat       = cat;
  LinkedList.prototype.clear     = clear;
  LinkedList.prototype.findFirst = findFirst;
  LinkedList.prototype.includes  = includes;
  LinkedList.prototype.iterator  = iterator;
  LinkedList.prototype.forEach   = forEach;
  LinkedList.prototype.print     = print;

  return LinkedList;
}());

module.exports = { LinkedList };



