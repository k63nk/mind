
import React, { useState, useEffect } from 'react';

interface SVProps {
  onLogout: () => void;
  onStartPractice: (practiceId: string) => void;
  onNavigateToApplications: () => void;
  onNavigateToProfile: () => void;
}

const SV: React.FC<SVProps> = ({ onLogout, onStartPractice, onNavigateToApplications, onNavigateToProfile }) => {
  // State cho bộ đếm thời gian
  const [timeLeft, setTimeLeft] = useState(8045);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
  };

  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const score = 88;
  const offset = circumference - (score / 100) * circumference;

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
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1392ec] text-white font-semibold text-left shadow-lg shadow-[#1392ec]/20">
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
            onClick={() => onStartPractice('lt1')}
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
            <h2 className="text-2xl font-bold text-white tracking-tight">Chào mừng trở lại!</h2>
            <p className="text-sm text-slate-400">Bạn thuộc top 10% ứng viên tiềm năng trong tuần này. Cố gắng lên!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0f14]"></span>
            </button>
            <div 
              onClick={onNavigateToProfile}
              className="h-10 w-10 rounded-full bg-slate-700 bg-cover bg-center border border-slate-600 shadow-md cursor-pointer hover:border-[#1392ec] transition-all" 
              style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky')` }}
            ></div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
          {/* Section: Tiến trình ứng tuyển */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#1392ec] rounded-full"></span>
                Tiến trình ứng tuyển
              </h3>
              <button onClick={onNavigateToApplications} className="text-[#1392ec] text-sm font-semibold hover:underline">Xem tất cả đơn ứng tuyển</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#111821] p-6 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20 uppercase tracking-widest">Vòng 1: Lọc CV</span>
                  <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-white transition-colors">more_vert</span>
                </div>
                <h4 className="font-bold text-white mb-1 group-hover:text-[#1392ec] transition-colors">Chuyên viên Phân tích Sản phẩm</h4>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-6">Công ty Công nghệ Toàn Cầu</p>
                <div className="flex items-center gap-5 py-5 bg-slate-900/40 rounded-3xl px-5 border border-slate-800 shadow-inner">
                  <div className="relative flex items-center justify-center w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle className="text-slate-800" cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" strokeWidth="6" />
                      <circle className="text-emerald-500 transition-all duration-1000 ease-out" cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-lg font-black text-emerald-500 leading-none">{score}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">AI Match Score</p>
                    <p className="text-[11px] text-slate-300 font-medium leading-relaxed">Hồ sơ cực kỳ ấn tượng, vượt xa yêu cầu cơ bản.</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-emerald-500 text-[10px] font-black uppercase tracking-widest gap-2 bg-emerald-500/5 py-2 px-4 rounded-xl border border-emerald-500/10 w-fit">
                  <span className="material-symbols-outlined text-base fill-1">verified</span>
                  Đã vượt qua (Pass)
                </div>
              </div>

              <div className="bg-[#111821] p-6 rounded-[2rem] border-2 border-[#1392ec] shadow-2xl shadow-[#1392ec]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1392ec] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1392ec]"></span>
                  </span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-[#1392ec] text-white text-[10px] font-black rounded-full uppercase tracking-widest">Vòng 2: Bài test thực tế</span>
                </div>
                <h4 className="font-bold text-white mb-1">Chiến lược Thâm nhập Thị trường</h4>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-6">Tập đoàn Bán lẻ Quốc tế</p>
                <div className="bg-orange-500/5 border border-orange-500/10 p-5 rounded-[1.5rem] mb-6 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <span className="material-symbols-outlined text-lg animate-pulse">timer</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Thời gian còn lại</span>
                  </div>
                  <p className="text-3xl font-mono font-black text-orange-400 tracking-[0.15em]">
                    {formatTime(timeLeft)}
                  </p>
                </div>
                <button 
                   onClick={() => onStartPractice('test-1')}
                   className="group w-full py-4 bg-[#1392ec] hover:bg-[#1181d1] text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#1392ec]/20 active:scale-95 uppercase text-xs tracking-[0.15em]"
                >
                  <span>Bắt đầu làm bài</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>

              <div className="bg-[#111821] p-6 rounded-[2rem] border border-slate-800 shadow-sm opacity-60 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-slate-800 text-slate-500 text-[10px] font-black rounded-full border border-slate-700 uppercase tracking-widest">Vòng 3: Xét duyệt</span>
                </div>
                <h4 className="font-bold text-white mb-1">Tư vấn viên Cộng tác</h4>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-6">Stellar Advisories</p>
                <div className="flex flex-col gap-6 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20 shadow-md">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <div className="flex-1 h-px bg-slate-800"></div>
                    <div className="w-8 h-8 rounded-xl bg-[#1392ec]/10 text-[#1392ec] flex items-center justify-center border border-[#1392ec]/20 shadow-md animate-pulse">
                      <span className="material-symbols-outlined text-sm">pending</span>
                    </div>
                    <div className="flex-1 h-px bg-slate-800"></div>
                    <div className="w-8 h-8 rounded-xl bg-slate-900 text-slate-700 flex items-center justify-center border border-slate-800 shadow-md">
                      <span className="material-symbols-outlined text-sm">lock</span>
                    </div>
                  </div>
                  <p className="text-center text-[10px] font-black text-slate-500 bg-slate-900/60 py-2.5 rounded-xl uppercase tracking-widest">Hồ sơ đang được chuyên gia review</p>
                </div>
                <div className="mt-8 text-center">
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest opacity-60 italic">Dự kiến phản hồi: Thứ Sáu</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Kho luyện tập AI */}
          <section id="practice-section">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  Kho luyện tập AI
                </h3>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded uppercase border border-emerald-500/20 tracking-widest">AI Evaluated</span>
              </div>
              <button 
                onClick={() => onStartPractice('lt_all')}
                className="text-[10px] font-black py-2.5 px-6 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#1392ec] hover:border-[#1392ec]/50 transition-all uppercase tracking-widest"
              >
                Tất cả bài tập
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { id: 'lt1', title: 'Chiến lược tăng trưởng D2C', tag: 'Marketing', time: '15p', score: '92%', color: 'blue' },
                { id: 'lt2', title: 'Giữ chân người dùng Neo-Bank', tag: 'Fintech', time: '30p', score: null, color: 'purple' },
                { id: 'lt3', title: 'Tối ưu Chuỗi Cung ứng', tag: 'Operations', time: '45p', score: '78%', color: 'orange' },
                { id: 'lt4', title: 'Ưu tiên Tính năng Sản phẩm', tag: 'Product', time: '25p', score: null, color: 'indigo' },
              ].map((item, idx) => (
                <div 
                  key={item.id} 
                  onClick={() => onStartPractice(item.id)}
                  className="bg-[#111821] border border-slate-800 rounded-[2rem] overflow-hidden hover:border-[#1392ec]/50 transition-all group cursor-pointer shadow-lg hover:shadow-[#1392ec]/5"
                >
                  <div className="h-40 bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('https://picsum.photos/seed/${idx + 100}/400/200')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111821] via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-5 flex gap-2">
                      <span className={`px-2.5 py-1 bg-${item.color}-500/20 text-${item.color}-400 text-[9px] font-black rounded-lg uppercase tracking-wider backdrop-blur-md border border-white/5`}>{item.tag}</span>
                      <span className="px-2.5 py-1 bg-slate-900/60 text-slate-300 text-[9px] font-black rounded-lg uppercase tracking-wider backdrop-blur-md border border-white/5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">schedule</span> {item.time}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h5 className="font-bold text-white mb-3 group-hover:text-[#1392ec] transition-colors leading-snug tracking-tight">{item.title}</h5>
                    <p className="text-xs text-slate-500 mb-6 line-clamp-2 font-medium leading-relaxed">Luyện tập kỹ năng phân tích và phản biện với AI hỗ trợ 24/7 từ chuyên gia MindTrace.</p>
                    <div className="flex items-center justify-between border-t border-slate-800/50 pt-5">
                      <div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">
                        {item.score ? <>SCORE: <span className="text-emerald-500">{item.score}</span></> : 'NEW CHALLENGE'}
                      </div>
                      <button className="w-10 h-10 bg-slate-900 text-[#1392ec] rounded-xl hover:bg-[#1392ec] hover:text-white transition-all transform group-active:scale-90 border border-slate-800 flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">{item.score ? 'history' : 'play_arrow'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Unlock Banner */}
          <div className="bg-gradient-to-br from-[#1392ec]/20 via-[#1392ec]/5 to-blue-900/40 rounded-[3rem] p-12 border border-[#1392ec]/20 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1392ec]/10 rounded-full blur-[120px] -mr-40 -mt-40 group-hover:bg-[#1392ec]/20 transition-colors duration-1000"></div>
            <div className="flex items-center gap-10 relative z-10">
              <div className="hidden md:flex w-28 h-28 bg-[#1392ec]/15 rounded-[2.5rem] items-center justify-center backdrop-blur-xl border border-[#1392ec]/30 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700">
                <span className="material-symbols-outlined text-6xl text-[#1392ec] fill-1">emoji_events</span>
              </div>
              <div className="max-w-2xl">
                <h4 className="text-4xl font-black mb-4 text-white tracking-tighter leading-none">Mở khóa lộ trình sự nghiệp!</h4>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  Hệ thống ghi nhận sự tiến bộ vượt bậc của bạn trong 30 ngày qua. Vị trí <span className="text-white font-bold bg-[#1392ec]/20 px-3 py-0.5 rounded-lg border border-[#1392ec]/20">Chuyên viên Tư vấn Chiến lược</span> tại các tập đoàn Big4 đang chờ đón bạn.
                </p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-[#1392ec] hover:bg-[#1181d1] text-white font-black px-12 py-5 rounded-2xl transition-all shadow-2xl shadow-[#1392ec]/30 relative z-10 hover:scale-105 active:scale-95 uppercase tracking-[0.2em] text-xs">
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SV;
