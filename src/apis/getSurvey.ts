export const getSurvey = async (username: string, authorization: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, authorization }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/get-survey', requestOptions);
  const {
    data: { survey },
  } = await response.json();
  // console.log(survey);
  return survey;
};
