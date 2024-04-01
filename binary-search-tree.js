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
    let node = startNode || this.root;
    let targetNode = null;
    if (node.value === value) {
      targetNode = node;
    }
    while (targetNode === null) {
      let nextNode = value < node.value ? node.left : node.right;
      if (nextNode === null) {
        break;
      }
      if (nextNode.value === value) {
        targetNode = nextNode;
      } else {
        node = nextNode;
      }
    }
    if (targetNode === null) {
      return false;
    }
    let childNode = null;
    if (targetNode.left && targetNode.right) {
      childNode = targetNode.right;
      let parentNode = null;
      while (childNode.left !== null) {
        parentNode = childNode;
        childNode = childNode.left;
      }
      if(parentNode === null){
      }
    } else if (targetNode.left || targetNode.right) {
      childNode = targetNode.left ? targetNode.left : targetNode.right;
    }
    if (targetNode === node.left) {
      node.left = childNode;
    } else {
      node.right = childNode;
    }
    return true;
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
