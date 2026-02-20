import React, { useState } from 'react';
import { User } from '../types';

interface QuanLyUngVienProps {
  currentUser: User;
  onBack: () => void;
  onLogout: () => void;
  onNavigateToJobManagement: () => void;
  onNavigateToPostJob: () => void;
}

const QuanLyUngVien: React.FC<QuanLyUngVienProps> = ({ 
  currentUser, 
  onBack, 
  onLogout, 
  onNavigateToJobManagement,
  onNavigateToPostJob
}) => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="bg-[#0f172a] text-slate-100 antialiased h-screen flex overflow-hidden font-display">
      {/* Left Navigation Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-[#1e293b] border-r border-[#334155] flex flex-col h-full">
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
            <button 
              onClick={onBack}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all text-left"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm uppercase tracking-wider font-bold">Tổng quan</span>
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
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1392ec] text-white font-bold transition-all shadow-lg shadow-[#1392ec]/20 text-left mt-1">
              <span className="material-symbols-outlined">group</span>
              <span className="text-sm uppercase tracking-wider">Quản lý ứng viên</span>
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

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0f172a]">
        {/* Header Section */}
        <header className="h-16 flex items-center justify-between px-8 bg-[#0f172a] border-b border-[#334155] flex-shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
              <input 
                className="w-full pl-10 pr-4 py-2 bg-[#1e293b] border-none rounded-lg focus:ring-2 focus:ring-[#1392ec]/50 text-sm transition-all placeholder:text-slate-600 text-slate-200 font-medium" 
                placeholder="Tìm kiếm ứng viên, vị trí..." 
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:bg-[#1e293b] rounded-full relative transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
            </button>
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

        {/* Page Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tight">Quản lý Ứng tuyển</h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Theo dõi hành trình và đánh giá ứng viên với sự hỗ trợ của AI.</p>
              </div>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 rounded-xl bg-[#1e293b] border border-[#334155] text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:bg-slate-800 transition-all text-slate-300">
                  <span className="material-symbols-outlined text-sm">download</span>
                  Xuất báo cáo
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-[#1392ec] text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-[#1392ec]/20 hover:brightness-110 transition-all">
                  <span className="material-symbols-outlined text-sm">add</span>
                  Thêm ứng viên
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Tổng ứng viên</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black text-white italic">1,284</h3>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+12.5%</span>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Đang chờ duyệt</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black text-white italic">42</h3>
                  <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg uppercase tracking-widest">Ổn định</span>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Mời phỏng vấn</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black text-white italic">15</h3>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">+4%</span>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-[#1e293b] border border-[#334155] shadow-xl">
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">Điểm AI trung bình</p>
                <div className="flex items-center justify-between">
                  <h3 className="text-4xl font-black text-white italic">78<span className="text-sm not-italic text-slate-600 ml-1">/100</span></h3>
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-[#1392ec]"></span>
                    <span className="size-2 rounded-full bg-[#1392ec]"></span>
                    <span className="size-2 rounded-full bg-[#1392ec]/30"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center bg-[#1e293b] rounded-xl p-1 border border-[#334155]">
                <button 
                  onClick={() => setActiveFilter('all')}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeFilter === 'all' ? 'bg-[#233948] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Tất cả
                </button>
                <button 
                  onClick={() => setActiveFilter('date')}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeFilter === 'date' ? 'bg-[#233948] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Theo ngày nộp
                </button>
                <button 
                  onClick={() => setActiveFilter('score')}
                  className={`px-6 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeFilter === 'score' ? 'bg-[#233948] text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Theo AI Score
                </button>
              </div>
              <div className="h-8 w-px bg-[#334155] hidden md:block"></div>
              <select className="bg-[#1e293b] border-[#334155] rounded-xl text-[10px] font-black uppercase tracking-widest px-5 py-2.5 focus:ring-[#1392ec] outline-none text-slate-300 cursor-pointer">
                <option>Tất cả vị trí</option>
                <option>Senior UI/UX Designer</option>
                <option>Backend Developer</option>
                <option>Marketing Manager</option>
              </select>
              <select className="bg-[#1e293b] border-[#334155] rounded-xl text-[10px] font-black uppercase tracking-widest px-5 py-2.5 focus:ring-[#1392ec] outline-none text-slate-300 cursor-pointer">
                <option>Mọi trạng thái</option>
                <option>Đang chờ chấm bài</option>
                <option>Đã pass CV</option>
                <option>Đã nộp bài test</option>
                <option>Đã mời phỏng vấn</option>
              </select>
            </div>

            {/* Candidate Table Card */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f172a]/30 border-b border-[#334155] text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="px-8 py-5">Ứng viên</th>
                      <th className="px-8 py-5">Vị trí</th>
                      <th className="px-8 py-5">AI CV Score</th>
                      <th className="px-8 py-5">Trạng thái</th>
                      <th className="px-8 py-5 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {[
                      { name: "Lê Hồng Hạnh", email: "hanh.le@example.com", initial: "LH", job: "Senior UI/UX Designer", score: 92, status: "Đã mời phỏng vấn", statusColor: "emerald" },
                      { name: "Trần Tuấn Anh", email: "tuananh.t@gmail.com", initial: "TA", job: "Backend Developer", score: 85, status: "Đã nộp bài test", statusColor: "blue" },
                      { name: "Phạm Thu Trang", email: "trang.thu@outlook.com", initial: "PT", job: "Marketing Manager", score: 64, status: "Đang chờ chấm bài", statusColor: "amber" },
                      { name: "Vũ Minh Đức", email: "duc.vu@fpt.com.vn", initial: "VD", job: "Junior Frontend Dev", score: 79, status: "Đã pass CV", statusColor: "emerald" },
                      { name: "Nguyễn Kim Ngân", email: "ngankim.hr@gmail.com", initial: "NK", job: "Content Specialist", score: 88, status: "Đang chờ chấm bài", statusColor: "amber" }
                    ].map((candidate, i) => (
                      <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-[#1392ec]/10 flex items-center justify-center text-[#1392ec] font-black text-xs shadow-lg border border-[#1392ec]/20">{candidate.initial}</div>
                            <div>
                              <p className="text-sm font-bold text-white group-hover:text-[#1392ec] transition-colors">{candidate.name}</p>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{candidate.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-wider">{candidate.job}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-32 h-1.5 bg-[#0f172a] rounded-full overflow-hidden border border-slate-800">
                              <div className={`h-full rounded-full transition-all duration-1000 ${candidate.score > 80 ? 'bg-emerald-500' : 'bg-[#1392ec]'}`} style={{ width: `${candidate.score}%` }}></div>
                            </div>
                            <span className="text-[10px] font-black text-white">{candidate.score}/100</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                            candidate.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                            candidate.statusColor === 'blue' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }`}>
                            {candidate.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="text-[10px] font-black text-[#1392ec] uppercase tracking-widest hover:underline">Xem chi tiết</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="px-8 py-5 bg-[#0f172a]/20 border-t border-[#334155] flex items-center justify-between">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hiển thị 1 - 5 của 1,284 ứng viên</p>
                <div className="flex items-center gap-2">
                  <button className="size-8 flex items-center justify-center rounded-lg border border-[#334155] text-slate-500 hover:bg-slate-800 transition-colors disabled:opacity-30" disabled>
                    <span className="material-symbols-outlined text-lg">chevron_left</span>
                  </button>
                  <button className="size-8 flex items-center justify-center rounded-lg bg-[#1392ec] text-white text-xs font-black shadow-lg shadow-[#1392ec]/20">1</button>
                  <button className="size-8 flex items-center justify-center rounded-lg border border-[#334155] text-slate-500 hover:bg-slate-800 text-xs font-black transition-colors">2</button>
                  <button className="size-8 flex items-center justify-center rounded-lg border border-[#334155] text-slate-500 hover:bg-slate-800 text-xs font-black transition-colors">3</button>
                  <button className="size-8 flex items-center justify-center rounded-lg border border-[#334155] text-slate-500 hover:bg-slate-800 transition-colors">
                    <span className="material-symbols-outlined text-lg">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="bg-[#1392ec]/5 rounded-2xl p-8 border border-[#1392ec]/20 flex items-start gap-6 shadow-xl">
              <div className="p-3 rounded-xl bg-[#1392ec]/10 text-[#1392ec]">
                <span className="material-symbols-outlined text-2xl">auto_awesome</span>
              </div>
              <div>
                <h4 className="text-sm font-black text-[#1392ec] uppercase tracking-widest">Tối ưu hóa bởi AI</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-medium">
                  Hệ thống AI vừa cập nhật điểm CV cho 12 ứng viên mới dựa trên bộ tiêu chuẩn kỹ năng mới nhất. 
                  Hãy kiểm tra các ứng viên có điểm trên 85 để tiến hành phỏng vấn ngay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuanLyUngVien;
