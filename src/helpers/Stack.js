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
      empty(){
          if(stack.length) return false;
          return true;
      },
      top(){
        if(stack.length) { return stack[stack.length-1] ;}
        return 0;
      },
      show(){
        if(!stack.length) { return "I am empty!";}
       console.log(stack);
      }
    }
  }