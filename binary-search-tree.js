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
  }

  deleteItem(value, startNode) {
    let targetNode = null;
    let parentNode = startNode || this.root;
    let nextNode = parentNode;
    if (value === parentNode.value) {
    }
    while (targetNode === null) {
      if (value === nextNode.value) {
        targetNode = nextNode;
      } else {
        parentNode = nextNode;
        let nextNode = value < nextNode.value ? nextNode.left : nextNode.right;
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
    /*
  /find the target node and the parent node
  if there are no children then remove it from parent
  if there is one child then make it the child of the parent
  if there are both children find the next biggest child, delete it and 
  replace the target with it
  */
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
for (let i = 0; i < 24; i++) {
  arr.push(parseInt(100 * Math.random()));
}
let tree = new Tree(arr);
prettyPrint(tree.root);
