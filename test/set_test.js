"use strict";

const assert  = require("assert");
const { Set } = require("../ds/set.js");

describe("Set", function() {
	describe("#constructor", function() {
		it("Should create an empty set.", function() {
			const s = new Set();
			assert(s);
		});
	});
	describe("#insert", function() {
		it("Should add members to the set.", function() {
			const s = new Set();
			s.insert("foo");
			s.insert("bar");
			assert.equal(2, s.count());
		});
		it("Should ignore dupes.", function() {
			const s = new Set();
			s.insert("foo");
			s.insert("foo");
			s.insert("foo");
			s.insert("foo");
			assert.equal(1, s.count());
		});
	});
	describe("#remove", function() {
		it("Should remove members from the set.", function() {
			const s = new Set();
			s.insert("foo");
			s.insert("bar");
			s.remove("foo");
			assert.equal(1, s.count());
		});
		it("Should ignore missing members.", function() {
			const s = new Set();
			s.insert("foo");
			s.remove("bar");
			assert.equal(1, s.count());
		});
		it("Should do nothing on empty sets.", function() {
			const s = new Set();
			s.remove("bar");
			assert.equal(0, s.count());
		});
	});
	describe("#union", function() {
		it("Should return all elements from both sets.", function() {
			const s = new Set();
			s.insert("foo");
			s.insert("bar");

			const s1 = new Set();
			s1.insert("baz");
			s1.insert("buzz");

			const u = s.union(s1);
			assert.equal(4, u.count());
			assert(u.contains("foo"));
			assert(u.contains("bar"));
			assert(u.contains("baz"));
			assert(u.contains("buzz"));
		});
		it("Should return empty if both sets are empty.", function() {
			const s  = new Set();
			const s1 = new Set();
			const u  = s.union(s1);
			assert.equal(0, u.count());
		});
		it("Should union empty set.", function() {
			const s  = new Set();
			const s1 = new Set();
			s.insert("foo");
			s.insert("bar");
			const u  = s.union(s1);

			assert.equal(2, u.count());
			assert(u.contains("foo"));
			assert(u.contains("bar"));
		});
		it("Should union empty set to non empty set.", function() {
			const s  = new Set();
			const s1 = new Set();
			s1.insert("foo");
			s1.insert("bar");
			const u  = s.union(s1);

			assert.equal(2, u.count());
			assert(u.contains("foo"));
			assert(u.contains("bar"));
		});
	});
	describe("#intersect", function() {
		it("Should return the intersection of two sets.", function() {
			const s  = new Set();
			const s1 = new Set();
			s.insert("foo");

			s1.insert("foo");
			s1.insert("bar");

			const i  = s.intersect(s1);
			assert.equal(1, i.count());
			assert(i.contains("foo"));
		});
		it("Should return empty when intersects two empty sets.", function() {
			const s  = new Set();
			const s1 = new Set();
			const i  = s.intersect(s1);
			assert.equal(0, i.count());
		});
		it("Should return empty when intersects non empty with empty set.", 
			function() {
				const s  = new Set();
				s.insert("foo");
				s.insert("bar");
				const s1 = new Set();
				const i  = s.intersect(s1);
				assert.equal(0, i.count());
		});
	});
	describe("#diff", function() {
		it("Should return the difference of two sets.", function() {
				const s  = new Set();
				s.insert("foo");
				s.insert("bar");

				const s1 = new Set();
				s1.insert("foo");
				s1.insert("baz");

				const d = s.diff(s1);
				assert.equal(1, d.count());
				assert(d.contains("bar"));
		});
		it("Should return the difference with empty set.", function() {
				const s  = new Set();
				s.insert("foo");
				s.insert("bar");

				const s1 = new Set();
				const d  = s.diff(s1);

				assert.equal(2, d.count());
				assert(d.contains("foo"));
				assert(d.contains("bar"));
		});
		it("Should return the empty set when lhs is the empty set.", function() {
				const s  = new Set();
				const s1 = new Set();
				s1.insert("foo");
				s1.insert("bar");

				const d  = s.diff(s1);
				assert.equal(0, d.count());
		});
	});
	describe("#subset", function() {
		it("Should return true the target set is a subset of the given set.",
			function() {
				const s = new Set();
				s.insert("foo");
				s.insert("bar");

				const s1 = new Set();
				s1.insert("foo");

				assert(s1.subset(s));
		});
		it("Should return false the target set is not a subset of the given set.",
			function() {
				const s = new Set();
				s.insert("foo");

				const s1 = new Set();
				s1.insert("foo");
				s1.insert("bar");

				assert(!s1.subset(s));
		});
	});
	describe("#equal", function() {
		it("Should return true if both sets contains the same members.",
			function() {
				const s = new Set();
				s.insert("foo");
				s.insert("bar");

				const s1 = new Set();
				s1.insert("foo");
				s1.insert("bar");

				assert(s1.equal(s));
		});
		it("Should return false when two sets don't have the same members.",
			function() {
				const s = new Set();
				s.insert("foo");
				s.insert("bar");

				const s1 = new Set();
				s1.insert("foo");

				assert(!s1.equal(s));
		});
	});
	describe("#forEach", function() {
		it("Should walk all members on the set.", function() {
			const s = new Set();
			s.insert("foo");
			s.insert("bar");
			s.insert("baz");

			let count = 0;
			s.forEach(function(m) {
				count += 1;
			});

			assert.equal(3, count);
		});
		it("Should walk the empty set.", function() {
			const s = new Set();

			let count = 0;
			s.forEach(function(m) {
				count += 1;
			});

			assert.equal(0, count);
		});
	});
});
