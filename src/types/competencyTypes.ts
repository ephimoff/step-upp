export interface SkillType {
  name: string;
  score?: number | null;
  score360?: number | null;
  actions?: number | null;
}

export type CompetencyType = {
  id?: string;
  name: string;
  skills?: SkillType[];
};
