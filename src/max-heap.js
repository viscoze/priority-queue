const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		if (!data || !priority) return;

		const node = new Node(data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {

	}

	detachRoot() {
		const root = this.root;
		this.root  = null;

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {

	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
		return !this.parentNodes.length;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (!this.parentNodes.length) this.root = node;
	}

	shiftNodeUp(node) {

	}

	shiftNodeDown(node) {

	}
}

module.exports = MaxHeap;
