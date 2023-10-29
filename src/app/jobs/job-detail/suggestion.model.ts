export interface Suggestion {
  id: string;
  job: string;
  author: string;
  translation: [{language: string,textQuestion: string,textResponse: string}]
}
