"use strict";

var DLList = (function() {
  var Node = (function Node() {
    function Node(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
    return Node;
  }());

  function DLList() {
    this.head   = null;
    this.tail   = null;
    this.length = 0;
  }

  function insert(data) {
    let node = new Node(data);
    if (!this.head) {
      this.head = node;
    }
    else {
      node.prev = this.tail;
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  function remove(node) {
    if (!node) return;
    if (this.length < 1) return;

    // Assumes that the target
    // node belongs to the list.
    if (node == this.head) {
      if (!this.head.next)
        this.head = this.tail = null;
      else
        this.head = this.head.next;
    }
    else {
      const p = node.prev;
      const n = node.next;
      if (p)
        p.next = n;
      if (n)
        n.prev = p;
    }
    this.length -= 1;
  }

  function cat(list) {
    if (!list) return;
    if (list.length < 1) return;

    if (this.tail) {
      list.head.prev = this.tail;
      this.tail.next = list.head;
      this.tail      = list.tail;
    }
    else {
      this.head = list.head;
      this.tail = list.tail;
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

  function findLast(predicate) {
    if (!predicate) return;
    if (this.length < 1) return;

    let current = this.tail;
    while (current) {
      if (predicate(current))
        return current;
      current = current.prev;
    }
  }

  function reverseForEach(fn) {
    if (!fn) return;
    if (this.length < 1) return;

    let current = this.tail;
    while (current) {
      fn(current);
      current = current.prev;
    }
  }

  function reversePrint() {
    if (this.length == 0) {
      console.log("empty");
    }
    else {
      this.reverseForEach(function(nd) {
        console.log(nd.data);
      });
    }
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

  DLList.prototype.insert         = insert;
  DLList.prototype.remove         = remove;
  DLList.prototype.cat            = cat;
  DLList.prototype.clear          = clear;
  DLList.prototype.findFirst      = findFirst;
  DLList.prototype.findLast       = findLast;
  DLList.prototype.includes       = includes;
  DLList.prototype.iterator       = iterator;
  DLList.prototype.forEach        = forEach;
  DLList.prototype.reverseForEach = reverseForEach;
  DLList.prototype.print          = print;
  DLList.prototype.reversePrint   = reversePrint;

  return DLList;
}());

module.exports = { DLList };
