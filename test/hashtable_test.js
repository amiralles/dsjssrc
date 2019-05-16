"use strict";

const assert        = require("assert");
const { HashTable } = require("../ds/hashtable.js");

describe("HashTable", function() {
	describe("#constructor", function() {
		it("Should initialize an empty hashtable.", function() {
			const ht = new HashTable();
			assert.equal(0, ht.size);
		});
	});

	describe("#upsert", function() {
		it("Should add new entries to the table.", function() {
			const ht = new HashTable();
			ht.upsert("foo", 1);
			ht.upsert("bar", 2);
			assert.equal(1, ht.get("foo"));
			assert.equal(2, ht.get("bar"));
		});
		it("Should update existings entries.", function() {
			const ht = new HashTable();
			assert.equal(0, ht.size);
			ht.upsert(1, "foo");
			ht.upsert(1, "changed");
			assert.equal("changed", ht.get(1));
		});
	});
	describe("#remove", function() {
		it("Should remove entries from the table.", function() {
			const ht = new HashTable();
			ht.upsert("foo", 1);
			ht.upsert("bar", 2);

			ht.remove("foo");
			assert(!ht.get("foo"));
		});
		it("Should ignore missing entries.", function() {
			const ht = new HashTable();
			ht.upsert("foo", 1);

			ht.remove("bar");
			assert(!ht.get("bar"));
		});
	});
	describe("#rebuild", function() {
		it("Should make room for new entries.", function() {
			const ht = new HashTable();
			// Add a bunch of keys to trigger
			// the rebuild process.
			ht.upsert("key1", 1);
			ht.upsert("key2", 2);
			ht.upsert("key3", 3);
			ht.upsert("key4", 4);
			ht.upsert("key5", 5);
			ht.upsert("key6", 6);
			ht.upsert("key7", 7);
			ht.upsert("key8", 8);
			ht.upsert("key9", 9);
			ht.upsert("key10", 10);
			ht.upsert("key11", 11);

			assert.equal(11, ht.get("key11"));
		});
	});
});

