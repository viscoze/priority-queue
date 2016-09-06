class Node {
	constructor(data, priority) {
		this.data     = data;
		this.priority = priority;

		this.parent   = null;
		this.left     = null;
		this.right	  = null;
	}

	appendChild(node) {
		if (!node) return;

		if(!this.left) {
			this.left   = node;
			node.parent = this;
			return;
		}

		if(!this.right)	{
			this.right  = node;
			node.parent = this;
			return;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left   = null;
			node.parent = null;
			return;
		}

		if (this.right === node) {
			this.right  = null;
			node.parent = null;
			return;
		}

		throw new Error("Error removeChild");
	}

	remove() {
		if (this.parent) this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) return;

		const parentOfParent   = this.parent.parent;
		const parent           = this.parent;
		const leftChild        = this.left;
		const rightChild       = this.right;
		const parentLeftChild  = parent.left;
		const parentRightChild = parent.right;

		if (leftChild)  leftChild.remove();
		if (rightChild) rightChild.remove();

		parent.remove();

		if (this === parentLeftChild) {
			this.remove();
			this.appendChild(parent);

			if (parentRightChild) {
				parentRightChild.remove();
				this.appendChild(parentRightChild);
			}
		}

		if (this === parentRightChild) {
			this.remove();

			if (parentLeftChild) {
				parentLeftChild.remove();
				this.appendChild(parentLeftChild);
			}

			this.appendChild(parent);
		}

		parent.appendChild(leftChild);
		parent.appendChild(rightChild);

		if (parentOfParent) parentOfParent.appendChild(this);
	}
}

module.exports = Node;
