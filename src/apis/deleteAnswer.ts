/**
 * 将服务器问卷答案删除
 * @param uuid
 * @returns
 */
export const deleteAnswer = async (uuid: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ uuid }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/delete_answer', requestOptions);
  const data = await response.json();
  // console.log('Register response:', data);
  return data;
};
