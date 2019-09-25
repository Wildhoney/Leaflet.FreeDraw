const PubSub = () => {
    
    const state = {};

    const publish = (evtName, data) => {
      state[evtName].forEach(cb => {
        cb(data);
      });
    };

    const subscribe = (evtName, callback) => {
      state[evtName] = state[evtName] || [];
      state[evtName].push(callback);
  
      return () => {
        state[evtName] = state[evtName].filter(c => c !== callback);
      };
    };

    return {
      publish,
      subscribe,
    };
  };
  
  export const pubSub = PubSub();