function getGoogleOauthURL(): string {
  const rootUrl = import.meta.env.VITE_REACT_APP_GOOGLE_ROOT_URL;
  const options = {
    redirect_uri: import.meta.env.VITE_REACT_APP_GOOGLE_REDIRECT_URI,
    client_id: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
}
export default getGoogleOauthURL;
