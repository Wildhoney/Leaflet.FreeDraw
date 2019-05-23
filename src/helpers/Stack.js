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
    },
    filter(fn) {
      stack = stack.filter(fn);
    },
    log(str) {
      // for debugging, printing etc
      console.log(str, stack.map(s => s.type))
    },
  }
}