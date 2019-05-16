"use strict";

const assert    = require("assert");
const { Graph } = require("../ds/graph.js");

describe("Graph", function() {

	describe("#insertVertex", function() {
		it("Should add a vertex to the graph.", function() {
			const g = new Graph();
			g.insertVertex("foo");
			assert(g.findVertex("foo"));
		});
	});

	describe("#removeVertex", function() {
		it("Should remove a vertex from the graph.", function() {
			const g = new Graph();
			g.insertVertex("foo");
			g.removeVertex("foo");
			assert(!g.findVertex("foo"));
		});
	});

	describe("#addEdge", function() {
		it("Should add an edge to connect to vertices.", function() {
			const g = new Graph();
			g.insertVertex("foo");
			g.insertVertex("bar");
			g.insertEdge("foo", "bar");

			assert(g.adjacent("foo", "bar"));
		});
	});

	describe("#findVertex", function() {
		it("Should find existing vertices.", function() {
			const g = new Graph();
			g.insertVertex("foo");
			assert(g.findVertex("foo"));
		});
	});


	describe("#removeEdge", function() {
		it("Should remove the given edge.", function() {
			const g = new Graph();
			g.insertVertex("foo");
			g.insertVertex("bar");
			g.insertEdge("foo", "bar");

			g.removeEdge("foo", "bar");
			assert(!g.adjacent("foo", "bar"));
		});
	});
});
