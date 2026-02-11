
import React from 'react';

interface HoSoCaNhanProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigateToApplications: () => void;
  onNavigateToExercises: () => void;
}

const HoSoCaNhan: React.FC<HoSoCaNhanProps> = ({ onBack, onLogout, onNavigateToApplications, onNavigateToExercises }) => {
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
        <header className="sticky top-0 z-10 bg-[#0a0f14]/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-[1400px] mx-auto px-8 py-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div 
                className="h-28 w-28 rounded-2xl bg-slate-700 bg-cover bg-center border-4 border-[#1392ec]/20 shadow-2xl transition-transform group-hover:scale-105" 
                style={{ backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky')` }}
              ></div>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-lg border-2 border-[#0a0f14] shadow-lg">
                <span className="material-symbols-outlined text-sm block">verified_user</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-black text-white mb-1 tracking-tight">Nguyễn Minh Anh</h2>
              <p className="text-[#1392ec] font-bold text-sm uppercase tracking-widest mb-4">Sinh viên năm 4 - Ngành Quản trị Kinh doanh</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-[#111821] border border-slate-800 px-5 py-2.5 rounded-2xl shadow-inner">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-1">Tổng bài test</p>
                  <p className="text-xl font-black text-white">24 <span className="text-[10px] text-slate-500 font-bold uppercase">bài</span></p>
                </div>
                <div className="bg-[#111821] border border-slate-800 px-5 py-2.5 rounded-2xl shadow-inner">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-1">Điểm trung bình AI</p>
                  <p className="text-xl font-black text-emerald-500">8.6 <span className="text-[10px] text-slate-500 font-bold uppercase">/10</span></p>
                </div>
                <div className="bg-[#111821] border border-slate-800 px-5 py-2.5 rounded-2xl shadow-inner">
                  <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.15em] mb-1">Mời phỏng vấn</p>
                  <p className="text-xl font-black text-[#1392ec]">12 <span className="text-[10px] text-slate-500 font-bold uppercase">lần</span></p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-[#1392ec] hover:bg-[#1181d1] text-white font-black rounded-xl transition-all shadow-xl shadow-[#1392ec]/20 uppercase text-xs tracking-widest">
                Xuất Profile AI
              </button>
              <button className="p-3 bg-slate-800 text-slate-300 rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors">
                <span className="material-symbols-outlined">share</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-8">
              <section className="bg-[#111821] p-8 rounded-[2rem] border border-slate-800 shadow-xl">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#1392ec]">account_circle</span>
                  Thông tin & Học vấn
                </h3>
                <div className="space-y-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 text-sm group">
                      <div className="w-8 h-8 rounded-lg bg-[#1392ec]/10 flex items-center justify-center text-[#1392ec] shrink-0 border border-[#1392ec]/20">
                        <span className="material-symbols-outlined text-lg">school</span>
                      </div>
                      <div>
                        <p className="text-white font-bold group-hover:text-[#1392ec] transition-colors">Đại học Kinh tế Quốc dân (NEU)</p>
                        <p className="text-slate-500 text-xs font-medium">Chuyên ngành Marketing • GPA 3.7/4.0</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-sm group">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0 border border-orange-500/20">
                        <span className="material-symbols-outlined text-lg">calendar_month</span>
                      </div>
                      <div>
                        <p className="text-white font-bold group-hover:text-orange-400 transition-colors">Niên khóa 2020 - 2024</p>
                        <p className="text-slate-500 text-xs font-medium">Dự kiến tốt nghiệp: Tháng 06/2024</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-sm group">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-500/20">
                        <span className="material-symbols-outlined text-lg">location_on</span>
                      </div>
                      <div>
                        <p className="text-white font-bold group-hover:text-emerald-500 transition-colors">Hà Nội, Việt Nam</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-8 border-t border-slate-800/50">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4">Tóm tắt mục tiêu</p>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                      Đam mê lĩnh vực Phân tích Dữ liệu và Marketing số. Mong muốn ứng dụng AI để tối ưu hóa trải nghiệm khách hàng tại các tập đoàn đa quốc gia.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-[#111821] p-8 rounded-[2rem] border border-slate-800 shadow-xl">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#1392ec]">folder_open</span>
                  Kho tài liệu
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800 group hover:border-[#1392ec]/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500/10 text-red-500 rounded-xl flex items-center justify-center border border-red-500/20 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-[#1392ec] transition-colors truncate max-w-[140px]">CV_NguyenMinhAnh_2023.pdf</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Bản gốc • 1.2 MB</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-600 hover:text-white transition-colors">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-800 group hover:border-[#1392ec]/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1392ec]/10 text-[#1392ec] rounded-xl flex items-center justify-center border border-[#1392ec]/20 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">verified</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-[#1392ec] transition-colors truncate max-w-[140px]">IELTS_Certificate_8.0.pdf</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Chứng chỉ ngoại ngữ</p>
                      </div>
                    </div>
                    <button className="p-2 text-slate-600 hover:text-white transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </div>
                  <button className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs font-black uppercase tracking-widest hover:border-[#1392ec] hover:text-[#1392ec] transition-all flex items-center justify-center gap-3 group">
                    <span className="material-symbols-outlined text-lg group-hover:rotate-90 transition-transform">add_circle</span>
                    Tải lên tài liệu mới
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-[#111821] p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <div className="px-4 py-1 bg-[#1392ec]/10 text-[#1392ec] text-[10px] font-black rounded-full border border-[#1392ec]/20 uppercase tracking-widest shadow-lg shadow-[#1392ec]/5">Phân tích bởi AI</div>
                </div>
                <div className="mb-10">
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight">Biểu đồ kỹ năng thực tế</h3>
                  <p className="text-sm text-slate-500 font-medium">Dựa trên kết quả giải quyết 24 case study thực tế từ doanh nghiệp.</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-16">
                  {/* Radar Chart SVG */}
                  <div className="relative w-full max-w-[340px] drop-shadow-[0_0_20px_rgba(19,146,236,0.15)]">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Grid polygons */}
                      <polygon className="stroke-slate-800 fill-none stroke-[0.5]" points="50,5 93.3,30 93.3,70 50,95 6.7,70 6.7,30"></polygon>
                      <polygon className="stroke-slate-800 fill-none stroke-[0.5]" points="50,23 75.9,38 75.9,62 50,77 24.1,62 24.1,38"></polygon>
                      <polygon className="stroke-slate-800 fill-none stroke-[0.5]" points="50,41 58.6,46 58.6,54 50,59 41.4,54 41.4,46"></polygon>
                      
                      {/* Axis lines */}
                      <line className="stroke-slate-800 stroke-[0.5]" x1="50" x2="50" y1="50" y2="5"></line>
                      <line className="stroke-slate-800 stroke-[0.5]" x1="50" x2="93.3" y1="50" y2="30"></line>
                      <line className="stroke-slate-800 stroke-[0.5]" x1="50" x2="93.3" y1="50" y2="70"></line>
                      <line className="stroke-slate-800 stroke-[0.5]" x1="50" x2="50" y1="50" y2="95"></line>
                      <line className="stroke-slate-800 stroke-[0.5]" x1="50" x2="6.7" y1="50" y2="70"></line>
                      <line className="stroke-slate-800 stroke-[0.5]" x1="50" x2="6.7" y1="50" y2="30"></line>
                      
                      {/* Area polygon - using the points provided in the mockup */}
                      <polygon 
                        className="fill-[#1392ec]/20 stroke-[#1392ec] stroke-2" 
                        points="50,15 85,35 70,60 50,85 20,65 30,25"
                      ></polygon>
                    </svg>
                    
                    {/* Labels */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[9px] font-black text-slate-500 uppercase tracking-widest">Chiến lược</div>
                    <div className="absolute top-1/4 -right-14 text-[9px] font-black text-slate-500 uppercase tracking-widest">Tư duy số</div>
                    <div className="absolute bottom-1/4 -right-14 text-[9px] font-black text-slate-500 uppercase tracking-widest">Phân tích</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-[9px] font-black text-slate-500 uppercase tracking-widest">Vận hành</div>
                    <div className="absolute bottom-1/4 -left-14 text-[9px] font-black text-slate-500 uppercase tracking-widest">Giao tiếp</div>
                    <div className="absolute top-1/4 -left-14 text-[9px] font-black text-slate-500 uppercase tracking-widest">Sáng tạo</div>
                  </div>

                  {/* Skills Progress */}
                  <div className="flex-1 grid grid-cols-2 gap-6 w-full">
                    {[
                      { label: 'Chiến lược', score: 9.2, width: '92%' },
                      { label: 'Phân tích', score: 8.5, width: '85%' },
                      { label: 'Sáng tạo', score: 7.8, width: '78%' },
                      { label: 'Giao tiếp', score: 8.0, width: '80%' }
                    ].map((skill, idx) => (
                      <div key={idx} className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 group hover:border-[#1392ec]/30 transition-all">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{skill.label}</span>
                          <span className="text-sm font-black text-[#1392ec]">{skill.score}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1392ec] shadow-[0_0_10px_rgba(19,146,236,0.5)]" style={{ width: skill.width }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-white flex items-center gap-3 tracking-tight">
                    <span className="material-symbols-outlined text-emerald-500 fill-1">military_tech</span>
                    Thành tích từ AI Practice Lab
                  </h3>
                  <button className="text-emerald-500 text-xs font-black uppercase tracking-widest hover:underline">Tất cả huy hiệu</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { title: 'Top 1% Logic', icon: 'workspace_premium', color: 'emerald', label: 'Huy hiệu tháng 10' },
                    { title: 'Siêu tốc độ', icon: 'speed', color: 'blue', label: 'Giải case < 15p' },
                    { title: 'Kiên trì 30 ngày', icon: 'local_fire_department', color: 'orange', label: 'Duy trì luyện tập' },
                    { title: 'Master Strategist', icon: 'auto_awesome', color: 'purple', label: 'Rank Bạch kim' }
                  ].map((badge, idx) => (
                    <div key={idx} className="bg-[#111821] p-6 rounded-[2rem] border border-slate-800 text-center group hover:border-emerald-500/50 transition-all shadow-xl">
                      <div className={`w-16 h-16 mx-auto mb-5 bg-${badge.color}-500/10 text-${badge.color}-500 rounded-2xl flex items-center justify-center border border-${badge.color}-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg`}>
                        <span className="material-symbols-outlined text-3xl">{badge.icon}</span>
                      </div>
                      <h5 className="text-sm font-black text-white mb-1 tracking-tight">{badge.title}</h5>
                      <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest">{badge.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="bg-gradient-to-r from-emerald-500/10 via-[#1392ec]/10 to-blue-900/40 rounded-[2.5rem] p-10 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -mr-40 -mt-40 transition-colors group-hover:bg-emerald-500/10 duration-1000"></div>
                <div className="flex items-center gap-8 relative z-10">
                  <div className="hidden md:flex w-20 h-20 bg-white/5 rounded-2xl items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500">
                    <span className="material-symbols-outlined text-4xl text-emerald-500 fill-1">auto_graph</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-2 text-white tracking-tight leading-none">Nâng cấp hồ sơ với AI Lab</h4>
                    <p className="text-slate-400 max-w-lg text-sm font-medium">
                      Thực hiện thêm 3 case study trong tuần này để mở khóa huy hiệu <span className="text-emerald-500 font-black">Data Scientist Junior</span>.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={onNavigateToExercises}
                  className="whitespace-nowrap bg-emerald-500 text-[#0a0f14] font-black px-10 py-4 rounded-2xl hover:bg-emerald-400 transition-all shadow-2xl shadow-emerald-500/20 relative z-10 hover:scale-105 active:scale-95 uppercase text-xs tracking-widest"
                >
                  Luyện tập ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HoSoCaNhan;
