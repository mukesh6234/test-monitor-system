export function titleize(str) {
  if (!str) {
    return str;
  }

  return str
    .split(" ")
    .map(function (string) {
      return string?.charAt(0).toUpperCase() + string.slice(1);
    })
    .join(" ")
    .split("_")
    .map(function (string) {
      return string?.charAt(0).toUpperCase() + string.slice(1);
    })
    .join(" ");
}

export function SliceName(str ) {
  if (!str) {
    return "Empty";
  }
  if (str.length > 23) {
    return str.slice(0, 23) + "...";
  }
  
  return str;
}

export async function kickUser() {
  await window.localStorage.clear();
  if (window.location.pathname !== "/login") {
    await window.location.reload();
  }
}