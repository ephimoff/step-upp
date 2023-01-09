export type SkillType = {
  name: string;
  score?: number | null;
  score360?: number | null;
  actions?: number | null;
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
};
