export default function Stack() {
  let stack = [];
  return {
    pop() {
      return stack.pop();
    },
    push(data) {
      stack.push(data);
    },
    clear() {
      stack = [];
    },
    length() {
      return stack.length;
    }
  }
}