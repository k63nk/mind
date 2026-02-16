
import { User, Job, Application, ApplicationStatus, PracticeExercise, Notification } from '../types';
import { evaluateCVAgainstJob, generateMarketData } from './geminiService';

const STORAGE_KEYS = {
  USERS: 'mt_db_users',
  JOBS: 'mt_db_jobs',
  APPLICATIONS: 'mt_db_applications',
  EXERCISES: 'mt_db_exercises',
  NOTIFICATIONS: 'mt_db_notifications',
  CURRENT_USER: 'mt_db_current_session'
};

class BackendService {
  private getStorage<T>(key: string, defaultValue: T): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  private setStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Database Initialization: Gọi AI để tạo dữ liệu nếu database trống
   */
  async initializeDatabase(): Promise<boolean> {
    const existingJobs = this.getJobs();
    if (existingJobs.length > 0) return false;

    console.log("Seeding database with AI intelligence...");
    const { jobs, exercises } = await generateMarketData();
    
    if (jobs.length > 0) {
      this.setStorage(STORAGE_KEYS.JOBS, jobs);
      this.setStorage(STORAGE_KEYS.EXERCISES, exercises);
      return true;
    }
    return false;
  }

  // --- User / Auth ---
  login(email: string, role: 'student' | 'business'): User {
    const users = this.getStorage<User[]>(STORAGE_KEYS.USERS, []);
    let user = users.find(u => u.email === email);

    if (!user) {
      user = {
        id: `u_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name: email.split('@')[0].toUpperCase(),
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        skills: ['Analysis', 'Problem Solving']
      };
      users.push(user);
      this.setStorage(STORAGE_KEYS.USERS, users);
    }

    this.setStorage(STORAGE_KEYS.CURRENT_USER, user);
    return user;
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  getCurrentUser(): User | null {
    return this.getStorage<User | null>(STORAGE_KEYS.CURRENT_USER, null);
  }

  // --- Job Database ---
  getJobs(): Job[] {
    return this.getStorage<Job[]>(STORAGE_KEYS.JOBS, []);
  }

  searchJobs(query: string, category?: string): Job[] {
    let jobs = this.getJobs();
    if (query) {
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(query.toLowerCase()) || 
        j.companyName.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (category && category !== 'Tất cả') {
      jobs = jobs.filter(j => j.category === category);
    }
    return jobs;
  }

  // --- Applications ---
  async applyToJob(jobId: string, studentId: string, cvContent: string): Promise<Application> {
    const job = this.getJobs().find(j => j.id === jobId);
    if (!job) throw new Error("Job not found");

    const aiResult = await evaluateCVAgainstJob(cvContent, job.title, job.description);
    const status: ApplicationStatus = aiResult.score >= 75 ? 'CV_PASSED' : 'CV_REJECTED';

    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId,
      studentId,
      cvContent,
      cvScore: aiResult.score,
      aiFeedback: aiResult.feedback,
      status,
      appliedDate: new Date().toLocaleDateString('vi-VN')
    };

    const apps = this.getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
    apps.push(newApp);
    this.setStorage(STORAGE_KEYS.APPLICATIONS, apps);

    // Create notification
    this.addNotification(studentId, 'Trạng thái ứng tuyển mới', 
      `AI đã chấm điểm CV của bạn cho vị trí ${job.title}: ${aiResult.score} điểm.`, status === 'CV_PASSED' ? 'success' : 'warning');

    return newApp;
  }

  getApplicationsByStudent(studentId: string): Application[] {
    const apps = this.getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
    return apps.filter(a => a.studentId === studentId);
  }

  // --- Practice & Exercise ---
  getExercises(): PracticeExercise[] {
    return this.getStorage<PracticeExercise[]>(STORAGE_KEYS.EXERCISES, []);
  }

  // --- Notifications ---
  getNotifications(userId: string): Notification[] {
    const all = this.getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return all.filter(n => n.userId === userId);
  }

  addNotification(userId: string, title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') {
    const all = this.getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      userId,
      title,
      message,
      time: 'Vừa xong',
      isRead: false,
      type
    };
    all.unshift(newNotif);
    this.setStorage(STORAGE_KEYS.NOTIFICATIONS, all);
  }
}

export const backend = new BackendService();
