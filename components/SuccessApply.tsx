import React from 'react';
import { User } from '../types';

interface SuccessApplyProps {
  currentUser: User;
  onBackToDashboard: () => void;
  onViewApplications: () => void;
}

const SuccessApply: React.FC<SuccessApplyProps> = ({ currentUser, onBackToDashboard, onViewApplications }) => {
  return (
    <div className="min-h-screen bg-[#0a0f14] flex flex-col text-slate-100 font-display">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-slate-800 px-6 md:px-10 py-3 bg-[#0a0f14]/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="text-[#1392ec]">
            <svg className="size-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fillRule="evenodd"></path>
            </svg>
          </div>
          <h2 className="text-white text-xl font-black leading-tight tracking-tight uppercase italic">MindTrace</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#1392ec]/10 text-[#1392ec] hover:bg-[#1392ec]/20 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div 
            className="h-10 w-10 rounded-full bg-slate-700 bg-cover bg-center border border-slate-600 shadow-md" 
            style={{ backgroundImage: `url('${currentUser.avatar}')` }}
          ></div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-[640px] w-full bg-[#111821] rounded-2xl shadow-2xl border border-slate-800 p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1392ec]/20 rounded-full blur-2xl"></div>
              <div className="relative bg-[#1392ec] text-white rounded-full p-6 shadow-lg shadow-[#1392ec]/30">
                <span className="material-symbols-outlined !text-6xl">check_circle</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase italic">Bạn đã nộp CV thành công!</h1>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-md mx-auto font-medium">
            Hệ thống AI của <span className="text-[#1392ec] font-bold">MindTrace</span> đang phân tích hồ sơ của bạn. Vui lòng chờ trong giây lát (thường mất 2-3 phút).
          </p>

          {/* Progress Section */}
          <div className="bg-[#0a0f14]/50 rounded-2xl p-6 mb-8 border border-slate-800">
            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#1392ec]/20 border-t-[#1392ec]"></div>
              <div className="text-center">
                <p className="text-white font-black text-lg mb-1 uppercase tracking-tight">
                  Đang phân tích hồ sơ...
                </p>
                <div className="flex items-center justify-center gap-2 text-slate-500 font-bold bg-[#111821] px-4 py-2 rounded-full shadow-sm border border-slate-800">
                  <span className="material-symbols-outlined text-base text-[#1392ec]">schedule</span>
                  <span className="text-xs uppercase tracking-widest">Ước tính: 2-3 phút</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="italic text-[10px] text-slate-600 font-bold uppercase tracking-widest">Vui lòng không đóng trình duyệt</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onBackToDashboard}
              className="flex-1 sm:flex-none px-8 py-3.5 bg-[#1392ec] hover:bg-[#1181d1] text-white font-black rounded-xl transition-all shadow-xl shadow-[#1392ec]/20 flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
            >
              <span className="material-symbols-outlined text-lg">dashboard</span>
              Quay lại Bảng điều khiển
            </button>
            <button 
              onClick={onViewApplications}
              className="flex-1 sm:flex-none px-8 py-3.5 bg-[#0a0f14] hover:bg-slate-800 text-slate-400 font-black rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-800 uppercase text-xs tracking-widest"
            >
              <span className="material-symbols-outlined text-lg">description</span>
              Xem CV đã nộp
            </button>
          </div>
        </div>
      </main>

      {/* Footer Background Visual */}
      <div className="h-32 w-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 100%, #1392ec, transparent 70%)' }}>
      </div>
    </div>
  );
};

export default SuccessApply;
