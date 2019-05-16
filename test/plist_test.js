"use strict";

const assert           = require("assert");
const { PList, PNode } = require("../ds/plist.js");

describe("Persitent Linked List.", function() {
	describe("#empty", function() {
		it("Should create an empty list.", function() {
			assert(PList.empty());
		});
	});

	describe("#insert", function(){
		it("Should add items to the list without changing the original version.", 
			function() {
				const l1 = PList.insert(PList.empty(), "foo");
				const l2 = PList.insert(l1, "bar");

				// Both versions can coexist.
				assert.equal(1, PList.len(l1));
				assert.equal(2, PList.len(l2));
				assert(PList.includes(l1, "foo"));

				assert(PList.includes(l1, "foo"));
				assert(PList.includes(l2, "foo"));
				assert(PList.includes(l2, "bar"));
			});
	});

	describe("#update", function(){
		it("Should update existing items without changing the original version.", 
			function() {
				const l1 = PList.insert(PList.empty(), "foo");
				const nd = PList.findFirst(l1, function(n) {
					return n.data == "foo";
				});

				const l2 = PList.update(l1, nd, "bar");

				// Both versions can coexist.
				assert(PList.includes(l1, "foo"));
				assert(PList.includes(l2, "bar"));
			});
		it("Should ignore null targets.", 
			function() {
				const l1 = PList.insert(PList.empty(), "foo");
				const l2 = PList.update(l1, null, "bar");

				console.log(l1.head.value());
				console.log(l2.head.value());

				assert(PList.includes(l1, "foo"));
				assert(PList.includes(l2, "foo"));
				assert(!PList.includes(l2, "bar"));
		});
	});

	describe("#remove", function(){
		it("Should remove existing items without changing the original version.", 
			function() {
				const l1 = PList.insert(PList.empty(), "foo");
				const nd = PList.findFirst(l1, function(n) {
					return n.data == "foo";
				});

				const l2 = PList.remove(l1, nd, "bar");

				// Both versions can coexist.
				// List *l1* remains untouched.
				assert.equal(1, PList.len(l1));
				assert(PList.includes(l1, "foo"));

				assert.equal(0, PList.len(l2));
				assert(!PList.includes(l2, "foo"));
		});
		it("Should ignore missing items.", function() {
				const l1 = PList.insert(PList.empty(), "foo");
				const nd = new PNode("bar");
				PList.remove(l1, nd);
				assert.equal(1, PList.len(l1));
		});
		it("Should ignore null.", function() {
				const l1 = PList.insert(PList.empty(), "foo");
				const nd = new PNode("bar");
				PList.remove(l1, null);
				assert.equal(1, PList.len(l1));
		});
	});

	describe("#cat", function(){
		it("Should combine the lists without changing the original versions.", 
			function() {
				const l1  = PList.insert(PList.empty(), "foo");
				const l2  = PList.insert(PList.empty(), "bar");
				const res = PList.cat(l1, l2);

				// All versions can coexist.
				assert.equal(1, PList.len(l1));
				assert(PList.includes(l1, "foo"));

				assert.equal(1, PList.len(l2));
				assert(PList.includes(l2, "bar"));

				assert.equal(2, PList.len(res));
				assert(PList.includes(res, "foo"));
				assert(PList.includes(res, "bar"));
			});
		it("Should ignore null lists.", function() {
				const l1  = PList.insert(PList.empty(), "foo");
				const res = PList.cat(l1, null);

				assert.equal(1, PList.len(l1));
				assert(PList.includes(l1, "foo"));

				assert.equal(1, PList.len(res));
				assert(PList.includes(res, "foo"));
			});
	});

	describe("#forEach", function(){
		it("Should walk all elements on the list.", 
			function() {
				const l1  = PList.insert(PList.empty(), "foo");
				const l2  = PList.insert(l1, "bar");
				const l3  = PList.insert(l2, "bar");

				let count = 0;
				PList.forEach(l3, function(nd) {
					count += 1;
				});

				assert.equal(3, count);
			});
		it("Should ignore null lists.", 
			function() {
				let count = 0;
				PList.forEach(null, function(nd) {
					count += 1;
				});

				assert.equal(0, count);
			});
	});

});

