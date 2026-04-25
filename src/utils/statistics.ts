export function calculateSingleChoiceStats(
  answers: unknown[],
  options: string[],
): Record<string, { count: number; percent: number }> {
  const stats: Record<string, { count: number; percent: number }> = {};

  options.forEach((option) => {
    stats[option] = { count: 0, percent: 0 };
  });

  answers.forEach((answer) => {
    if (
      answer !== null &&
      answer !== undefined &&
      answer !== '' &&
      options.includes(answer as string)
    ) {
      const answerStr = answer as string;
      const stat = stats[answerStr];
      if (stat) {
        stat.count++;
      }
    }
  });

  const totalValidAnswers = Object.values(stats).reduce((sum, stat) => sum + stat.count, 0);

  if (totalValidAnswers > 0) {
    Object.keys(stats).forEach((option) => {
      const stat = stats[option];
      if (stat) {
        stat.percent = Math.round((stat.count / totalValidAnswers) * 100);
      }
    });
  }

  return stats;
}

export function calculateMultipleChoiceStats(
  answers: unknown[],
  options: string[],
): Record<string, { count: number; percent: number }> {
  const stats: Record<string, { count: number; percent: number }> = {};

  options.forEach((option) => {
    stats[option] = { count: 0, percent: 0 };
  });

  answers.forEach((answer) => {
    if (answer !== null && answer !== undefined) {
      // 多个选择题的答案是一个数组
      if (Array.isArray(answer)) {
        answer.forEach((selectedOption: unknown) => {
          const optionStr = selectedOption as string;
          if (optionStr && options.includes(optionStr)) {
            const stat = stats[optionStr];
            if (stat) {
              stat.count++;
            }
          }
        });
      } else if (typeof answer === 'string' && answer !== '') {
        // 也可能是单个字符串（可能是旧数据或特殊情况）
        if (options.includes(answer)) {
          const stat = stats[answer];
          if (stat) {
            stat.count++;
          }
        }
      }
    }
  });

  // 对于多个选择题，我们计算选择次数的百分比（不是回答者百分比）
  // 每个回答者可以选择多个选项，所以总选择次数可能大于回答者数量
  const totalSelections = Object.values(stats).reduce((sum, stat) => sum + stat.count, 0);

  if (totalSelections > 0) {
    Object.keys(stats).forEach((option) => {
      const stat = stats[option];
      if (stat) {
        stat.percent = Math.round((stat.count / totalSelections) * 100);
      }
    });
  }

  return stats;
}

export function calculateDropdownChoiceStats(
  answers: unknown[],
  options: string[],
): Record<string, { count: number; percent: number }> {
  // 下拉选择题和单选题的统计逻辑相同
  return calculateSingleChoiceStats(answers, options);
}

import type { SurveyItem } from '@/stores/survey';

export function calculateAllQuestionStats(
  surveyAnswers: unknown[][],
  surveyItems: SurveyItem[],
): Array<Record<string, { count: number; percent: number }> | null> {
  if (!surveyAnswers || surveyAnswers.length === 0) {
    return surveyItems.map(() => null);
  }

  const questionAnswers: unknown[][] = [];
  const questionCount = surveyAnswers[0]?.length || 0;

  for (let i = 0; i < questionCount; i++) {
    questionAnswers.push(
      surveyAnswers.map((respondent) => {
        if (
          respondent[i] &&
          typeof respondent[i] === 'object' &&
          'answer' in (respondent[i] as object)
        ) {
          return (respondent[i] as { answer: unknown }).answer;
        }
        return respondent[i];
      }),
    );
  }

  return surveyItems.map((item, index) => {
    if (index >= questionAnswers.length) return null;

    const answers = questionAnswers[index] || [];

    if (!item.options || !Array.isArray(item.options)) {
      return null;
    }

    switch (item.type) {
      case '单选题':
        return calculateSingleChoiceStats(answers, item.options);
      case '多选题':
        return calculateMultipleChoiceStats(answers, item.options);
      case '下拉选择题':
        return calculateDropdownChoiceStats(answers, item.options);
      default:
        return null;
    }
  });
}
