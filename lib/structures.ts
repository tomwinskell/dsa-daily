// Shared data structures and helpers for problems that need them.
// Tests build inputs with the from* helpers and compare outputs with the to* helpers,
// so solution stubs only ever deal with plain ListNode / TreeNode objects.

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function listFromArray(values: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  return head;
}

export function listToArray(head: ListNode | null, limit = 100_000): number[] {
  const out: number[] = [];
  let node = head;
  while (node && out.length < limit) {
    out.push(node.val);
    node = node.next;
  }
  return out;
}

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/** Build a tree from a level-order array where null marks a missing child, e.g. [3, 9, 20, null, null, 15, 7]. */
export function treeFromArray(values: (number | null)[]): TreeNode | null {
  if (values.length === 0 || values[0] === null) return null;
  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < values.length) {
    const node = queue.shift()!;
    if (i < values.length && values[i] !== null) {
      node.left = new TreeNode(values[i] as number);
      queue.push(node.left);
    }
    i++;
    if (i < values.length && values[i] !== null) {
      node.right = new TreeNode(values[i] as number);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

/** Level-order array with null for missing children and trailing nulls trimmed. */
export function treeToArray(root: TreeNode | null): (number | null)[] {
  if (!root) return [];
  const out: (number | null)[] = [];
  const queue: (TreeNode | null)[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (node === null) {
      out.push(null);
      continue;
    }
    out.push(node.val);
    queue.push(node.left, node.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}
