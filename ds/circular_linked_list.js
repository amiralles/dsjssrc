"use strict";
const { Node } = require("./node.js");

var CLList = (function() {
  function CLList() {
    this.head    = null; 
    this.current = null;
    this.length  = 0; 
  }

  function insert(data) {
    if (this.length == 0)
      return this.insertNext(null, data);

    if (this.length == 1)
      return this.insertNext(
        this.head, data);

    this.current = this.head;

    let i = 0;
    while ((i += 1) < this.length)
      this.moveNext();

    return this.insertNext(
      this.current, data);
  }

  function insertNext(prev, data) {
    let node = new Node(data);
    if (this.length == 0) {
      this.head = node.next = node;
    }
    else {
      node.next = prev.next;
      prev.next = node;
    }
    this.length += 1;
  }

  function remove(node) {
    if (!node) return;
    if (this.length < 1) return;

    if (this.head == node)
      return this.removeNext(this.head.next);

    let prev  = null;
    let found = false;
    // finds the node that precedes the
    // target node.
    //
    this.current = this.head;
    while (true) {
      if (this.current == node) {
        found = true;
        break;
      }
      prev = this.current;
      if (this.moveNext() == this.head)
        break;
    }
    if (found)
      this.removeNext(prev);
  }

  function removeNext(prev) {
    if (this.length < 1) return;

    if (!prev) {
      this.head = this.head.next;
    }
    else {
      if (prev.next == prev) {
        this.head = null;
      }
      else {
        let old = prev.next;
        if (prev.next)
          prev.next = prev.next.next;
        if (old == this.head)
          this.head = old.next;
      }
    }

    this.length -= 1;
  }

  function clear() {
    while (this.length > 0)
      this.remove(this.head);
  }

  function moveNext() {
    if (this.current)
      return this.current = this.current.next;
    return null;
  }

  function includes(data) {
    if (this.length < 1)
      return false;

    this.current = this.head;
    while (true) {
      if (this.current.data == data)
        return true;
      if (this.moveNext() == this.head)
        return false;
    }
  }

  function fullScan(fn) {
    if (!fn) return;
    if (this.length < 1) return;

    this.current = this.head;
    while (true) {
      fn(this.current);
      if (this.moveNext() == this.head)
        break;
    }
  }

  function findFirst(predicate) {
    if (!predicate) return;
    if (this.length < 1) return;

    this.current = this.head;
    while (true) {
      if (predicate(this.current)){
        return this.current;
      }

      if (this.moveNext() == this.head) {
        return null;
      }
    }
  }

  function print() {
    if (this.length == 0) {
      console.log("empty");
    }
    else {
      this.fullScan(function(item) {
        console.log(item.data);
      });
    }
  }

  CLList.prototype.insert    = insert;
  CLList.prototype.remove    = remove;
  CLList.prototype.insertNext= insertNext;
  CLList.prototype.removeNext= removeNext;
  CLList.prototype.clear     = clear;
  CLList.prototype.moveNext  = moveNext;
  CLList.prototype.includes  = includes;
  CLList.prototype.fullScan  = fullScan;
  CLList.prototype.findFirst = findFirst;
  CLList.prototype.print     = print;

  return CLList;
}());

module.exports = { CLList };
