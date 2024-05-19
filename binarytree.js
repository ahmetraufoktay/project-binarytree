const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array.sort((a, b) => a - b);
    this.root = this.buildTree(this.array);
  }
  buildTree(array = [], start = 0, end = array.length - 1) {
    if (start > end) return null;

    let midIndex = Math.floor((start + end) / 2);

    const root = new TreeNode(array[midIndex]);
    root.left = this.buildTree(array, start, midIndex - 1);
    root.right = this.buildTree(array, midIndex + 1, end);

    return root;
  }

  insert(value) {
    let temp = this.root;
    while (true) {
      if (temp.data > value && temp.right !== null) {
        temp = temp.left;
      } else if (temp.data < value && temp.left !== null) {
        temp = temp.right;
      } else break;
    }
    if (temp.data > value) {
      temp.left = new TreeNode(value);
    } else if (temp.data < value) {
      temp.right = new TreeNode(value);
    }
  }

  find(value) {
    let temp = this.root;
    while (true) {
      if (temp === null) {
        console.log("This array does not include your value");
        break;
      } else if (temp.data === value) {
        break;
      } else if (temp.data > value) {
        temp = temp.left;
      } else if (temp.data < value) {
        temp = temp.right;
      }
    }
  }

  deleteItem(value) {
    let temp = this.root;
    let previous = null;

    while (temp !== null && temp.data !== value) {
      previous = temp;
      if (value < temp.data) {
        temp = temp.left;
      } else {
        temp = temp.right;
      }
    }

    if (temp === null) {
      console.log("Value not found in the tree");
      return;
    }

    if (temp.left === null && temp.right === null) {
      /* NO CHILD */
      if (temp === this.root) {
        this.root = null;
      } else if (previous.left === temp) {
        previous.left = null;
      } else {
        previous.right = null;
      }
    } else if (temp.left === null || temp.right === null) {
      /* ONE CHILD */
      const child = temp.left !== null ? temp.left : temp.right;

      if (temp === this.root) {
        this.root = child;
      } else if (previous.left === temp) {
        previous.left = child;
      } else {
        previous.right = child;
      }
    } else {
      /* TWO CHILD */
      let parentreplacor = temp;
      let replacor = temp.right;

      while (child.left !== null) {
        parent = child;
        child = child.left;
      }

      temp.data = child.data;

      if (parent !== temp) {
        parent.left = child.right;
      } else {
        parent.right = child.right;
      }
    }
  }
}

function levelOrder(root) {
  const result = [];

  function traverse(node, index) {
    if (!node) return;

    result[index] = node.data;

    traverse(node.left, 2 * index + 1);
    traverse(node.right, 2 * index + 2);
  }

  traverse(root, 0);
  return result.filter((value) => value !== undefined);
}

function preOrder(root, array = []) {
  if (root == null) return;

  array.push(root.data);

  preOrder(root.left, array);
  preOrder(root.right, array);

  return array;
}

function inOrder(root, array = []) {
  if (root == null) return;

  inOrder(root.left, array);
  array.push(root.data);
  inOrder(root.right, array);

  return array;
}

function postOrder(root, array = []) {
  if (root == null) return;

  postOrder(root.left, array);
  postOrder(root.right, array);
  array.push(root.data);

  return array;
}

function height(root) {
  if (root == null) return 0;

  return Math.max(height(root.left), height(root.right)) + 1;
}

function isBalanced(root) {
  if (root == null) return true;

  let lHeight = height(root.left);
  let rHeight = height(root.right);

  if (Math.abs(lHeight - rHeight) > 1) return false;

  return isBalanced(root.left) && isBalanced(root.right);
}

function rebalance(root) {
  let tree = preOrder(root);
  tree = tree.sort((a, b) => a - b);
  return buildTree(tree);
}

function buildTree(array = [], start = 0, end = array.length - 1) {
  if (start > end) return null;

  let midIndex = Math.floor((start + end) / 2);

  const root = new TreeNode(array[midIndex]);
  root.left = buildTree(array, start, midIndex - 1);
  root.right = buildTree(array, midIndex + 1, end);

  return root;
}

const mytree = new Tree([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
prettyPrint(mytree.root);
prettyPrint(rebalance(mytree.root));
