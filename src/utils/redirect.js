const redirect = (history, path, time) => {
  setTimeout(() => {
    history.push(path);
  }, time);
};

export default redirect;
