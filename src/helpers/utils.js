export function optionsFindIndex(options, needle) {
  return options.findIndex((option) => option.value === needle);
}

export function optionsUniq(options) {
  return options.filter((option, idx) => idx === optionsFindIndex(options, option.value));
}

export function debounce(func, delay) {
  let lastTimer = null;

  return function (args) {
    if (lastTimer !== null) {
      clearTimeout(lastTimer);
    }

    lastTimer = setTimeout(() => {
      lastTimer = null;
      func(args);
    }, delay);
  };
}
