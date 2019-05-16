"use strict";

var Node = (function Node() {
  function Node(data) {
    this.data = data;
    this.next = null;
  }
  return Node;
}());

module.exports = { Node };

