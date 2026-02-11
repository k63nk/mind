
import React from 'react';

interface DonUngTuyenProps {
  onBack: () => void;
  onLogout: () => void;
  onNavigateToExercises: () => void;
  onStartTest: (id: string) => void;
  onNavigateToProfile: () => void;
}

const DonUngTuyen: React.FC<DonUngTuyenProps> = ({ onBack, onLogout, onNavigateToExercises, onStartTest, onNavigateToProfile }) => {
  const applications = [
    { id: 'app1', position: 'Chuyên viên Phân tích Sản phẩm', company: 'Công ty Công nghệ Toàn Cầu', date: '12/10/2023', score: '88%', status: 'CV PASSED', statusType: 'success' },
    { id: 'app2', position: 'Chiến lược Thâm nhập Thị trường', company: 'Tập đoàn Bán lẻ Quốc tế', date: '10/10/2023', score: '--', status: 'ĐANG LÀM TEST', statusType: 'warning' },
    { id: 'app3', position: 'Tư vấn viên Cộng tác', company: 'Stellar Advisories', date: '08/10/2023', score: '75%', status: 'ĐANG CHỜ DUYỆT', statusType: 'warning' },
    { id: 'app4', position: 'Thực tập sinh Marketing', company: 'Agency Sáng tạo XYZ', date: '05/10/2023', score: '42%', status: 'REJECTED', statusType: 'danger' },
    { id: 'app5', position: 'Data Analyst Associate', company: 'Ngân hàng Phát triển Đô thị', date: '01/10/2023', score: '94%', status: 'ĐÃ TUYỂN DỤNG', statusType: 'success' },
  ];

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
            <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">Đơn ứng tuyển của tôi</h2>
            <p className="text-sm text-slate-400">Theo dõi tiến độ và kết quả các bài toán thực tế bạn đã tham gia.</p>
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
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex bg-[#111821] p-1 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
              <button className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest bg-[#1392ec] text-white shadow-lg shadow-[#1392ec]/20 transition-all">Tất cả</button>
              <button className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Đang diễn ra</button>
              <button className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Đã hoàn thành</button>
            </div>
            <div className="relative w-full md:w-80 group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl group-focus-within:text-[#1392ec] transition-colors">search</span>
              <input 
                className="w-full bg-[#111821] border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-sm text-slate-200 focus:border-[#1392ec] focus:ring-4 focus:ring-[#1392ec]/5 outline-none transition-all placeholder:text-slate-600" 
                placeholder="Tìm kiếm đơn..." 
                type="text"
              />
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-[#111821] border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900/40 border-b border-slate-800">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Vị trí & Công ty</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Ngày ứng tuyển</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center">Kết quả AI</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Trạng thái hiện tại</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-800/20 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white mb-0.5 group-hover:text-[#1392ec] transition-colors leading-none">{app.position}</span>
                          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mt-1">{app.company}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-xs text-slate-400 font-mono font-medium">{app.date}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <div className={`inline-flex items-center justify-center px-3 py-1 rounded-lg font-mono font-bold text-sm ${
                          app.score === '--' ? 'bg-slate-800 text-slate-500' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {app.score}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          app.statusType === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          app.statusType === 'warning' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                          'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            app.statusType === 'success' ? 'bg-emerald-500' :
                            app.statusType === 'warning' ? 'bg-orange-400' :
                            'bg-red-400'
                          } ${app.status.includes('LÀM') ? 'animate-pulse' : ''}`}></span>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        {app.status.includes('LÀM') ? (
                          <button 
                            onClick={() => onStartTest(app.id)}
                            className="bg-[#1392ec] hover:bg-[#1181d1] text-white text-[10px] font-black px-5 py-2 rounded-xl transition-all shadow-lg shadow-[#1392ec]/20 uppercase tracking-widest"
                          >
                            Làm bài ngay
                          </button>
                        ) : (
                          <button className="text-[10px] font-black text-[#1392ec] hover:underline flex items-center gap-1 ml-auto uppercase tracking-widest group/btn">
                            Chi tiết <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">chevron_right</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-8 py-5 bg-slate-900/40 border-t border-slate-800 flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Hiển thị 5 trên 12 đơn ứng tuyển</p>
              <div className="flex gap-2">
                <button className="p-2 rounded-xl border border-slate-800 text-slate-500 hover:bg-slate-800 transition-all">
                  <span className="material-symbols-outlined text-lg">chevron_left</span>
                </button>
                <button className="p-2 rounded-xl border border-slate-800 text-slate-500 hover:bg-slate-800 transition-all">
                  <span className="material-symbols-outlined text-lg">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#111821] to-[#161f2b] p-8 rounded-[2rem] border border-slate-800 shadow-xl group hover:border-[#1392ec]/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-slate-800 group-hover:text-[#1392ec]/10 transition-colors">
                <span className="material-symbols-outlined text-6xl">verified</span>
              </div>
              <div className="flex flex-col relative z-10">
                <div className="w-14 h-14 bg-[#1392ec]/10 rounded-2xl flex items-center justify-center text-[#1392ec] mb-6 border border-[#1392ec]/20">
                  <span className="material-symbols-outlined text-3xl">assignment_turned_in</span>
                </div>
                <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Tỷ lệ vượt qua CV</p>
                <h4 className="text-4xl font-black text-white tracking-tight">75%</h4>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#111821] to-[#161f2b] p-8 rounded-[2rem] border border-slate-800 shadow-xl group hover:border-emerald-500/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-slate-800 group-hover:text-emerald-500/10 transition-colors">
                <span className="material-symbols-outlined text-6xl">analytics</span>
              </div>
              <div className="flex flex-col relative z-10">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20">
                  <span className="material-symbols-outlined text-3xl">bar_chart</span>
                </div>
                <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Điểm AI trung bình</p>
                <h4 className="text-4xl font-black text-white tracking-tight">82.4</h4>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#111821] to-[#161f2b] p-8 rounded-[2rem] border border-slate-800 shadow-xl group hover:border-orange-500/30 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 text-slate-800 group-hover:text-orange-500/10 transition-colors">
                <span className="material-symbols-outlined text-6xl">pending</span>
              </div>
              <div className="flex flex-col relative z-10">
                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-6 border border-orange-500/20">
                  <span className="material-symbols-outlined text-3xl">pending_actions</span>
                </div>
                <p className="text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Đang chờ kết quả</p>
                <h4 className="text-4xl font-black text-white tracking-tight">03</h4>
              </div>
            </div>
          </div>

          {/* AI Tip Banner */}
          <div className="bg-[#1392ec]/5 border border-[#1392ec]/20 rounded-[2rem] p-8 flex items-start gap-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#1392ec]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="w-14 h-14 bg-[#1392ec]/20 rounded-2xl flex items-center justify-center shrink-0 border border-[#1392ec]/30 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[#1392ec] text-3xl fill-1">auto_awesome</span>
            </div>
            <div className="relative z-10">
              <h5 className="text-sm font-black text-white mb-2 uppercase tracking-widest flex items-center gap-2">
                Mẹo từ MindTrace AI
                <span className="w-2 h-2 bg-[#1392ec] rounded-full animate-pulse"></span>
              </h5>
              <p className="text-xs text-slate-400 leading-relaxed max-w-4xl font-medium">
                Dựa trên kết quả phân tích, các hồ sơ có điểm CV trên 80% thường có tỷ lệ nhận được lịch phỏng vấn cao hơn 3.5 lần. 
                Hãy thử sử dụng <button onClick={onNavigateToExercises} className="text-[#1392ec] hover:underline font-bold">Kho luyện tập AI</button> để cải thiện kỹ năng giải quyết bài toán thực tế của bạn và gia tăng cơ hội trúng tuyển.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonUngTuyen;
