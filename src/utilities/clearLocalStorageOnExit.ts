export const clearLocalStorageOnExit = () => {
  window.addEventListener("beforeunload", () => localStorage.clear());
  window.addEventListener("unload", () => localStorage.clear());
};
