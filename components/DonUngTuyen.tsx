
import React, { useEffect, useState } from 'react';
import { User, Application, Job } from '../types';
import { backend } from '../services/backendService';

interface DonUngTuyenProps {
  currentUser: User;
  onBack: () => void;
  onLogout: () => void;
  onNavigateToExercises: () => void;
  onStartTest: (id: string) => void;
  onNavigateToProfile: () => void;
}

const DonUngTuyen: React.FC<DonUngTuyenProps> = ({ currentUser, onBack, onLogout, onNavigateToExercises, onStartTest, onNavigateToProfile }) => {
  const [apps, setApps] = useState<Application[]>([]);
  const [allJobs, setAllJobs] = useState<Job[]>([]);

  useEffect(() => {
    const userApps = backend.getApplicationsByStudent(currentUser.id);
    const jobs = backend.getJobs();
    setApps(userApps);
    setAllJobs(jobs);
  }, [currentUser.id]);

  const getJobDetails = (jobId: string) => {
    return allJobs.find(j => j.id === jobId);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f14] text-slate-100 font-display">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-[#111821] flex flex-col h-full shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1392ec] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#1392ec]/20">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase italic text-left">MindTrace</h1>
            <p className="text-[10px] text-[#1392ec] font-bold tracking-widest uppercase">Student Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button 
            onClick={onBack}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors text-left"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Bảng điều khiển</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1392ec] text-white font-semibold text-left shadow-lg shadow-[#1392ec]/20">
            <span className="material-symbols-outlined">work_history</span>
            <span className="text-sm">Đơn ứng tuyển</span>
          </button>
          <button 
            onClick={onNavigateToExercises}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors text-left"
          >
            <span className="material-symbols-outlined">science</span>
            <span className="text-sm">Kho luyện tập AI</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors text-left">
            <span className="material-symbols-outlined">search</span>
            <span className="text-sm">Việc làm mới</span>
          </button>
          <button 
            onClick={onNavigateToProfile}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors text-left"
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm">Hồ sơ cá nhân</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors text-left">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Cài đặt</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-900/10 transition-colors text-left"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0f14]">
        <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-[#0a0f14]/80 backdrop-blur-md border-b border-slate-800">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">Đơn ứng tuyển của {currentUser.name}</h2>
            <p className="text-sm text-slate-400">Bạn đang có {apps.length} đơn ứng tuyển trong hệ thống.</p>
          </div>
          <div className="flex items-center gap-4">
            <div 
              onClick={onNavigateToProfile}
              className="h-10 w-10 rounded-full bg-slate-700 bg-cover bg-center border border-slate-600 shadow-md cursor-pointer hover:border-[#1392ec] transition-all" 
              style={{ backgroundImage: `url('${currentUser.avatar}')` }}
            ></div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
          {apps.length === 0 ? (
            <div className="bg-[#111821] p-20 rounded-[2rem] border border-slate-800 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-6xl text-slate-700 mb-6">description</span>
              <h3 className="text-2xl font-bold text-white mb-2">Chưa có đơn ứng tuyển nào</h3>
              <p className="text-slate-500 mb-8 max-w-sm">Hãy khám phá các cơ hội nghề nghiệp thực tế và bắt đầu xây dựng profile của bạn.</p>
              <button 
                onClick={onBack}
                className="bg-[#1392ec] text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg shadow-[#1392ec]/20"
              >
                Khám phá ngay
              </button>
            </div>
          ) : (
            <div className="bg-[#111821] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/40 border-b border-slate-800">
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Vị trí & Công ty</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Ngày ứng tuyển</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Điểm AI</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Trạng thái</th>
                      <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {apps.map((app) => {
                      const job = getJobDetails(app.jobId);
                      return (
                        <tr key={app.id} className="hover:bg-slate-800/20 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white mb-0.5 group-hover:text-[#1392ec] transition-colors leading-none">
                                {job?.title || "Vị trí không xác định"}
                              </span>
                              <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                                {job?.companyName || "Công ty ẩn danh"}
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <span className="text-xs text-slate-400 font-mono font-medium">{app.appliedDate}</span>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="inline-flex items-center justify-center px-3 py-1 rounded-lg font-mono font-bold text-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              {app.cvScore}%
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                              app.status === 'CV_PASSED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                              app.status === 'CV_REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-[10px] font-black text-[#1392ec] hover:underline flex items-center gap-1 ml-auto uppercase tracking-widest group/btn">
                              Xem chi tiết <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">chevron_right</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DonUngTuyen;
