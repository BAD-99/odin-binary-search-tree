class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array, sorted) {
    if (!sorted) {
      array = [...new Set(array)].sort((a, b) => a - b);
    }
    const middleIndex = parseInt(array.length / 2);
    const mid = new Node(array[middleIndex]);
    if (middleIndex !== 0) {
      mid.left = this.buildTree(array.slice(0, middleIndex), true);
    }
    if (middleIndex + 1 !== array.length) {
      mid.right = this.buildTree(array.slice(middleIndex + 1), true);
    }
    return mid;
  }

  insert(value) {
    let node = this.root;
    let targetNode = null;
    while (targetNode === null) {
      if (value === node.value) {
        return false;
      }
      let nextNode = value < node.value ? node.left : node.right;
      if (nextNode) {
        node = nextNode;
      } else {
        targetNode = node;
      }
    }
    if (value < targetNode.value) {
      targetNode.left = new Node(value);
    } else {
      targetNode.right = new Node(value);
    }
    return true;
  }

  deleteItem(value, startNode) {
    let targetNode = null;
    let parentNode = startNode || this.root;
    let nextNode = parentNode;
    while (targetNode === null) {
      if (value === nextNode.value) {
        targetNode = nextNode;
      } else {
        parentNode = nextNode;
        nextNode = value < nextNode.value ? nextNode.left : nextNode.right;
        if (nextNode === null) {
          return false;
        }
      }
    }

    const replaceValue = (replacement) => {
      if (value === parentNode.value) {
        if (replacement) {
          replacement.left = parentNode.left;
          replacement.right = parentNode.right;
        }
        parentNode = replacement;
        if (value === this.root.value) {
          this.root = parentNode;
        }
      } else if (parentNode.left === targetNode) {
        parentNode.left = replacement;
      } else {
        parentNode.right = replacement;
      }
    };

    if (targetNode.right && targetNode.left) {
      let nextLargest = targetNode.right;
      let nextLargestParent = targetNode;
      while (nextLargest.left) {
        nextLargestParent = nextLargest;
        nextLargest = nextLargest.left;
      }
      this.deleteItem(nextLargest.value, nextLargestParent);
      replaceValue(nextLargest);
    } else if (targetNode.right || targetNode.left) {
      let targetChild = targetNode.right ? targetNode.right : targetNode.left;
      replaceValue(targetChild);
    } else {
      replaceValue(null);
    }
    return true;
  }

  find(value) {
    let searchNode = this.root;
    while (value !== searchNode.value) {
      if (searchNode === null) {
        return null;
      }
      searchNode =
        value < searchNode.value ? searchNode.left : searchNode.right;
    }
    return searchNode;
  }
  levelOrder(callback) {
    let currentLevel = [this.root];
    while (currentLevel.length !== 0) {
      let temp = [];
      currentLevel.forEach((node) => {
        if (node) {
          temp.push(node.right, node.left);
          callback(node);
        }
      });
      currentLevel = temp;
    }
  }
  inOrder(callback, node = this.root) {
    if (node) {
      this.inOrder(callback, node.left);
      callback(node);
      this.inOrder(callback, node.right);
    }
  }
  preOrder(callback, node = this.root) {
    if (node) {
      callback(node);
      this.inOrder(callback, node.left);
      this.inOrder(callback, node.right);
    }
  }
  postOrder(callback, node = this.root) {
    if (node) {
      this.inOrder(callback, node.left);
      this.inOrder(callback, node.right);
      callback(node);
    }
  }
  height(node) {
    let height = 0;
    let currentLevel = [node];
    while (currentLevel.length !== 0) {
      height++;
      let temp = [];
      currentLevel.forEach((n) => {
        if (n.left != null) {
          temp.push(n.left);
        }
        if (n.right != null) {
          temp.push(n.right);
        }
      });
      currentLevel = temp;
    }
    return height;
  }
  depth(node) {
    let currentNode = this.root;
    let depth = 0;
    while (currentNode != null) {
      depth++;
      if (node === currentNode) {
        return depth;
      }
      if (node.value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  isBalanced() {
    let min = null;
    let max = 0;
    let arr = [this.root];
    while (arr.length !== 0) {
      max++;
      if (min !== null && max - min > 1) {
        return false;
      }
      let temp = [];
      arr.forEach((n) => {
        if (n.left) {
          temp.push(n.left);
        }
        if (n.right) {
          temp.push(n.right);
        }
        if (!min && !n.left && !n.right) {
          min = max;
        }
      });
      arr = temp;
    }
    return true;
  }
  rebalance() {
    let arr = [];
    this.inOrder((node) => {
      arr.push(node.value);
    });
    this.root = this.buildTree(arr, true);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arr = [];
for (let i = 0; i < 100; i++) {
  arr.push(parseInt(100 * Math.random()));
}
let tree = new Tree(arr);
console.log(tree.isBalanced);
let printArr = [];
const cb = (node) => {
  printArr.push(node.value);
};
const printAndClear = () => {
  console.table(printArr);
  printArr = [];
};
tree.levelOrder(cb);
printAndClear();
tree.preOrder(cb);
printAndClear();
tree.inOrder(cb);
printAndClear();
tree.postOrder(cb);
printAndClear();

for (let i = 0; i < 25; i++) {
  tree.insert(parseInt(100 * Math.random() + 100));
}

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

tree.levelOrder(cb);
printAndClear();
tree.preOrder(cb);
printAndClear();
tree.inOrder(cb);
printAndClear();
tree.postOrder(cb);
printAndClear();

// tree.deleteItem(tree.root.value);
// console.log(tree.find(13));
// console.log(tree.insert(420));
// console.log(tree.insert(420));
// prettyPrint(tree.root);
