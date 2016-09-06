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
		if (!this.size()) {
			this.root = node;
			return;
		}

		this.parentNodes.push(node);

		const nodeIndex   = (this.size() - 1);
		const parentIndex = Math.floor((nodeIndex - 1) / 2);
		const parent      = (parentIndex >= 0) ?
						 this.parentNodes[parentIndex] :
						 this.root;

		parent.appendChild(node);
	}

	shiftNodeUp(node, nodeIndex) {
		if (this.size() == 1) return;

		if (nodeIndex == undefined) {
			nodeIndex = (this.size() - 1);
		}

		const parentIndex = Math.floor((nodeIndex - 1) / 2);
		const parent      = (parentIndex >= 0) ?
						 this.parentNodes[parentIndex] :
						 this.root;

		if (nodeIndex > 0) {
			if (parent.priority < node.priority) {
				if (parent.label == "root") {
					this.root = node;
					this.parentNodes[nodeIndex] = parent;

					node.swapWithParent();
					return;
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

// const heap = new MaxHeap();
// heap.push(0,10);
// heap.push(1,5);
// heap.push(2,7);
// heap.push(3,20);
//
// console.log("=======================");
// console.log(heap.parentNodes);
// console.log("=======================");

module.exports = MaxHeap;
