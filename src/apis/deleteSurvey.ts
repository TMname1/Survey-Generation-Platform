import { type SurveyItem } from '@/stores/survey.ts';
import { type surveyInfoType } from '@/views/EditorView.vue';

export type databaseSurveyType = [...SurveyItem[], surveyInfoType];

export const deleteSurvey = async (username: string, uuid: string) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, uuid }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/delete-survey', requestOptions);
  const data = await response.json();
  // console.log('Register response:', data);
  return data;
};
