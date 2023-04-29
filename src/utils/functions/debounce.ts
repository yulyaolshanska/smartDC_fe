//@ts-ignore
export const debounce = (fn, ms) => {
  //@ts-ignore
  let timeout;
  return function () {
    const fnCall = () => {
      //@ts-ignore
      fn.apply(this, arguments);
    }; //@ts-ignore
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms);
  };
};
export const mock = []; // TODO typescript
