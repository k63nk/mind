
import { User, Job, Application, ApplicationStatus, PracticeExercise, Notification, ExerciseResult } from '../types';
import { evaluateCVAgainstJob, generateMarketData } from './geminiService';

const STORAGE_KEYS = {
  USERS: 'mt_db_users',
  JOBS: 'mt_db_jobs',
  APPLICATIONS: 'mt_db_applications',
  EXERCISES: 'mt_db_exercises',
  EXERCISE_RESULTS: 'mt_db_exercise_results',
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
        postedDate: '10/02/2026',
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
        postedDate: '15/02/2026',
        tag: 'PRO'
      }
    ];

    const momoExercise: PracticeExercise = {
      id: 'momo-1',
      company: 'Momo E-Wallet',
      title: 'Tăng tỷ lệ chuyển đổi nạp tiền điện thoại',
      description: 'Cải thiện UI/UX của tính năng top-up để giảm thiểu số bước thao tác và tăng trải nghiệm người dùng.',
      tag: 'Product Design',
      time: '30 phút',
      difficulty: 'TRUNG BÌNH',
      diffColor: 'orange',
      category: 'Design'
    };

    const allJobs = [...hardcodedJobs, ...jobs];
    const allExercises = [momoExercise, ...exercises];

    if (allJobs.length > 0) {
      this.setStorage(STORAGE_KEYS.JOBS, allJobs);
      this.setStorage(STORAGE_KEYS.EXERCISES, allExercises);
      
      // Seed a mock result for the Momo exercise if a user exists
      const currentUser = this.getCurrentUser();
      if (currentUser) {
        this.saveExerciseResult({
          exerciseId: 'momo-1',
          studentId: currentUser.id,
          score: 88,
          feedback: "Giải pháp thiết kế rất tốt, tập trung vào trải nghiệm người dùng thực tế.",
          strengths: ["Giao diện trực quan", "Giảm thiểu bước thao tác", "Sử dụng màu sắc hợp lý"],
          weaknesses: ["Cần thêm các micro-interactions"],
          recommendations: ["Nghiên cứu thêm về hành vi người dùng Gen Z"],
          completedDate: new Date().toLocaleDateString('vi-VN')
        });
      }
      
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
    let jobs = this.getStorage<Job[]>(STORAGE_KEYS.JOBS, []);
    const now = new Date();
    let needsUpdate = false;

    // Auto-expire jobs
    jobs = jobs.map(job => {
      if (job.tag !== 'CLOSED' && job.deadline) {
        let deadlineDate: Date | null = null;
        if (job.deadline.includes('-')) {
          deadlineDate = new Date(job.deadline);
        } else if (job.deadline.includes('/')) {
          const parts = job.deadline.split('/');
          if (parts.length === 3) {
            const [d, m, y] = parts.map(Number);
            deadlineDate = new Date(y, m - 1, d, 23, 59, 59);
          }
        } else if (/^\d{4}$/.test(job.deadline)) {
          deadlineDate = new Date(Number(job.deadline), 11, 31, 23, 59, 59);
        }

        if (deadlineDate && !isNaN(deadlineDate.getTime()) && deadlineDate < now) {
          needsUpdate = true;
          return { ...job, tag: 'CLOSED' };
        }
      }
      return job;
    });

    if (needsUpdate) {
      this.setStorage(STORAGE_KEYS.JOBS, jobs);
    }
    
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
          postedDate: '10/02/2026',
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
          postedDate: '15/02/2026',
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
    const allApps = this.getApplicationsByStudent(studentId);
    
    // Filter to latest per job
    const latestAppsMap = new Map<string, Application>();
    allApps.forEach(app => {
      const existing = latestAppsMap.get(app.jobId);
      if (!existing || app.id > existing.id) {
        latestAppsMap.set(app.jobId, app);
      }
    });
    
    const apps = Array.from(latestAppsMap.values());
    const passedCount = apps.filter(a => a.status === 'CV_PASSED' || a.status === 'HIRED' || a.status === 'TEST_SUBMITTED').length;
    const interviewCount = apps.filter(a => a.status === 'INTERVIEW_CONFIRMED').length;
    const avgScore = apps.length > 0 
      ? Math.round(apps.reduce((acc, curr) => acc + curr.cvScore, 0) / apps.length) 
      : 0;

    return {
      totalApplications: apps.length,
      passedCount,
      interviewCount,
      avgScore,
      recentApps: apps.sort((a, b) => b.id.localeCompare(a.id)).slice(0, 3)
    };
  }

  getExercises(): PracticeExercise[] {
    const exercises = this.getStorage<PracticeExercise[]>(STORAGE_KEYS.EXERCISES, []);
    const hasMomo = exercises.some(ex => ex.id === 'momo-1');
    
    if (!hasMomo) {
      const momoExercise: PracticeExercise = {
        id: 'momo-1',
        company: 'Momo E-Wallet',
        title: 'Tăng tỷ lệ chuyển đổi nạp tiền điện thoại',
        description: 'Cải thiện UI/UX của tính năng top-up để giảm thiểu số bước thao tác và tăng trải nghiệm người dùng.',
        tag: 'Product Design',
        time: '30 phút',
        difficulty: 'TRUNG BÌNH',
        diffColor: 'orange',
        category: 'Design'
      };
      exercises.unshift(momoExercise);
      this.setStorage(STORAGE_KEYS.EXERCISES, exercises);
    }
    
    return exercises;
  }

  saveExerciseResult(result: ExerciseResult) {
    const results = this.getStorage<ExerciseResult[]>(STORAGE_KEYS.EXERCISE_RESULTS, []);
    // Update existing result or add new one
    const index = results.findIndex(r => r.exerciseId === result.exerciseId && r.studentId === result.studentId);
    if (index !== -1) {
      results[index] = result;
    } else {
      results.push(result);
    }
    this.setStorage(STORAGE_KEYS.EXERCISE_RESULTS, results);
  }

  getExerciseResults(studentId: string): ExerciseResult[] {
    const results = this.getStorage<ExerciseResult[]>(STORAGE_KEYS.EXERCISE_RESULTS, []);
    
    // For demo purposes, if Momo result is missing, add it
    const hasMomoResult = results.some(r => r.exerciseId === 'momo-1' && r.studentId === studentId);
    if (!hasMomoResult) {
      const mockResult: ExerciseResult = {
        exerciseId: 'momo-1',
        studentId: studentId,
        score: 88,
        feedback: "Giải pháp thiết kế rất tốt, tập trung vào trải nghiệm người dùng thực tế.",
        strengths: ["Giao diện trực quan", "Giảm thiểu bước thao tác", "Sử dụng màu sắc hợp lý"],
        weaknesses: ["Cần thêm các micro-interactions"],
        recommendations: ["Nghiên cứu thêm về hành vi người dùng Gen Z"],
        completedDate: new Date().toLocaleDateString('vi-VN')
      };
      results.push(mockResult);
      this.setStorage(STORAGE_KEYS.EXERCISE_RESULTS, results);
    }
    
    return results.filter(r => r.studentId === studentId);
  }

  createJob(jobData: Partial<Job>): Job {
    const jobs = this.getStorage<Job[]>(STORAGE_KEYS.JOBS, []);
    const newJob: Job = {
      id: `job_${Date.now()}`,
      companyId: jobData.companyId || 'c_default',
      companyName: jobData.companyName || 'Unknown Company',
      title: jobData.title || 'Untitled Position',
      description: jobData.description || '',
      requirements: jobData.requirements || [],
      location: jobData.location || 'Remote',
      salary: jobData.salary || 'Thỏa thuận',
      category: jobData.category || 'Business',
      deadline: jobData.deadline || '',
      tag: jobData.tag || 'PRO',
      benefits: jobData.benefits || '',
      testAssignment: jobData.testAssignment || '',
      minScore: jobData.minScore || 75,
      isHot: jobData.isHot || false,
      postedDate: new Date().toLocaleDateString('vi-VN')
    };
    jobs.unshift(newJob);
    this.setStorage(STORAGE_KEYS.JOBS, jobs);
    return newJob;
  }

  updateJob(jobId: string, jobData: Partial<Job>): Job | null {
    const jobs = this.getStorage<Job[]>(STORAGE_KEYS.JOBS, []);
    const index = jobs.findIndex(j => j.id === jobId);
    if (index === -1) return null;

    const updatedJob = { ...jobs[index], ...jobData };
    jobs[index] = updatedJob;
    this.setStorage(STORAGE_KEYS.JOBS, jobs);
    return updatedJob;
  }

  async createApplication(studentId: string, jobId: string, cvContent: string, cvFileName: string): Promise<Application> {
    const apps = this.getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
    const jobs = this.getJobs();
    const job = jobs.find(j => j.id === jobId);
    
    // Evaluate CV using AI
    const evaluation = await evaluateCVAgainstJob(
      cvContent, 
      job?.title || "Unknown", 
      job?.description || "",
      job?.requirements || []
    );
    const minScore = job?.minScore || 70;
    
    const newApp: Application = {
      id: `app_${Date.now()}`,
      jobId,
      studentId,
      cvFileName,
      cvContent,
      cvScore: evaluation.score,
      aiFeedback: evaluation.feedback,
      status: evaluation.score >= minScore ? 'CV_PASSED' : 'CV_REJECTED',
      appliedDate: new Date().toLocaleDateString('vi-VN'),
      testStartTime: evaluation.score >= minScore ? new Date().toISOString() : undefined
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

  updateApplication(appId: string, appData: Partial<Application>): Application | null {
    const apps = this.getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
    const index = apps.findIndex(a => a.id === appId);
    if (index === -1) return null;

    const updatedApp = { ...apps[index], ...appData };
    apps[index] = updatedApp;
    this.setStorage(STORAGE_KEYS.APPLICATIONS, apps);
    return updatedApp;
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

  getNotifications(userId: string): Notification[] {
    const all = this.getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    return all.filter(n => n.userId === userId);
  }

  getApplications(): Application[] {
    return this.getStorage<Application[]>(STORAGE_KEYS.APPLICATIONS, []);
  }

  getUserById(userId: string): User | null {
    const users = this.getStorage<User[]>(STORAGE_KEYS.USERS, []);
    return users.find(u => u.id === userId) || null;
  }

  markNotificationAsRead(notifId: string) {
    const all = this.getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
    const index = all.findIndex(n => n.id === notifId);
    if (index !== -1) {
      all[index].isRead = true;
      this.setStorage(STORAGE_KEYS.NOTIFICATIONS, all);
    }
  }
}

export const backend = new BackendService();
