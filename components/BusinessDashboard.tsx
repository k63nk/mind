import React, { useState } from 'react';
import { User } from '../types';
import { backend } from '../services/backendService';
import NotificationCenter from './NotificationCenter';

interface BusinessDashboardProps {
  currentUser: User;
  onLogout: () => void;
  onNavigateToJobManagement: () => void;
  onNavigateToPostJob: () => void;
  onNavigateToCandidateManagement: () => void;
}

const BusinessDashboard: React.FC<BusinessDashboardProps> = ({ 
  currentUser, 
  onLogout, 
  onNavigateToJobManagement, 
  onNavigateToPostJob,
  onNavigateToCandidateManagement
}) => {
  const [notifications, setNotifications] = useState(backend.getNotifications(currentUser.id));
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const allJobs = backend.getJobs();
  const companyJobs = allJobs.filter(j => j.companyName === 'TechNova Global' || j.companyId === currentUser.id);
  const companyJobIds = companyJobs.map(j => j.id);
  
  const allApps = backend.getApplications();
  const companyApps = allApps.filter(app => companyJobIds.includes(app.jobId));
  
  const totalCandidates = companyApps.length;
  const hiredCount = companyApps.filter(a => a.status === 'HIRED').length;
  const failedCount = companyApps.filter(a => a.status === 'FAILED').length;
  const totalPosts = companyJobs.length;

  const handleMarkAsRead = (id: string) => {
    backend.markNotificationAsRead(id);
    setNotifications(backend.getNotifications(currentUser.id));
  };

  return (
    <div className="bg-[#0f172a] text-slate-100 antialiased h-screen flex overflow-hidden font-display">
      {/* Left Navigation Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#1e293b] border-r border-[#334155] flex flex-col h-full">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1392ec] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1392ec]/20">
            <span className="material-symbols-outlined text-2xl font-bold">psychology</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[#1392ec] leading-none uppercase italic">MindTrace</h1>
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-1">Recruit Pro</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          <div className="py-4">
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Menu chính</p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1392ec] text-white font-bold transition-all shadow-lg shadow-[#1392ec]/20 text-left">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm uppercase tracking-wider">Tổng quan</span>
            </button>
            <button 
              onClick={onNavigateToJobManagement}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all text-left mt-1"
            >
              <span className="material-symbols-outlined">article</span>
              <span className="text-sm uppercase tracking-wider font-bold">Tin tuyển dụng</span>
            </button>
            <button 
              onClick={onNavigateToPostJob}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all text-left mt-1"
            >
              <span className="material-symbols-outlined">add_box</span>
              <span className="text-sm uppercase tracking-wider font-bold">Đăng tin mới</span>
            </button>
            <button 
              onClick={onNavigateToCandidateManagement}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all text-left mt-1"
            >
              <span className="material-symbols-outlined">group</span>
              <span className="text-sm uppercase tracking-wider font-bold">Quản lý ứng viên</span>
            </button>
          </div>
          <div className="py-4 border-t border-slate-800">
            <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Hỗ trợ & Cài đặt</p>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all text-left">
              <span className="material-symbols-outlined">analytics</span>
              <span className="text-sm uppercase tracking-wider font-bold">Báo cáo chi tiết</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all text-left mt-1">
              <span className="material-symbols-outlined">settings</span>
              <span className="text-sm uppercase tracking-wider font-bold">Cài đặt doanh nghiệp</span>
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-900/10 transition-all text-left mt-1"
            >
              <span className="material-symbols-outlined">logout</span>
              <span className="text-sm uppercase tracking-wider font-bold">Đăng xuất</span>
            </button>
          </div>
        </nav>
        {/* Company Footer Info */}
        <div className="p-4 border-t border-[#334155] bg-[#0f172a]/50">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-slate-700 bg-cover bg-center border border-slate-600" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDaEGIiELh660Lm_HzrseIe11KUOyr_riTO-NuyflYTy3P0lbQcNnKrzu7wBnRDcg9Z7jt5-qeCK9EXrF09FYJgMegUQOMDtASqcijHQj-Sv-geeb-aOZvnWH00x-r4ZYS5wsjI5hGMR14n-xEluadcsy_kilM0e0_iyaJ6z_bqFcR38RaNcdLQMXb01TYp58wT3tRC68M6jjJa6eJvjy47UFY70zi7Bx_7UEQKxZr7LxcDBUDV_aKZuk5BjsVb-F4SQBj9y0mWJMc')" }}></div>
            <div className="overflow-hidden">
              <p className="text-xs font-black uppercase tracking-tight truncate text-white">TechNova Global</p>
              <p className="text-[9px] font-bold uppercase tracking-widest text-[#1392ec]">Gói Enterprise</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0f172a]">
        {/* Header Section */}
        <header className="h-16 flex items-center justify-between px-8 bg-[#0f172a] border-b border-[#334155] flex-shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border-none rounded-lg focus:ring-2 focus:ring-[#1392ec]/50 text-sm transition-all placeholder:text-slate-600 text-slate-200 font-medium" 
                placeholder="Tìm kiếm ứng viên, tin tuyển dụng..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter 
              notifications={notifications} 
              onMarkAsRead={handleMarkAsRead} 
            />
            <button className="p-2 text-slate-400 hover:bg-[#1e293b] rounded-full transition-colors">
              <span className="material-symbols-outlined">help_outline</span>
            </button>
            <div className="h-8 w-px bg-[#334155] mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-xs font-black uppercase tracking-tight text-white group-hover:text-[#1392ec] transition-colors">{currentUser.name}</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Quản trị viên</p>
              </div>
              <div 
                className="size-9 rounded-full bg-slate-700 bg-cover bg-center border-2 border-[#1392ec] shadow-lg shadow-[#1392ec]/10" 
                style={{ backgroundImage: `url('${currentUser.avatar}')` }}
              ></div>
            </div>
          </div>
        </header>

        {/* Main Scrollable Dashboard Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {/* Page Title Area */}
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Chào buổi sáng, TechNova</h2>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Đây là báo cáo hoạt động tuyển dụng tính đến hôm nay.</p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-xl bg-[#1e293b] border border-[#334155] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all text-slate-300">
                <span className="material-symbols-outlined text-sm">download</span>
                Xuất báo cáo
              </button>
              <button 
                onClick={onNavigateToPostJob}
                className="px-5 py-2.5 rounded-xl bg-[#1392ec] text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-[#1392ec]/20 hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Đăng tin mới
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Posts */}
            <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-[#1392ec]/10 text-[#1392ec]">
                  <span className="material-symbols-outlined">post_add</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +8%
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Tổng số bài đăng</p>
              <h3 className="text-4xl font-black mt-2 text-white italic">{totalPosts}</h3>
            </div>
            {/* Total Candidates */}
            <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                  <span className="material-symbols-outlined">person_search</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +12%
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Tổng số ứng viên</p>
              <h3 className="text-4xl font-black mt-2 text-white italic">{totalCandidates.toLocaleString()}</h3>
            </div>
            {/* Pass */}
            <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-xs">trending_up</span> +5%
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Số lượng Đỗ (Pass)</p>
              <h3 className="text-4xl font-black mt-2 text-white italic">{hiredCount}</h3>
            </div>
            {/* Fail */}
            <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-red-500/10 text-red-500">
                  <span className="material-symbols-outlined">cancel</span>
                </div>
                <span className="text-[10px] font-black text-red-500 flex items-center gap-1 bg-red-500/10 px-2 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-xs">trending_down</span> -2%
                </span>
              </div>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Số lượng Trượt (Fail)</p>
              <h3 className="text-4xl font-black mt-2 text-white italic">{failedCount}</h3>
            </div>
          </div>

          {/* Chart Section */}
          <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-2xl">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Phân tích ứng viên theo thời gian</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Theo dõi lưu lượng ứng tuyển vào các vị trí</p>
              </div>
              <div className="inline-flex p-1 bg-[#0f172a] rounded-xl border border-[#334155]">
                <button className="px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg hover:text-[#1392ec] transition-all text-slate-500">Tuần</button>
                <button className="px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg bg-[#1e293b] text-[#1392ec] shadow-lg transition-all">Tháng</button>
                <button className="px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg hover:text-[#1392ec] transition-all text-slate-500">Năm</button>
              </div>
            </div>
            {/* Chart Mockup */}
            <div className="relative h-[300px] w-full mt-4 flex items-end justify-between gap-6 px-4">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full h-px bg-slate-800/50"></div>
                ))}
              </div>
              {[40, 65, 50, 90, 70, 55, 80].map((h, i) => (
                <div key={i} className="relative flex-1 bg-[#1392ec]/20 hover:bg-[#1392ec]/40 rounded-t-xl transition-all group" style={{ height: `${h}%` }}>
                  {i === 3 && <div className="absolute inset-0 bg-[#1392ec] rounded-t-xl shadow-lg shadow-[#1392ec]/20"></div>}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 shadow-xl whitespace-nowrap">
                    {Math.round(h * 3.1)} Ứng viên
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              <span>Tháng 1</span>
              <span>Tháng 2</span>
              <span>Tháng 3</span>
              <span className="text-[#1392ec]">Tháng 4 (Hiện tại)</span>
              <span>Tháng 5</span>
              <span>Tháng 6</span>
              <span>Tháng 7</span>
            </div>
          </div>

          {/* Table Section */}
          <div className="p-8 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Vị trí đang tuyển dụng hiệu quả nhất</h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Xếp hạng dựa trên tỷ lệ chuyển đổi và số lượng ứng viên</p>
              </div>
              <button className="text-[#1392ec] text-[10px] font-black uppercase tracking-widest hover:underline">Xem tất cả</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">
                    <th className="pb-5 pl-2">Vị trí</th>
                    <th className="pb-5">Phòng ban</th>
                    <th className="pb-5">Ứng viên</th>
                    <th className="pb-5">Hiệu quả</th>
                    <th className="pb-5 text-right pr-2">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {[
                    { title: "Senior Product Designer", code: "UX", dept: "Product Team", count: 245, trend: "+12%", perf: 85, color: "#1392ec" },
                    { title: "Backend Engineer (Node.js)", code: "JS", dept: "Engineering", count: 182, trend: "+4%", perf: 72, color: "#f59e0b" },
                    { title: "Growth Marketing Manager", code: "MK", dept: "Marketing", count: 96, trend: "0%", perf: 45, color: "#a855f7" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="py-5 pl-2">
                        <div className="flex items-center gap-4">
                          <div className="size-10 rounded-xl flex items-center justify-center font-black text-xs shadow-lg" style={{ backgroundColor: `${row.color}20`, color: row.color }}>{row.code}</div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-[#1392ec] transition-colors">{row.title}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Cập nhật {i === 0 ? '2 giờ trước' : i === 1 ? '1 ngày trước' : '3 ngày trước'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 text-xs font-bold text-slate-400 uppercase tracking-wider">{row.dept}</td>
                      <td className="py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">{row.count}</span>
                          <span className={`text-[9px] font-black uppercase ${row.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-500'}`}>{row.trend}</span>
                        </div>
                      </td>
                      <td className="py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-1.5 bg-[#0f172a] rounded-full overflow-hidden border border-slate-800">
                            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${row.perf}%`, backgroundColor: row.perf > 80 ? '#10b981' : row.perf > 60 ? '#1392ec' : '#64748b' }}></div>
                          </div>
                          <span className="text-[10px] font-black text-white">{row.perf}%</span>
                        </div>
                      </td>
                      <td className="py-5 text-right pr-2">
                        <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-white transition-all">
                          <span className="material-symbols-outlined text-xl">more_vert</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessDashboard;
