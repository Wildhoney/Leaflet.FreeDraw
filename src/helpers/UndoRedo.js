export default function UndoRedo() {
  const operations = [];
  let top = 0;
  let length = 0;

  return {
    do(data) {
      if (top === length) {
        operations.push(data);
        length++;
        top++;
      }
      if (top < length) {
        operations.splice(top, length - top, data);
        top++;
        length = top;
      }
      return data;
    },
    undo() {
      if (top > 0) {
        return operations[--top];
      }
      return operations[top];
    },
    redo() {
      if (top < length) {
        return operations[++top];
      }
      return operations[top];
    }
  };
}