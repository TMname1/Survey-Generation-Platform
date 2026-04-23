import type { SurveyItem } from '@/stores/survey.ts';

/**
 * 更新问卷
 * @param username
 * @param survey
 * @returns
 */
export const changeSurvey = async (username: string, survey: SurveyItem[]) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, survey }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/change-survey', requestOptions);
  const data = await response.json();
  // console.log('Register response:', data);
  return data;
};
