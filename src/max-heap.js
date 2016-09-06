const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
	}

	push(data, priority) {
		if ((data == undefined) || (priority == undefined)) return;

		const node = new Node(data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	insertNode(node) {
		this.parentNodes.push(node);

		if (this.size() == 1) {
			this.root = this.parentNodes[0];
			return;
		}

		const nodeIndex   = (this.size() - 1);
		const parentIndex = Math.floor((nodeIndex - 1) / 2);
		const parent      = this.parentNodes[parentIndex];

		if (!parent) return;

		parent.appendChild(node);
	}

	shiftNodeUp(node, nodeIndex) {
		if (this.size() == 1) return;

		nodeIndex = nodeIndex || (this.size() - 1);

		const parentIndex = Math.floor((nodeIndex - 1) / 2);
		const parent      = this.parentNodes[parentIndex];

		if (nodeIndex > 0) {
			if (parent.priority < node.priority) {
				if (parentIndex == 0) {
					this.root = node;
				}

				this.parentNodes[parentIndex] = node;
				this.parentNodes[nodeIndex]   = parent;

				node.swapWithParent();
				this.shiftNodeUp(node, parentIndex);
			}
		}
	}

	shiftNodeDown(node) {

	}

	pop() {
		if (!this.root) return;

		const root = this.root;
		const data = this.root.data;

		const detachedRoot = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detachedRoot);
		this.shiftNodeDown(root);

		return data;
	}

	detachRoot() {
		const root = this.parentNodes.shift();
		this.root  = null;

		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.isEmpty()) return;

		const leftChild  = detached.left;
		const rightChild = detached.right;

		const lastInsertedNode  = this.parentNodes.pop();
		lastInsertedNode.left   = leftChild;
		lastInsertedNode.right  = rightChild;

		this.root = lastInsertedNode;

		if (leftChild)  leftChild.parent  = lastInsertedNode;
		if (rightChild) rightChild.parent = lastInsertedNode;

		this.parentNodes.unshift(lastInsertedNode);
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
