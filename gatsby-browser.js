const ReactDOM = require("react-dom");

exports.shouldUpdateScroll = () => {
  window.scrollTo(0, 0)
  return false
}

exports.replaceHydrateFunction = () => {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback);
  };
};