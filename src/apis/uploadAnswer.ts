import { type SurveyItem } from '@/stores/survey.ts';

/**
 * 将问卷答案上传到服务器
 * @param uuid
 * @param survey
 * @returns
 */
export const uploadAnswer = async (uuid: string, survey: SurveyItem[]) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ uuid, survey }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/upload-answer', requestOptions);
  const data = await response.json();
  // console.log('Register response:', data);
  return data;
};
