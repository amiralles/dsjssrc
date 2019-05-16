"use strict";

var AVLTree = (function() {
  var Node = (function() {
    function Node(key, data) {
      this.key     = key;
      this.data    = data;
      this.height  = 1;
      this.left    = null;
      this.right   = null;
      this.deleted = null;
    }
    return Node;
  }());

  // .ctor
  function AVLTree() {
    this.root = null;
  }

  function insert(key, data) {
    if (!key) return;

    ensureNum(key);
    this.root = inb(this.root, key, data);
  }

  function remove(key) {
    if (!key) return;

    let e = this.search(key);
    if (!e) return;

    return e.deleted = true;
  }

  function search(key) {
    if (!key) return;

    let node = searchRec(this.root, key);
    if (node && !node.deleted)
      return node;
    return null;
  }

  function print() {
    printRec(this.root, 0);
  }

  function h(node) {
    if (!node) return 0;
    return node.height || 0;
  }

  // Insert & Balance.
  function inb(node, key, data) {
    if (!node)
      return new Node(key, data);

    if (key < node.key) {
      node.left = 
        inb(node.left, key, data);
    }
    else if(key > node.key) {
      node.right = 
        inb(node.right, key, data);
    }
    else {
      node.data    = data;
      node.deleted = false;
    }
    return balance(node);
  }

  function balance(n) {
    setHeight(n);
    // *h* is a helper function that 
    // calculates the height of the tree.
    if (h(n.left) - h(n.right) == 2) {
      let lr = h(n.left.right);
      let ll = h(n.left.left);
      if (lr > ll)
        return rotateLeftRight(n);
      return rotateRight(n);
    }
    else if (h(n.right) - h(n.left) == 2){
      let rl = h(n.right.left);
      let rr = h(n.right.right);
      if (rl > rr) { 
        return rotateRightLeft(n);
      }
      return rotateLeft(n);
    }
    return n;
  }

  function searchRec(node, key) {
    if (!node)
      return null;

    if (key < node.key)
      return searchRec(node.left, key);

    if (key > node.key)
      return searchRec(node.right, key);

    return node;
  }

  function setHeight(node) {
    let lh, rh, max;
    lh  = node ? h(node.left)  : 0;
    rh  = node ? h(node.right) : 0;
    max = lh > rh ? lh : rh;
    return node.height = 1 + max;
  }

  function rotateRight(p) {
    let q   = p.left;
    p.left  = q.right;
    q.right = p;
    setHeight(p);
    setHeight(q);
    return q;
  }

  function rotateLeft(p) {
    let q   = p.right;
    p.right = q.left;
    q.left  = p;
    setHeight(p);
    setHeight(q);
    return q;
  }

  function rotateLeftRight(node) {
    node.left = rotateLeft(node.left);
    return rotateRight(node);
  }

  function rotateRightLeft(node) {
    node.right = rotateRight(node.right);
    return rotateLeft(node);
  }

  function printRec(node, indent) {
    if (!node) {
      console.log(
        rjust("X", indent * 4, " "));
      return;
    }
    logKey(node, indent);
    printRec(node.left, indent + 1);
    printRec(node.right, indent + 1);
  }

  function logKey(node, indent) {
    let txt = node.key.toString();
    if (node.deleted) {
      txt += " (D)";
      console.log(
        rjust(txt, indent * 8, " "));
    }
    else {
      console.log(
        rjust(txt, indent * 4, " "));
    }
  }

  function rjust(txt, len, filler) {
    if (txt)
      return txt.padStart(len, filler);
    return "";
  }

  function ensureNum(key) {
    if (typeof(key) !== "number")
      throw `Can't use ${typeof(key)}.` + 
        "Use number instead.";
  }

  AVLTree.prototype.insert = insert;
  AVLTree.prototype.remove = remove;
  AVLTree.prototype.search = search;
  AVLTree.prototype.print  = print;

  return AVLTree;
}());


module.exports = { AVLTree };



