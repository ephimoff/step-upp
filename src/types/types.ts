export type SkillType = {
  id?: string;
  name: string;
  score?: number | null;
  feedbackScores?: number | null;
  actions?: number | null;
};

export type FeedbackScoreType = {
  id: string;
  score: number;
  date: Date;
  appraiser: ProfileType;
  profileId: string;
  appraisee: any;
};

export type ProfileSkillType = {
  id: string;
  profileId: string;
  score: number;
  feedbackScores: FeedbackScoreType[];
  skill: SkillType[];
  skillId: string;
};

export type CompetencyType = {
  id?: string;
  name: string;
  skills?: SkillType[];
};

export type ProfileType = {
  id: string;
  name: string;
  slug: string;
  email: string;
  userpic: string;
  title: string;
  team: string;
  phone: string;
  twitter: string;
  linkedin: string;
  github: string;
  userId?: string;
  competencies?: CompetencyType[];
  skills?: ProfileSkillType[];
};

export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: string | null;
  image: string;
  role: string;
  profile: ProfileType;
};
