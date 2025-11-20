export const safeRedirect = (path: string) => {
  if (typeof window !== "undefined") {
    window.location.href = path;
  }
};
