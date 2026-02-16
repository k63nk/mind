
import React from 'react';
import { User } from '../types';

interface HoSoCaNhanProps {
  currentUser: User;
  onBack: () => void;
  onLogout: () => void;
  onNavigateToApplications: () => void;
  onNavigateToExercises: () => void;
}

const HoSoCaNhan: React.FC<HoSoCaNhanProps> = ({ currentUser, onBack, onLogout, onNavigateToApplications, onNavigateToExercises }) => {
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
          <button 
            onClick={onNavigateToApplications}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors text-left"
          >
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
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1392ec] text-white font-semibold text-left shadow-lg shadow-[#1392ec]/20">
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm">Hồ sơ cá nhân</span>
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-1">
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
        <header className="sticky top-0 z-10 bg-[#0a0f14]/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div 
                className="h-28 w-28 rounded-2xl bg-slate-700 bg-cover bg-center border-4 border-[#1392ec]/20 shadow-2xl transition-transform group-hover:scale-105" 
                style={{ backgroundImage: `url('${currentUser.avatar}')` }}
              ></div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-black text-white mb-1 tracking-tight">{currentUser.name}</h2>
              <p className="text-[#1392ec] font-bold text-sm uppercase tracking-widest mb-4">Mã định danh: {currentUser.id}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-[#111821] border border-slate-800 px-5 py-2.5 rounded-2xl shadow-inner">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-1">Email kết nối</p>
                  <p className="text-lg font-black text-white">{currentUser.email}</p>
                </div>
                <div className="bg-[#111821] border border-slate-800 px-5 py-2.5 rounded-2xl shadow-inner">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-1">Kỹ năng phân tích</p>
                  <p className="text-lg font-black text-emerald-500">Expert</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-[#1392ec] hover:bg-[#1181d1] text-white font-black rounded-xl transition-all shadow-xl shadow-[#1392ec]/20 uppercase text-xs tracking-widest">
                Chỉnh sửa Profile
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
          <section className="bg-[#111821] p-8 rounded-[2rem] border border-slate-800 shadow-xl">
             <h3 className="text-xl font-bold text-white mb-6">Thông tin chi tiết</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-sm">Vai trò</span>
                    <span className="text-white font-bold uppercase">{currentUser.role}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-slate-800">
                    <span className="text-slate-500 text-sm">Trạng thái xác thực</span>
                    <span className="text-emerald-500 font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">verified</span> Verified
                    </span>
                  </div>
               </div>
               <div className="space-y-4">
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Đây là không gian hồ sơ cá nhân của bạn. Dữ liệu ứng tuyển và lịch sử luyện tập được AI lưu trữ riêng tư cho tài khoản <strong>{currentUser.email}</strong>.
                  </p>
               </div>
             </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HoSoCaNhan;
