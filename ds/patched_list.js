"use strict";
const { LinkedList } = require("./linked_list.js");

// This patch allows us to remove 
// vertices in constant time.
LinkedList.prototype.removeNext = 
  function(prev) {  
    if (this.length == 0) return;

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
        else
          prev.next = null;

        if (old == this.head)
          this.head = old.next;
      }
    }
    this.length -= 1;
  };

module.exports = { LinkedList };

