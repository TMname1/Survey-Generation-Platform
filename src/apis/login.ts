export const loginUser = async (username?: string, password?: string, authorization?: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const body = authorization ? { authorization } : { username, password };

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/login-user', requestOptions);
  const data = await response.json();
  // console.log('Login response:', data);
  return data;
};
