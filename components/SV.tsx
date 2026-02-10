
import React, { useState, useEffect } from 'react';

interface SVProps {
  onLogout: () => void;
  onStartPractice: (practiceId: string) => void;
}

const SV: React.FC<SVProps> = ({ onLogout, onStartPractice }) => {
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
            <h1 className="text-xl font-bold tracking-tight text-white uppercase italic">MindTrace</h1>
            <p className="text-[10px] text-[#1392ec] font-bold tracking-widest uppercase">Student Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#111821] text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Bảng điều khiển</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">work_history</span>
            <span className="text-sm">Đơn ứng tuyển</span>
          </button>
          <button 
            onClick={() => onStartPractice('lt1')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1392ec] text-white font-semibold"
          >
            <span className="material-symbols-outlined">science</span>
            <span className="text-sm">Kho luyện tập AI</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">search</span>
            <span className="text-sm">Việc làm mới</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">person</span>
            <span className="text-sm">Hồ sơ cá nhân</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Cài đặt</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-900/10 transition-colors"
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
            <h2 className="text-2xl font-bold text-white">Chào mừng trở lại!</h2>
            <p className="text-sm text-slate-400">Bạn thuộc top 10% ứng viên tiềm năng trong tuần này. Cố gắng lên!</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0f14]"></span>
            </button>
            <div 
              className="h-10 w-10 rounded-full bg-slate-700 bg-cover bg-center border border-slate-600" 
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
              <a className="text-[#1392ec] text-sm font-semibold hover:underline" href="#">Xem tất cả đơn ứng tuyển</a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-[#111821] p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-500 text-[10px] font-bold rounded-full uppercase tracking-wider border border-emerald-500/30">Vòng 1: Lọc CV</span>
                  <span className="material-symbols-outlined text-slate-500 cursor-pointer hover:text-white transition-colors">more_vert</span>
                </div>
                <h4 className="font-bold text-white mb-1">Chuyên viên Phân tích Sản phẩm</h4>
                <p className="text-sm text-slate-400 mb-6">Công ty Công nghệ Toàn Cầu</p>
                <div className="flex items-center gap-5 py-5 bg-slate-900/60 rounded-2xl px-5 border border-slate-800 shadow-inner">
                  <div className="relative flex items-center justify-center w-20 h-20">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle className="text-slate-700/30" cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" strokeWidth="5" />
                      <circle className="text-emerald-500 transition-all duration-1000 ease-out" cx="40" cy="40" fill="transparent" r={radius} stroke="currentColor" strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-lg font-black text-emerald-500 leading-none">{score}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Match Score</p>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">Hồ sơ cực kỳ ấn tượng, vượt xa yêu cầu cơ bản.</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-emerald-500 text-xs font-bold gap-1.5 bg-emerald-500/5 py-2 px-3 rounded-lg border border-emerald-500/10 w-fit">
                  <span className="material-symbols-outlined text-sm fill-1">verified</span>
                  Đã vượt qua (Pass)
                </div>
              </div>

              <div className="bg-[#111821] p-6 rounded-xl border-2 border-[#1392ec] shadow-lg shadow-[#1392ec]/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1392ec] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#1392ec]"></span>
                  </span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-[#1392ec] text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Vòng 2: Bài test thực tế</span>
                </div>
                <h4 className="font-bold text-white mb-1">Chiến lược Thâm nhập Thị trường</h4>
                <p className="text-sm text-slate-400 mb-6">Tập đoàn Bán lẻ Quốc tế</p>
                <div className="bg-orange-500/10 border border-orange-500/20 p-5 rounded-2xl mb-6 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 text-orange-400 mb-2">
                    <span className="material-symbols-outlined text-lg animate-pulse">timer</span>
                    <span className="text-[10px] font-black uppercase tracking-widest">Thời gian còn lại</span>
                  </div>
                  <p className="text-3xl font-mono font-black text-orange-400 tracking-[0.15em]">
                    {formatTime(timeLeft)}
                  </p>
                </div>
                <button onClick={() => onStartPractice('momo-1')} className="group w-full py-3.5 bg-[#1392ec] hover:bg-[#1181d1] text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1392ec]/20 active:scale-95">
                  <span>Bắt đầu làm bài</span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>

              <div className="bg-[#111821] p-6 rounded-xl border border-slate-800 shadow-sm opacity-60">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded-full uppercase tracking-wider">Vòng 3: Xét duyệt</span>
                </div>
                <h4 className="font-bold text-white mb-1">Tư vấn viên Cộng tác</h4>
                <p className="text-sm text-slate-400 mb-6">Stellar Advisories</p>
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <div className="flex-1 h-px bg-slate-800"></div>
                    <div className="w-8 h-8 rounded-full bg-[#1392ec]/20 text-[#1392ec] flex items-center justify-center border border-[#1392ec]/20 animate-pulse">
                      <span className="material-symbols-outlined text-sm">pending</span>
                    </div>
                    <div className="flex-1 h-px bg-slate-800"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center border border-slate-700/50">
                      <span className="material-symbols-outlined text-sm">lock</span>
                    </div>
                  </div>
                  <p className="text-center text-xs font-semibold text-slate-400 bg-slate-800/30 py-2 rounded-lg">Hồ sơ đang được chuyên gia review</p>
                </div>
                <div className="mt-12 text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider opacity-60">Dự kiến phản hồi: Thứ Sáu</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Kho luyện tập AI */}
          <section id="practice-section">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                  Kho luyện tập AI
                </h3>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded uppercase border border-emerald-500/20">AI Evaluated</span>
              </div>
              <button 
                onClick={() => onStartPractice('lt_all')}
                className="text-xs font-bold py-2 px-4 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors uppercase tracking-tight"
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
                  className="bg-[#111821] border border-slate-800 rounded-2xl overflow-hidden hover:border-[#1392ec]/50 transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:shadow-[#1392ec]/5"
                >
                  <div className="h-36 bg-slate-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('https://picsum.photos/seed/${idx + 100}/400/200')` }}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111821] via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 flex gap-2">
                      <span className={`px-2 py-0.5 bg-${item.color}-500/20 text-${item.color}-400 text-[9px] font-black rounded uppercase tracking-wider`}>{item.tag}</span>
                      <span className="px-2 py-0.5 bg-slate-900/60 text-slate-400 text-[9px] font-black rounded uppercase tracking-wider backdrop-blur-sm border border-white/5">{item.time}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h5 className="font-bold text-white mb-2 group-hover:text-[#1392ec] transition-colors leading-snug">{item.title}</h5>
                    <p className="text-[11px] text-slate-500 mb-5 line-clamp-2 font-medium">Luyện tập kỹ năng phân tích và phản biện với AI hỗ trợ 24/7.</p>
                    <div className="flex items-center justify-between border-t border-slate-800/50 pt-4">
                      <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                        {item.score ? <>SCORE: <span className="text-emerald-500">{item.score}</span></> : 'NEW CHALLENGE'}
                      </div>
                      <button className="p-2 bg-slate-800 text-[#1392ec] rounded-xl hover:bg-[#1392ec] hover:text-white transition-all transform group-active:scale-90">
                        <span className="material-symbols-outlined text-lg">{item.score ? 'history' : 'play_arrow'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-gradient-to-br from-[#1392ec]/20 via-[#1392ec]/5 to-blue-900/40 rounded-[2rem] p-10 border border-[#1392ec]/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1392ec]/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-[#1392ec]/20 transition-colors duration-700"></div>
            <div className="flex items-center gap-8 relative z-10">
              <div className="hidden md:flex w-24 h-24 bg-[#1392ec]/15 rounded-3xl items-center justify-center backdrop-blur-md border border-[#1392ec]/30 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                <span className="material-symbols-outlined text-5xl text-[#1392ec] fill-1">emoji_events</span>
              </div>
              <div className="max-w-xl">
                <h4 className="text-3xl font-black mb-3 text-white tracking-tight">Mở khóa lộ trình sự nghiệp!</h4>
                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                  Hệ thống ghi nhận sự tiến bộ vượt bậc của bạn. Vị trí <span className="text-white font-bold bg-[#1392ec]/20 px-2 rounded">Chuyên viên Tư vấn Chiến lược</span> đang chờ đợi!
                </p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-[#1392ec] hover:bg-[#1181d1] text-white font-black px-10 py-5 rounded-2xl transition-all shadow-xl shadow-[#1392ec]/20 relative z-10 hover:scale-105 active:scale-95 uppercase tracking-widest text-sm">
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SV;
