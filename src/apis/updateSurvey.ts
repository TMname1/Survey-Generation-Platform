import { type SurveyItem } from '@/stores/survey.ts';
import { type surveyInfoType } from '@/views/EditorView.vue';

export type databaseSurveyType = [...SurveyItem[], surveyInfoType];

export const updateSurvey = async (
  username: string,
  authorization: string,
  survey: databaseSurveyType,
) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({ username, authorization, survey }),
    redirect: 'follow' as RequestRedirect,
  };

  const response = await fetch('https://sdb5cjl3wk.sealosbja.site/update-survey', requestOptions);
  const data = await response.json();
  // console.log('Register response:', data);
  return data;
};
