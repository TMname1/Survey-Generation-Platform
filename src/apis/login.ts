export const loginUser = async (username: string, password: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, password }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/login-user', requestOptions);
  const data = await response.json();
  // console.log('Login response:', data);
  return data;
};
