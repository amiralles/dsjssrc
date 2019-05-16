"use strict";

const assert         = require("assert");
const { Node }       = require("../ds/node.js");
const { LinkedList } = require("../ds/linked_list.js");

describe("Singly Linked List.", function() {
	describe("#constructor", function() {
		it("Should create an empty list.", function() {
			const list = new LinkedList();
			assert.equal(0, list.length);
		});
	});

	describe("#insert", function() {
		it("Should add items to the list.", function() {
			const list = new LinkedList();
			list.insert("foo");
			list.insert("bar");
			assert.equal(2, list.length);
		});
	});

	describe("#remove", function() {
		it("Should remove items from the head of the list.", function() {
			const list = new LinkedList();
			list.insert("foo");
			const target = list.findFirst(function(nd) {
				return nd.data == "foo";
			});

			list.remove(target);

			assert(!list.includes(target.data));
			assert.equal(0, list.length);
		});

		it("Should remove items from the middle of the list.", function() {
			const list = new LinkedList();
			list.insert("foo");
			list.insert("bar");
			list.insert("baz");
			const target = list.findFirst(function(nd) {
				return nd.data == "bar";
			});

			list.remove(target);

			assert(!list.includes(target.data));
			assert.equal(2, list.length);
		});

		it("Should remove items from the tail of the list.", function() {
			const list = new LinkedList();
			list.insert("foo");
			list.insert("bar");
			list.insert("baz");

			const target = list.findFirst(function(nd) {
				return nd.data == "baz";
			});

			list.remove(target);

			assert(!list.includes(target.data));
			assert.equal(2, list.length);
		});

		it("Should ignore removals on empty lists.", function() {
			const list   = new LinkedList();
			const target = new Node("");

			list.remove(target);

			assert(!list.includes(target));
			assert.equal(0, list.length);
		});
	});

	describe("#cat", function() {
		it("Should append items from the given list to the target list.", 
			function() {
				const list = new LinkedList();
				list.insert("foo");
				list.insert("bar");

				const other = new LinkedList();
				other.insert("baz");

				list.cat(other);

				assert.equal(3, list.length);
				assert(list.includes("foo"));
				assert(list.includes("bar"));
				assert(list.includes("baz"));
		});

		it("Should cat empty lists.", function() {
			const list = new LinkedList();
			const other = new LinkedList();
			list.cat(other);
			assert.equal(0, list.length);
		});

		it("Should append items to an empty list.", function() {
			const list = new LinkedList();
			const other = new LinkedList();
			other.insert("foo");
			other.insert("bar");
			other.insert("baz");

			list.cat(other);

			assert.equal(3, list.length);
			assert(list.includes("foo"));
			assert(list.includes("bar"));
			assert(list.includes("baz"));
		});
	});

	describe("#clear", function() {
		it("Should remove all items from the target list.", function() {
			const list = new LinkedList();
			list.insert("foo");
			list.insert("bar");
			list.insert("baz");

			list.clear();
			assert.equal(0, list.length);
		});
	});

	describe("#findFirst", function() {
		it("Should find existing items.", function() {
			const list = new LinkedList();
			list.insert("foo");
			list.insert("bar");
			list.insert("baz");

			let res = list.findFirst(function(nd) {
				return nd.data == "bar";
			});

			assert(res);
		});

		it("Should return null for missing items.", function() {
			const list = new LinkedList();
			list.insert("foo");
			list.insert("bar");
			list.insert("baz");

			let res = list.findFirst(function(nd) {
				return nd.data == "missing";
			});

			assert.equal(null, res);
		});
	});

	describe("#includes", function() {
		it("Should return true for existing items.", function() {
			const list = new LinkedList();
			list.insert("foo");
			assert(list.includes("foo"));
		});

		it("Should return false for missing items.", function() {
			const list = new LinkedList();
			list.insert("foo");
			assert(!list.includes("missing"));
		});

		it("Should return false for empty lists.", function() {
			const list = new LinkedList();
			assert(!list.includes("missing"));
		});
	});

	describe("#forEach", function() {
		it("Should walk the whole list.", function() {
			const list = new LinkedList();
			list.insert("foo");
			list.insert("bar");
			list.insert("baz");

			let count = 0;
			list.forEach(function() {
				count += 1;
			});

			assert.equal(3, count);
		});

		it("Should works on empty lists.", function() {
			const list = new LinkedList();

			let count = 0;
			list.forEach(function() {
				count += 1;
			});

			assert.equal(0, count);
		});
	});
});
