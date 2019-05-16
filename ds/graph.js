"use strict";

const { LinkedList } = require("./patched_list.js");
const { Set }        = require("./set.js");

var Graph = (function() {
  var Vertex = (function Vertex() {
    function Vertex(key) {
      this.key = key;
      this.edges = new Set();
      this.toString = function() {
        return this.key.toString();
      };
    }
    return Vertex;
  }());

  function Graph() {
    this.vertices = new LinkedList();
  }

  function findVertex(key) {
    return this.vertices.findFirst(
      function(v) {
        return v.data.key == key;
      });
  }

  function insertVertex(key) {
    if (this.findVertex(key)) return;

    let vertex = new Vertex(key);
    this.vertices.insert(vertex);
  }

  function insertEdge(key1, key2) {
    let v1 = this.findVertex(key1);
    if (!v1)
      return;

    let v2 = this.findVertex(key2);
    if (!v2)
      return;

    v1.data.edges.insert(v2.data.key);
  }

  function removeVertex(key) {
    let found, target, prev;

    this.vertices.forEach(function(v) {
      if (v.data.edges.contains(key))
        return;

      if (v.data.key == key) {
        found  = true;
        target = v.data;
      }

      if (!found)
        prev = v;
    });

    if (!found)
      return;

    if (target.edges.count() != 0)
      return;

    this.vertices.removeNext(prev);
  }

  function removeEdge(key1, key2) {
    let tmp = this.findVertex(key1);
    if (!(tmp && tmp.data))
      return;

    let v = tmp.data;
    v.edges.remove(key2);
  }

  function adjacent(key1, key2) {
    let tmp = this.findVertex(key1);
    if (!(tmp && tmp.data))
      return false;

    let v = tmp.data;
    return v.edges.contains(key2)
      ? true
      : false;
  }

  function print() {
    this.vertices.forEach(
      function(v) {
        console.log(
          `${v.data} (vertex)`);

        v.data.edges.forEach(
          function(e) {
            console.log(
              `    ${e.data} (edge)`);
          });
      });
  }

  Graph.prototype.insertVertex = 
    insertVertex;
  
  Graph.prototype.removeVertex = 
    removeVertex;
  
  Graph.prototype.findVertex = 
    findVertex;

  Graph.prototype.insertEdge = 
    insertEdge;

  Graph.prototype.removeEdge = 
    removeEdge;

  Graph.prototype.adjacent = 
    adjacent;

  Graph.prototype.print = 
    print;

  return Graph;
}());


module.exports = { Graph };




