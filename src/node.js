class Node {
	constructor(data, priority) {
		this.data     = data;
		this.priority = priority;

		this.parent   = null;
		this.left     = null;
		this.right    = null;
		this.label    = "root";
	}

	appendChild(node) {
		if (this.left && this.right) return;

		if (this.left) {
			this.right        = node;
			this.right.label  = "right";
			this.right.parent = this;
		} else {
			this.left        = node;
			this.left.label  = "left";
			this.left.parent = this;
		}
	}

	removeChild(node) {
		if (node === this.left) {
			this.left.parent = null;
			this.left = null;
			return;
		}

		if (node === this.right) {
			this.right.parent = null;
			this.right = null;
			return;
		}

		throw new Error("This node does not belong!");
	}

	remove() {
		if (!this.parent) return;

		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (!this.parent) return;

		const rightChild     = this.right;
		const leftChild      = this.left;

		const parent         = this.parent;
		const parentOfParent = this.parent.parent;

		const parentAnotherChild = (this.label == "left") ?
																		this.parent.right :
																		this.parent.left;

		this.parent.parent   = this;
		this.parent          = parentOfParent;
		if (parentAnotherChild) {
			parentAnotherChild.parent = this;

			if (parentAnotherChild.label == "right") {
				this.right = parentAnotherChild;
				this.left  = parent;
			} else {
				this.left  = parentAnotherChild;
				this.right = parent;
			}
		}

		if (parentOfParent) {
			if (parent.label == "left") {
				parentOfParent.left = this;
			} else {
				parentOfParent.right = this;
			}
		}

		parent.left  = leftChild;
		parent.right = rightChild;

		if (parent.left)  parent.left.parent  = parent;
		if (parent.right) parent.right.parent = parent;
	}
}

module.exports = Node;
