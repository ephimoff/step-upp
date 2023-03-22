import { Optional } from 'utility-types';

import type {
  Membership,
  Workspace,
  WorkspaceAccess,
  Plan,
  User,
  Skill,
  FeedbackScores,
  Profile,
  ProfileScores,
  ProfileCompetencies,
  Competency,
} from '@prisma/client';

export type SkillType = Optional<Skill, 'id' | 'competencyId'> & {
  // id?: string;
  // name: string;
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
  // id?: string;
  // name: string;
  skills?: SkillType[];
};

export type ProfileType = Profile & {
  // id: string;
  // name: string;
  // slug: string;
  // email: string;
  // userpic: string;
  // title: string;
  // team: string;
  // phone: string;
  // twitter: string;
  // linkedin: string;
  // github: string;
  // userId?: string;
  competencies?: CompetencyType[];
  skills?: ProfileSkillType[];
};

export type UserType = User & {
  // id: string;
  // name: string;
  // email: string;
  // emailVerified: string | null;
  // image: string;
  // role: string;
  profile: ProfileType;
};

export type WorkspaceType = Workspace & {
  plan: Plan;
};

export type MembershipType = Membership & {
  workspace: WorkspaceType;
};
