"use strict";

const assert    = require("assert");
const { BTree } = require("../ds/btree.js");

describe("BTree", function(){
	describe("#insertLeft", function(){
		it("Should insert on the left subtree of the given node.", function() {
			const root  = new BTree.Node(null, "foo");
			const btree = new BTree(root);

			btree.insertLeft(root, "bar");
			assert.equal(root.left.data, "bar");
			
		});

		it("Should insert on the left subtree of the left subtree of the given node.", 
			function() {
				const root  = new BTree.Node(null, "foo");
				const btree = new BTree(root);
				btree.insertLeft(root, "bar");
				btree.insertLeft(root.left, "baz");
				assert.equal(root.left.left.data, "baz");
		});

	});

	describe("#insertRight", function(){
		it("Should insert on the right subtree of the left subtree.", function() {
			const root  = new BTree.Node(null, "foo");
			const btree = new BTree(root);

			btree.insertLeft(root, "bar");
			btree.insertRight(root.left, "baz");
			assert.equal(root.left.right.data, "baz");
		});

		it("Should insert on the right subtree of the given node.", function() {
			const root  = new BTree.Node(null, "foo");
			const btree = new BTree(root);

			btree.insertRight(root, "bar");
			assert.equal(root.right.data, "bar");
			
		});

		it("Should insert on the right subtree of the right subtree of the given node.", 
			function() {
				const root  = new BTree.Node(null, "foo");
				const btree = new BTree(root);
				btree.insertRight(root, "bar");
				btree.insertRight(root.right, "baz");
				assert.equal(root.right.right.data, "baz");
		});

		it("Should insert on the left subtree of the right subtree.", function() {
			const root  = new BTree.Node(null, "foo");
			const btree = new BTree(root);

			btree.insertRight(root, "bar");
			btree.insertLeft(root.right, "baz");
			assert.equal(root.right.left.data, "baz");
			
		});
	});

	describe("#removeLeft", function(){
		it("Should remove the left subtree of the given node.", function() {
			const root  = new BTree.Node(null, "foo");
			const btree = new BTree(root);

			btree.insertLeft(root, "bar");
			btree.removeLeft(root);
			assert.equal(null, root.left);
		});
	});

	describe("#removeRight", function(){
		it("Should remove the right subtree of the given node.", function() {
			const root  = new BTree.Node(null, "foo");
			const btree = new BTree(root);

			btree.insertRight(root, "bar");
			btree.removeRight(root);
			assert.equal(null, root.right);
		});
	});

	describe("#merge", function(){
		it("Should combine two trees.", function() {
			let root, lhs, rhs, m;

			root = new BTree.Node(null, "foo");
			lhs  = new BTree(root);
			lhs.insertLeft(root, "bar");

			root = new BTree.Node(null, "baz");
			rhs  = new BTree(root);
			rhs.insertLeft(root, "buzz");

			m = BTree.merge(lhs, rhs);

			assert(m.root.left.data == "foo");
			assert(m.root.left.left.data == "bar");

			assert(m.root.right.data == "baz");
			assert(m.root.right.left.data == "buzz");
		});
	});
});
