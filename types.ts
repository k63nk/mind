
export type Role = 'student' | 'business';
export type ApplicationStatus = 'APPLIED' | 'CV_PASSED' | 'CV_REJECTED' | 'TEST_SUBMITTED' | 'INTERVIEW_INVITED' | 'REJECTED';
export type JobCategory = 'IT' | 'Marketing' | 'Finance' | 'Design' | 'Business';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  skills?: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  requirements: string[];
  location: string;
  salary: string;
  category: JobCategory;
  deadline: string;
  tag: string;
  isHot?: boolean;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  cvContent: string;
  cvScore: number;
  aiFeedback: string;
  status: ApplicationStatus;
  appliedDate: string;
  testSubmission?: string;
  companyScore?: number;
  companyFeedback?: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  company: string;
  description: string;
  tag: string;
  time: string;
  difficulty: 'DỄ' | 'TRUNG BÌNH' | 'KHÓ';
  diffColor: 'emerald' | 'orange' | 'red';
  category: JobCategory;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning';
}

export interface AIScoreResult {
  score: number;
  feedback: string;
  recommendations: string[];
}
