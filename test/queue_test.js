"use strict";

const assert    = require("assert");
const { Queue } = require("../ds/queue.js");

describe("Queue", function() {
	describe("#constructor", function() {
		it("Should create an empty queue.", function() {
			const q = new Queue();
			assert(q);
		});
	});
	describe("#enqueue", function() {
		it("Should add items to the queue.", function() {
			const q = new Queue();
			q.enqueue("foo");
			q.enqueue("bar");
			q.enqueue("baz");
			assert.equal(3, q.length);
		});
	});
	describe("#peek", function() {
		it("Should return the next item to be dequeued.", function() {
			const q = new Queue();
			q.enqueue("foo");
			q.enqueue("bar");
			q.enqueue("baz");

			assert.equal("foo", q.peek().data);
		});
		it("Should return null when the queue is empty.", function() {
			const q = new Queue();
			assert.equal(null, q.peek());
		});
	});
	describe("#dequeue", function() {
		it("Should remove the next item to be dequeued.", function() {
			const q = new Queue();
			q.enqueue("foo");
			q.enqueue("bar");
			q.enqueue("baz");

			q.dequeue();
			q.dequeue();
			assert.equal("baz", q.peek().data);
		});
		it("Should do nothing on empty queues.", function() {
			const q = new Queue();
			q.dequeue();
			assert.equal(0, q.length);
		});
	});
	describe("#clear", function() {
		it("Should remove all items from the queue.", function() {
			const q = new Queue();
			q.enqueue("foo");
			q.enqueue("bar");
			q.enqueue("baz");

			q.clear();
			assert.equal(0, q.length);
		});
	});
	describe("#forEach", function() {
		it("Should walk all items on the queue.", function() {
			const q = new Queue();
			q.enqueue("foo");
			q.enqueue("bar");
			q.enqueue("baz");
			let count = 0;
			q.forEach(function(nd) {
				count += 1;
			});

			assert.equal(3, count);
		});
		it("Should walk empty queues.", function() {
			const q = new Queue();
			let count = 0;
			q.forEach(function(nd) {
				count += 1;
			});

			assert.equal(0, count);
		});
	});
});

