const { LinkedList } = 
  require("./linked_list.js");

// This patch allows us to reuse nodes 
// while working with immutable lists.
LinkedList.prototype.reuseFromNode = 
  function(node) {  
    this.tail.next = node;
    let len = 1;
    let tmp = node;
    while ((tmp = tmp.next) != null)
      len += 1;
    // *len* is the distance from the 
    // target node to EOL.
    this.length += len;
  };

LinkedList.prototype.insert = 
  function(data) {  
    let node = new PNode(data);
    if (!this.head)
      this.head = node;
    else
      this.tail.next = node;

    this.tail   = node;
    this.length += 1;
  };

var PNode = (function() {
  function PNode(data) {
    this.next = null;
    Object.defineProperty(this, "data", 
      { value: data, writeable: false });

    PNode.prototype.value = function() {
      return this.data.value;
    };

    PNode.prototype.sameData = function(nd) {
      if (!nd) return false;
      return this.value() == nd.value();
    };

    this.data = data;
  }
  return PNode;
}());

var PList = (function() {
  function PList() {
  }

  PList.empty = 
    function() {
      let list = new LinkedList();
      return Object.freeze(list);
    };

  PList.insert = 
    function(list, data) {
      let res = copy(list);
      res.insert(data);
      return Object.freeze(res);
    };

  PList.update = 
    function(list, node, data) {
      if (!node)
        return copy(list);

      let res = new LinkedList();
      let i   = list.iterator(list);
      let c, reuse, found;

      while ((c = i.next()) && !c.done) {
        let nd = c.value;
        if (!found) {
          found = (nd.sameData(node));
          if (found) {
            res.insert(data);
            reuse = true;
            continue;
          }
        }
        if (!reuse) {
          res.insert(data);
        }
        else {
          // Reuse from target to tail.
          res.reuseFromNode(nd);
          break;
        }
      }
      return Object.freeze(res);
    };

  PList.remove = 
    function(list, node) {
      let res = new LinkedList();
      let i   = list.iterator(list);
      let c, reuse, found;

      while ((c = i.next()) && !c.done) {
        let nd = c.value;
        if (!found) {
          found = (nd.sameData(node));
          if (found) {
            reuse = true;
            continue; // Skip target node.
          }
        }
        if (!reuse) {
          res.insert(nd.data);
        }
        else {
          // Reuse from target to tail.
          res.reuseFromNode(nd);
          break;
        }
      }
      return Object.freeze(res);
    };

  PList.cat = 
    function(lhs, rhs) {
      let res = copy(lhs);
      res.cat(rhs);
      return Object.freeze(res);
    };

  PList.len = 
    function(list) {
      return list ? list.length : 0;
    };

  PList.includes = 
    function(list, data) {
      return PList.findFirst(
        list, function(nd) {
          return nd.data == data;
        });
    };

  PList.findFirst = 
    function(list, predicate) {
      if (!list) return;
      return list.findFirst(predicate);
    };

  PList.forEach = 
    function(list, fn) {
      if (!list) return;
      return list.forEach(fn);
    };

  PList.print = 
    function(list) {
      if (!list)
        console.log("empty");
      else
        list.print();
    };

  // private
  function copy(src) {
    let dst = new LinkedList();
    src.forEach(function(nd) {
      dst.insert(nd.data);
    });
    return dst;
  }

  return PList;
}());

module.exports = { PList, PNode };



