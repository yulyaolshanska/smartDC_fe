const cookie = {
  set: (name: string, value: string, days: number): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()}`;
  },

  get: (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  },

  delete: (name: string): void => {
    document.cookie = `${name}=;expires=Thu, 10 Jan 1000 00:00:00 GMT;`;
  },
};
export default cookie;
