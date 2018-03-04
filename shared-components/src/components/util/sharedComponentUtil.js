export const SELECT = "select";
export const INPUT = "input";
export const CHECKBOX = "checkbox";

export function debounceInput(F, delay = 200) {
  let id;
  return function debouncer() {
    clearTimeout(id);
    id = setTimeout(() => F.apply(this, arguments), delay);
  };
}

export function forceReload(nextHref) {
  const origin = window.location.origin;
  const href = window.location.href;
  if (`${origin}${nextHref}` === href) {
      window.location.reload();
  } else {
      window.location.href = nextHref;
  }
}

export function getErrorMessage(error) {
  if (error.response && error.response.data) {
    return error.response.data;
  }

  if (error.responseText) {
    return error.responseText;
  }

  if (error.message) {
    return error.message;
  }

  if (error.status && error.statusText) {
    return `${error.status} - ${error.statusText}`;
  }

  return "Something went wrong.";
}

