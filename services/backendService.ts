
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

  async initializeDatabase(): Promise<boolean> {
    const existingJobs = this.getJobs();
    if (existingJobs.length > 0) return false;

    const { jobs, exercises } = await generateMarketData();
    
    // Add hardcoded jobs to ensure they exist in the database
    const hardcodedJobs: Job[] = [
      {
        id: 'job_japanese',
        companyId: 'c_concentrix',
        companyName: 'Concentrix Services Vietnam',
        title: 'Chăm Sóc Khách Hàng Tiếng Nhật (N1/N2)',
        description: 'Chào đón bạn gia nhập đại gia đình Concentrix! Với vị trí Chăm sóc khách hàng tiếng Nhật, bạn sẽ là gương mặt đại diện kết nối thương hiệu với người dùng tại thị trường Nhật Bản.',
        requirements: ['N1/N2 Japanese', 'Customer Service skills'],
        location: 'TP. Hồ Chí Minh',
        salary: '23.2 Triệu VNĐ',
        category: 'Business',
        deadline: '31/12/2026',
        tag: 'HOT',
        isHot: true
      },
      {
        id: 'job_music',
        companyId: 'c_fpt_edu',
        companyName: 'Hệ thống giáo dục FPT',
        title: 'Giảng Viên Âm Nhạc - FSC LA',
        description: 'Chúng tôi đang tìm kiếm Giảng viên Âm nhạc nhiệt huyết để tham gia vào đội ngũ giáo dục tại phân hiệu Tây Ninh (FSC LA).',
        requirements: ['Đại học chuyên ngành Âm nhạc', 'Kỹ năng sư phạm'],
        location: 'Tây Ninh',
        salary: 'Thỏa thuận',
        category: 'Design',
        deadline: '2026',
        tag: 'PRO'
      }
    ];

    const allJobs = [...hardcodedJobs, ...jobs];

    if (allJobs.length > 0) {
      this.setStorage(STORAGE_KEYS.JOBS, allJobs);
      this.setStorage(STORAGE_KEYS.EXERCISES, exercises);
      return true;
    }
    return false;
  }

  login(email: string, role: 'student' | 'business'): User {
    const users = this.getStorage<User[]>(STORAGE_KEYS.USERS, []);
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = {
        id: `u_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name: email.split('@')[0].toUpperCase(),
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        skills: ['Analysis', 'Strategy']
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

  getJobs(): Job[] {
    const jobs = this.getStorage<Job[]>(STORAGE_KEYS.JOBS, []);
    
    // Ensure hardcoded jobs exist for the demo
    const hasJapanese = jobs.some(j => j.id === 'job_japanese');
    const hasMusic = jobs.some(j => j.id === 'job_music');
    
    if (!hasJapanese || !hasMusic) {
      const hardcodedJobs: Job[] = [
        {
          id: 'job_japanese',
          companyId: 'c_concentrix',
          companyName: 'Concentrix Services Vietnam',
          title: 'Chăm Sóc Khách Hàng Tiếng Nhật (N1/N2)',
          description: 'Chào đón bạn gia nhập đại gia đình Concentrix! Với vị trí Chăm sóc khách hàng tiếng Nhật, bạn sẽ là gương mặt đại diện kết nối thương hiệu với người dùng tại thị trường Nhật Bản.',
          requirements: ['N1/N2 Japanese', 'Customer Service skills'],
          location: 'TP. Hồ Chí Minh',
          salary: '23.2 Triệu VNĐ',
          category: 'Business',
          deadline: '31/12/2026',
          tag: 'HOT',
          isHot: true
        },
        {
          id: 'job_music',
          companyId: 'c_fpt_edu',
          companyName: 'Hệ thống giáo dục FPT',
          title: 'Giảng Viên Âm Nhạc - FSC LA',
          description: 'Chúng tôi đang tìm kiếm Giảng viên Âm nhạc nhiệt huyết để tham gia vào đội ngũ giáo dục tại phân hiệu Tây Ninh (FSC LA).',
          requirements: ['Đại học chuyên ngành Âm nhạc', 'Kỹ năng sư phạm'],
          location: 'Tây Ninh',
          salary: 'Thỏa thuận',
          category: 'Design',
          deadline: '2026',
          tag: 'PRO'
        }
      ];
      
      const updatedJobs = [...jobs];
      if (!hasJapanese) updatedJobs.push(hardcodedJobs[0]);
      if (!hasMusic) updatedJobs.push(hardcodedJobs[1]);
      
      this.setStorage(STORAGE_KEYS.JOBS, updatedJobs);
      return updatedJobs;
    }
    
    return jobs;
  }

  getApplicationsByStudent(studentId: string): Application[] {
    const apps = this.getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
    return apps.filter(a => a.studentId === studentId);
  }

  getStudentStats(studentId: string) {
    const apps = this.getApplicationsByStudent(studentId);
    const passedCount = apps.filter(a => a.status === 'CV_PASSED' || a.status === 'INTERVIEW_INVITED').length;
    const avgScore = apps.length > 0 
      ? Math.round(apps.reduce((acc, curr) => acc + curr.cvScore, 0) / apps.length) 
      : 0;

    return {
      totalApplications: apps.length,
      passedCount,
      avgScore,
      recentApps: apps.slice(-3).reverse()
    };
  }

  getExercises(): PracticeExercise[] {
    return this.getStorage<PracticeExercise[]>(STORAGE_KEYS.EXERCISES, []);
  }

  async createApplication(studentId: string, jobId: string, cvContent: string): Promise<Application> {
    const apps = this.getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
    const jobs = this.getJobs();
    const job = jobs.find(j => j.id === jobId);
    
    // Evaluate CV using AI
    const evaluation = await evaluateCVAgainstJob(cvContent, job?.title || "Unknown", job?.description || "");
    
    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId,
      studentId,
      cvContent,
      cvScore: evaluation.score,
      aiFeedback: evaluation.feedback,
      status: evaluation.score >= 70 ? 'CV_PASSED' : 'APPLIED',
      appliedDate: new Date().toLocaleDateString('vi-VN')
    };

    apps.push(newApp);
    this.setStorage(STORAGE_KEYS.APPLICATIONS, apps);
    
    this.addNotification(
      studentId, 
      'Ứng tuyển thành công', 
      `Bạn đã nộp hồ sơ cho vị trí ${job?.title || 'việc làm'}. Điểm CV: ${evaluation.score}/100`,
      evaluation.score >= 70 ? 'success' : 'info'
    );

    return newApp;
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
