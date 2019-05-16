"use strict";

const { LinkedList } = require("./patched_list.js");

var Set = (function() {
  function Set() {
    this.list = new LinkedList();
  }

  function insert(member) {
    if (this.contains(member)) return;

    this.list.insert(member);
  }

  function remove(member) {
    let node = this.list.findFirst(
      function(nd) {
        return nd.data == member;
      });

    if (node)
      this.list.remove(node);
  }

  function union(other) {
    let res = new Set();
    this.list.forEach(function(nd) {
      res.insert(nd.data);
    });

    other.forEach(function(m) {
      res.insert(m.data);
    });
    return res;
  }

  function intersect(other) {
    let res = new Set();
    this.list.forEach(function(nd) {
      if (other.contains(nd.data))
        res.insert(nd.data);
    });
    return res;
  }

  function diff(other) {
    let res = new Set();
    this.list.forEach(function(nd) {
      if (!other.contains(nd.data))
        res.insert(nd.data);
    });
    return res;
  }

  function contains(member) {
    return this.list.findFirst(
      function(nd) {
        return nd.data == member;
      });
  }

  function subset(other) {
    if (this.count() > other.count())
      return false;

    this.list.forEach(function(nd) {
      if (!other.contains(nd.data))
        return false;
    });
    return true;
  }

  function equal(other) {
    if (this.count() != other.count())
      return false;
    return this.subset(other);
  }

  function count() {
    return this.list.length;
  }

  function forEach(fn) {
    if (!fn) return null;

    let current = this.list.head;
    while (current) {
      fn(current);
      current = current.next;
    }
  }

  function print() {
    this.list.print();
  }

  Set.prototype.insert    = insert;
  Set.prototype.remove    = remove;
  Set.prototype.union     = union;
  Set.prototype.intersect = intersect;
  Set.prototype.diff      = diff;
  Set.prototype.contains  = contains;
  Set.prototype.subset    = subset;
  Set.prototype.equal     = equal;
  Set.prototype.count     = count;
  Set.prototype.forEach   = forEach;
  Set.prototype.print     = print;

  return Set;
}());

module.exports = { Set };





