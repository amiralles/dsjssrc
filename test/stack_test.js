"use strict";

const assert    = require("assert");
const { Stack } = require("../ds/stack.js");

describe("Stack", function() {
	describe("#constructor", function() {
		it("Should create an empty stack.", function() {
			const s = new Stack();
			assert(s);
		});
	});
	describe("#push", function() {
		it("Should add items to the stack.", function() {
			const s = new Stack();
			s.push("foo");
			s.push("bar");
			s.push("baz");
			assert.equal(3, s.length);
		});
	});
	describe("#peek", function() {
		it("Should return the next item to be 'poped'.", function() {
			const s = new Stack();
			s.push("foo");
			s.push("bar");
			s.push("baz");

			assert.equal("baz", s.peek().data);
		});
		it("Should return null when the stack is empty.", function() {
			const s = new Stack();
			assert.equal(null, s.peek());
		});
	});
	describe("#pop", function() {
		it("Should remove the next item to be 'poped'.", function() {
			const s = new Stack();
			s.push("foo");
			s.push("bar");
			s.push("baz");

			s.pop();
			s.pop();
			assert.equal("foo", s.peek().data);
		});
		it("Should do nothing on empty stacks.", function() {
			const s = new Stack();
			s.pop();
			assert.equal(0, s.length);
		});
	});
	describe("#clear", function() {
		it("Should remove all items from the stack.", function() {
			const s = new Stack();
			s.push("foo");
			s.push("bar");
			s.push("baz");

			s.clear();
			assert.equal(0, s.length);
		});
	});
});

