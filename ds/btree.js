"use strict";

var BTree = (function() {
  var Node = (function Node() {
    function Node(parent, data) {
      this.parent = parent;
      this.data   = data;
      this.left   = null;
      this.right  = null;
    }

    return Node;
  }());

  BTree.Node = Node;

  function BTree(root) {
    this.root = root;
    this.size = 1;
  }

  function insertLeft(node, data) {
    if (!node) return;

    if (node.left)
      throw "Can't override nodes.";

    this.size += 1;
    node.left = new Node(node, data);
  }

  function insertRight(node, data) {
    if (!node) return;
    if (node.right)
      throw "Can't override nodes.";

    this.size += 1;
    node.right = new Node(node, data);
  }

  function removeLeft(node) {
    if (node && node.left) {
      removeLeft(node.left);
      removeRight(node.left);
      node.left = null;
      this.size -= 1;
    }
  }

  function removeRight(node) {
    if (node && node.right) {
      removeLeft(node.right);
      removeRight(node.right);
      node.right = null;
      this.size -= 1;
    }
  }

  // static.
  BTree.merge = function(tree1, tree2, data) {
    if (!(tree1 && tree2))
      throw "Can't merge null trees.";

    let root = new Node(null, data);
    let res  = new BTree(root);

    res.root.left  = tree1.root;
    res.root.right = tree2.root;

    res.size = tree1.size + tree2.size;
    return res;
  };

  function print() {
    printRec(this.root);
  }

  // private
  function printRec(node, indent) {
    printNode(node, indent || 0);
    if (node && node.left)
      printRec(node.left, indent + 1);

    if (node && node.right)
      printRec(node.right, indent + 1);
  }

  function printNode(node, indent) {
    let data = "null";
    if (node && node.data) {
      data = node.data;

      console.log(data, indent * 4, " ");
    }
  }

  BTree.prototype.insertLeft  = 
    insertLeft;

  BTree.prototype.insertRight = 
    insertRight;

  BTree.prototype.removeLeft  = 
    removeLeft;

  BTree.prototype.removeRight = 
    removeRight;

  BTree.prototype.print = print;

  return BTree;
}());

module.exports = { BTree };
