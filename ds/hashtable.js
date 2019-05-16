"use strict";

var HashTable = (function() {
  var Slot = (function Slot() {
    function Slot(key, value) {
      this.key     = key;
      this.value   = value;
      this.vacated = false;
    }
    Slot.prototype.free = function() {
      this.value   = null;
      this.vacated = true;
    };
    return Slot;
  }());

  function HashTable() {
    this.size  = 0;
    this.slots = 5;
    this.fillTable(this.slots);
    this.rebuilds = 0;
    this.h1 = function(k) { 
      return k % this.slots;
    };
    this.h2 = function(k) {
      return 1 + (k % (this.slots - 1));
    };
  }

  function upsert(key, value) {
    let slot = this.findSlot(key);
    if (slot) {
      slot.value = value;
      return;
    }

    if (this.size > (this.slots / 2))
      this.rebuild();

    for (let i = 0; i < this.slots; ++i) {
      let h     = hashcode(key);
      let index = this.doubleHash(h, i);
      let slot  = this.table[index];
      if (!slot || slot.vacated) {
        this.table[index] = 
          new Slot(key, value);
        this.size += 1;
        return;
      }
    }
    throw "Weak hash function.";
  }

  function get(key) {
    for (let i = 0; i < this.slots; ++i) {
      const h     = hashcode(key);
      const index = this.doubleHash(h, i);
      const slot  = this.table[index];
      if (!slot || slot.vacated)
        return null;

      if (slot.key == key)
        return slot.value;
    }
    return null;
  }

  // Can't use delete. It's a keyword.
  // function delete(key) {
  function remove(key) {
    let s = this.findSlot(key);
    if (s)
      s.free();
  }

  // Not the strongest hashing function
  // ever, but it's good engough for 
  // demonstration purposes.
  function hashcode(key) {
    let h   = 0;
    const k = key.toString();
    for (let i = 0; i < k.length; i++) {
      let code = k.charCodeAt(i);
      h = ((h << 5) - h) + code;
      h = h & h;
    }
    return Math.abs(h);
  }

  function findSlot(key) {
    for (let i = 0; i < this.slots; ++i) {
      const h     = hashcode(key);
      const index = this.doubleHash(h, i);
      const slot  = this.table[index];
      if (!slot)
        return null;
      if (slot.key == key)
        return slot;
    }
    return null;
  }

  function print() {
    this.table.forEach(function(e) {
      if (e) {
        console.log(
          `${e.key}: ${e.value}`);
      }
      else {
        console.log("empty");
      }
    });
  }

  // private;
  const PRIMES = [13, 31, 61, 127, 251, 509];
  const MAX_REBUILDS = 6;

  function rebuild() {
    if (this.rebuilds >= MAX_REBUILDS)
      throw "Too many entries.";

    let old    = this.table;
    this.slots = PRIMES[this.rebuilds];
    this.size  = 0;
    this.fillTable(this.slots);

    let ht = this;
    old.forEach(function(e) {
      if (e) {
        ht.upsert(e.key, e.value);
      }
    });
    this.rebuilds += 1;
  }

  function fillTable(slots) {
    this.table = new Array(slots);
    for (let i = 0; i < this.slots; ++i)
      this.table[i] = null;
  }

  function doubleHash(hashcode, idx) {
    const h1 = this.h1(hashcode);
    const h2 = this.h2(hashcode);
    const s  = this.slots;
    const dh = ((h1 + (idx * h2)) % s);
    return Math.abs(dh);
  }

  HashTable.prototype.upsert   = upsert;
  HashTable.prototype.get      = get;
  HashTable.prototype.remove   = remove;
  HashTable.prototype.print    = print;
  HashTable.prototype.rebuild  = rebuild;
  HashTable.prototype.findSlot =
    findSlot;
  HashTable.prototype.fillTable = 
    fillTable;
  HashTable.prototype.doubleHash = 
    doubleHash;

  return HashTable;
}());

module.exports = { HashTable };

