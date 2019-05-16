"use strict";

const assert = require("assert");
const { AVLTree } = require("../ds/avl_tree.js");

describe("AVLTree", function(){
	describe("#insert", function(){
		it("Should add elements to the tree.", function() {
			const tree = new AVLTree();
			tree.insert(123, "foo");
			tree.insert(456, "bar");
			tree.insert(789, "baz");

			assert(tree.search(123));
			assert(tree.search(456));
			assert(tree.search(789));
		});

		it("Should handle heavy trees.", function() {
			const tree = new AVLTree();
			tree.insert(123, "foo");
			tree.insert(456, "bar");
			tree.insert(789, "baz");

			tree.insert(780, "any");
			tree.insert(781, "any");
			tree.insert(782, "any");
			tree.insert(783, "any");
			tree.insert(784, "any");
			tree.insert(1,   "any");
			tree.insert(2,   "any");
			tree.insert(3,   "any");
			tree.insert(12,  "any");
			tree.insert(13,  "any");
			tree.insert(15,  "any");
			assert(true);
		});
	});

	describe("#remove", function(){
		it("Should remove the given key.", function() {
			const tree = new AVLTree();
			tree.insert(123, "foo");
			tree.remove(123);
			assert.equal(null, tree.search(123));
		});
		it("Should ignore missing keys.", function() {
			const tree = new AVLTree();
			tree.insert(123, "foo");
			tree.remove(456);
		});
	});

	describe("#search", function(){
		it("Should find existing keys.", function() {
			const tree = new AVLTree();
			tree.insert(123, "foo");
			tree.insert(456, "bar");
			tree.insert(789, "baz");

			assert(tree.search(123));
			assert(tree.search(456));
			assert(tree.search(789));
		});
		it("Should return null for missing keys.", function() {
			const tree = new AVLTree();
			tree.insert(123, "foo");

			assert.equal(null, tree.search(456));
		});
	});
});
