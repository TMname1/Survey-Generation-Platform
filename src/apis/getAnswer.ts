export const getAnswer = async (uuid: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ uuid }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/get-answer', requestOptions);
  const data = await response.json();
  // console.log('Register response:', data);
  return data;
};
