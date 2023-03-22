import { Optional } from 'utility-types';

import type {
  Membership,
  Workspace,
  Plan,
  User,
  Skill,
  Profile,
  Competency,
  WorkspaceAccess,
} from '@prisma/client';

export type SkillType = Optional<Skill, 'id' | 'competencyId'> & {
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

export type CompetencyType = Optional<Competency, 'id'> & {
  skills?: SkillType[];
};

export type ProfileType = Profile & {
  competencies?: CompetencyType[];
  skills?: ProfileSkillType[];
};

export type UserType = User & {
  profile: ProfileType;
};

export type WorkspaceType = Workspace & {
  plan: Plan;
};

export type MembershipType = Membership & {
  workspace: WorkspaceType;
};
