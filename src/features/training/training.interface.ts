export interface ITrainingParagraph {
  text: string;
}

export interface ITrainingStep {
  number: number;
  title: string;
  description?: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  responsibilities?: {
    partner: string[];
    host: string[];
  };
}

export interface IBulletPointWithSub {
  text: string;
  subBullets?: string[];
}

export interface ISituationItem {
  title: string;
  description: string;
}

export interface ITrainingModule {
  id: string;
  title: string;
  introText?: string;
  steps?: ITrainingStep[];
  numberedList?: string[];
  bulletPoints?: (string | IBulletPointWithSub)[];
  situations?: ISituationItem[];
}

export interface ITrainingCategory {
  id: string;
  title: string;
  modules: ITrainingModule[];
}

export interface IFAQItem {
  id: string;
  question: string;
  answer: string;
}
