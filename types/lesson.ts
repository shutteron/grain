export type LessonLevel =
  | "intro"
  | "basic"
  | "intermediate"
  | "advanced"
  | "field";

export type LessonCategory =
  | "term"
  | "trouble"
  | "genre"
  | "lighting"
  | "setting";

export type ImageExample = {
  title: string;
  description: string;
  images?: {
    label: string;
    src: string;
    description?: string;
  }[];
  beforeImage?: string;
  afterImage?: string;
};

export type Lesson = {
  id: string;
  title: string;
  level: LessonLevel;
  category: LessonCategory;
  tags: string[];
  summary: string;
  beginnerExplanation: string;
  fieldUse: string;
  commonMistakes: string[];
  junichiNote: string;
  practice: string;
  relatedIds: string[];
  imageExamples?: ImageExample[];
};
