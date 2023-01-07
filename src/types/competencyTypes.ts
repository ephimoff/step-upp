export type SkillType = {
  name: string;
  score?: number | null;
  score360?: number | null;
  actions?: number | null;
};

export type CompetencyType = {
  name: string;
  skills: SkillType[];
};
