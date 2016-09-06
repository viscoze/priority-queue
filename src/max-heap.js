const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root 			 = null;
		this.parentNodes = [];
		this.length      = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);

		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	insertNode(node) {
		this.length++;

		if (!this.root) {
			this.root = node;
			this.parentNodes.push(node);
			return;
		}

		if (!this.parentNodes[0].left) {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
		} else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent && node.priority > node.parent.priority) {
			if (node.parent === this.root) this.root = node;

			const parentIndex = this.parentNodes.indexOf(node.parent);
			const nodeIndex   = this.parentNodes.indexOf(node);

			if (parentIndex === -1) {
				this.parentNodes[nodeIndex]   = node.parent;
			} else {
				this.parentNodes[nodeIndex]   = node.parent;
				this.parentNodes[parentIndex] = node;
			}

			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
		if (!node) return;

		let tempNode;

		if (node.left) {
			tempNode = node.left;

			if (node.right && tempNode.priority <= node.right.priority) {
				tempNode = node.right;
			}

			if (tempNode.priority > node.priority) {
				if (node === this.root) this.root = tempNode;

				tempNode.swapWithParent();
				const nodeIndex     = this.parentNodes.indexOf(node);
				const tempNodeIndex = this.parentNodes.indexOf(tempNode);

				if (nodeIndex === -1) {
					this.parentNodes[tempNodeIndex] = node;
				} else {
					this.parentNodes[tempNodeIndex] = node;
					this.parentNodes[nodeIndex]     = tempNode;
				}

				this.shiftNodeDown(node);
			}
		}
	}

	pop() {
		if (!this.root) return;

		const node = this.detachRoot();
		this.restoreRootFromLastInsertedNode(node);
		this.shiftNodeDown(this.root);

		return node.data;
	}

	detachRoot() {
		if (!this.root) return;

		const node      = this.root;
		const nodeIndex = this.parentNodes.indexOf(node)
		this.root       = null;
		this.length--;

		if (nodeIndex !== -1) this.parentNodes.shift();

		return node;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (!detached) return;

		const lastNode = this.parentNodes.pop();

		if (lastNode) {
			const parent = lastNode.parent;
			this.root    = lastNode;

			if (parent) {
				lastNode.remove();

				if (!parent.right && parent.left && parent !== detached) {
					this.parentNodes.unshift(parent);
				}
			}

			if (detached.left) {
				lastNode.appendChild(detached.left);
			}

			if (detached.right) {
				lastNode.appendChild(detached.right);
				return;
			}

			this.parentNodes.unshift(lastNode);
		}
	}

	size() {
		return this.length;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root        = null;
		this.parentNodes = [];
		this.length      = 0;
	}
}

module.exports = MaxHeap;
