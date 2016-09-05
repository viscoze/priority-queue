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

	insertNode(node) {
		if (!this.root || !this.parentNodes.length) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}

		const size   = this.parentNodes.length;
		const parent = this.parentNodes[size-1];

		parent.appendChild(node);
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (!node.parent) return;
		if (node.data > node.parent.data) {
			node.swapWithParent();
			this.shiftNodeUp(node);
		}

		const parent      = node.parent;
		const parentIndex = this.parentNodes.findIndex((n) => n == parent);
		const childIndex  = (node.label == 'left') ?
												(2 * parentIndex + 1)  :
												(2 * parentIndex + 2);

		this.parentNodes[childIndex] = node;
		return;
	}

	shiftNodeDown(node) {

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
}

module.exports = MaxHeap;
