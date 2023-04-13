const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.parentNode = null;
  }

  root() {
    return this.parentNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (this.parentNode === null) {
      this.parentNode = newNode;
    } else {
      this.#addNode(this.parentNode, newNode)
    }
  }

  #addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.#addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.#addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.#hasNode(this.parentNode, data);
  }

  #hasNode(node, data) {
    // console.log(node);
    if (node === null) {
      return false;
    }
    if (node.data === data) {
      return true;
    }
    if (node.data > data) {
      return this.#hasNode(node.left, data);
    } else {
      return this.#hasNode(node.right, data);
    }
  }

  find(data) {
    return this.#findNode(this.parentNode, data);
  }

  #findNode(node, data) {
    if (node === null) {
      return null;
    }
    if (node.data === data) {
      return node;
    }
    if (node.data < data) {
      return this.#findNode(node.right, data);
    } else {
      return this.#findNode(node.left, data);
    }
  }

  remove(data) {
    this.parentNode = this.#removeNode(this.parentNode, data);
  }

  #removeNode(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this.#removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.#removeNode(node.right, data);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left
        return node;
      }
      const minNode = this.#minNode(node.right);
      node.data = minNode.data;
      node.right = this.#removeNode(node.right, minNode.data)
      return node;
    }
  }

  min() {
    let node = this.parentNode;
    while (node.left != null) {
      node = node.left;
    }
    return node.data;
  }

  #minNode(node) {
    if (node.left === null) {
      return node;
    } else {
      return this.#minNode(node.left);
    }
  }

  max() {
    let node = this.parentNode;
    while (node.right != null) {
      node = node.right;
    }
    return node.data;
  }

  print() {
    this.#printNode(this.parentNode);

  }
  #printNode(node) {
    if(node !== null) {
      this.#printNode(node.left);
      console.log(node.data);
      this.#printNode(node.right);
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

const tree = new BinarySearchTree();
      tree.add(9);
      tree.add(14);
      tree.add(54);
      tree.add(2);
      tree.add(6);
      tree.add(8);
      tree.add(31);
      tree.add(1);
      tree.remove(6);
      tree.remove(2);
      // assert.strictEqual(tree.min(), 1);
      // tree.print();
// // console.log('======');
console.log(tree.min());

module.exports = {
  BinarySearchTree
};