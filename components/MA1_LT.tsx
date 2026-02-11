
import React, { useState, useEffect } from 'react';

interface MA1_LTProps {
  onBack: () => void;
}

const MA1_LT: React.FC<MA1_LTProps> = ({ onBack }) => {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 giờ = 86400 giây

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => v.toString().padStart(2, '0')).join(':');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f14] text-slate-100 font-display">
      {/* Sidebar Workspace */}
      <aside className="w-64 border-r border-slate-800 bg-[#111821] flex flex-col h-full shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
          <div className="w-10 h-10 bg-[#1392ec] rounded-lg flex items-center justify-center text-white shadow-lg shadow-[#1392ec]/20">
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase italic leading-none">MindTrace</h1>
            <p className="text-[10px] text-[#1392ec] font-bold tracking-widest uppercase mt-1">Student Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <button onClick={onBack} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-all group">
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="text-sm font-medium">Trở lại thư viện</span>
          </button>
          <div className="pt-8 pb-3 px-3">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Tiến độ bài làm</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#1392ec]/10 text-[#1392ec] border border-[#1392ec]/20">
              <span className="material-symbols-outlined text-sm">upload_file</span>
              <span className="text-xs font-bold uppercase tracking-wider">Nộp bài giải PDF</span>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 cursor-not-allowed">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span className="text-xs font-bold uppercase tracking-wider">Hoàn tất & Nộp</span>
            </div>
          </div>
        </nav>
        <div className="mt-auto p-4 border-t border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Cài đặt</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-900/10 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Workspace Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#0a0f14] border-b border-slate-800">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Làm bài: Tăng tỷ lệ nạp tiền MOMO</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Đề tài: Product Design</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Đơn vị: MOMO E-WALLET</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
              <span className="material-symbols-outlined text-orange-400 animate-pulse">timer</span>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase leading-none">Thời gian còn lại</span>
                <span className="text-xl font-mono font-bold text-orange-400">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-700 bg-cover bg-center border border-slate-600 shadow-lg" style={{backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky')`}}></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex">
          {/* Left Column: Brief */}
          <div className="w-1/2 border-r border-slate-800 overflow-y-auto p-12 bg-[#111821]/30">
            <div className="max-w-2xl ml-auto">
              <section className="mb-10">
                <h3 className="text-sm font-bold text-[#1392ec] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">info</span> Vấn đề hiện tại
                </h3>
                <div className="bg-[#111821] border border-slate-800 rounded-xl p-8 space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    Tính năng nạp tiền điện thoại (Top-up) hiện đang gặp tỷ lệ rớt (drop-off) cao tại bước lựa chọn mệnh giá. Người dùng thường mất quá nhiều thời gian để tìm kiếm nhà mạng và mệnh giá mong muốn.
                  </p>
                  <ul className="space-y-4 pt-2">
                    <li className="flex gap-3 text-sm text-slate-400">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Giao diện lựa chọn nhà mạng chiếm quá nhiều không gian.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-400">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Thiếu các gợi ý mệnh giá dựa trên lịch sử nạp tiền của người dùng.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-400">
                      <span className="text-red-500 font-bold">•</span>
                      <span>Thông báo lỗi khi nhập sai số điện thoại chưa thực sự trực quan.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h3 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">target</span> Mục tiêu cần đạt được
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-emerald-500">speed</span>
                      <h4 className="font-bold text-white text-sm">Tối ưu quy trình</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Giảm ít nhất 2 thao tác (click/tap) trong luồng nạp tiền tiêu chuẩn.</p>
                  </div>
                  <div className="p-5 bg-[#1392ec]/5 border border-[#1392ec]/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-[#1392ec]">analytics</span>
                      <h4 className="font-bold text-white text-sm">Tăng tỷ lệ chuyển đổi</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Đề xuất giải pháp UI/UX giúp tăng tỷ lệ hoàn tất nạp tiền thêm 15%.</p>
                  </div>
                  <div className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-orange-400">lightbulb</span>
                      <h4 className="font-bold text-white text-sm">Tính đột phá</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Áp dụng AI để cá nhân hóa các gói cước/khuyến mãi cho từng tập khách hàng.</p>
                  </div>
                </div>
              </section>

              <div className="p-5 bg-slate-800/40 rounded-lg border border-slate-700/50">
                <p className="text-xs text-slate-500 italic">Lưu ý: Bạn có thể trình bày dưới dạng file PDF proposal hoặc file thiết kế (Figma link trong file PDF).</p>
              </div>
            </div>
          </div>

          {/* Right Column: Submission Portal */}
          <div className="w-1/2 overflow-y-auto p-12 flex flex-col bg-[#0a0f14]">
            <div className="max-w-2xl mr-auto w-full flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-[0.15em] mb-2">Trình bày bài giải</h3>
                <p className="text-xs font-medium text-[#1392ec] bg-[#1392ec]/10 border border-[#1392ec]/20 px-3 py-1.5 rounded-lg inline-block">
                  Yêu cầu: Trình bày thành file PDF từ 3-5 trang, dung lượng tối đa 50MB
                </p>
              </div>

              {/* Upload Box */}
              <div className="flex-1 flex flex-col bg-[#111821] border-2 border-dashed border-slate-700 rounded-[2.5rem] p-12 items-center justify-center text-center transition-all hover:border-[#1392ec]/50 group mb-8">
                <div className="w-20 h-20 bg-[#1392ec]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl text-[#1392ec]">upload_file</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Tải lên tệp tin bài làm</h4>
                <p className="text-sm text-slate-500 mb-8 max-w-sm font-medium">Hỗ trợ định dạng PDF. Dung lượng tối đa 50MB.</p>
                <button className="bg-[#1392ec] text-white px-10 py-3.5 rounded-xl font-bold hover:bg-[#1181d1] transition-all shadow-xl shadow-[#1392ec]/20 flex items-center gap-2 uppercase text-xs tracking-widest">
                  <span className="material-symbols-outlined text-lg">add</span>
                  Chọn tệp tin
                </button>
              </div>

              {/* AI Suggestion Box */}
              <div className="mt-auto p-6 bg-[#1392ec]/5 border border-[#1392ec]/20 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1392ec]/20 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#1392ec] text-2xl fill-1">auto_awesome</span>
                </div>
                <div>
                  <p className="text-xs text-[#1392ec] font-black uppercase tracking-[0.15em] mb-1">MindTrace AI Gợi ý</p>
                  <p className="text-sm text-slate-300 font-medium leading-relaxed">
                    Đừng quên đính kèm các User Flow so sánh giữa giao diện cũ và mới để hội đồng giám khảo dễ dàng đánh giá sự cải tiến của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="px-12 py-6 border-t border-slate-800 bg-[#111821] flex items-center justify-end">
          <div className="flex items-center gap-4">
            <button className="px-8 py-3.5 border border-slate-700 text-slate-300 rounded-xl font-bold hover:bg-slate-800 transition-all text-xs uppercase tracking-widest">
              Lưu nháp
            </button>
            <button className="px-12 py-3.5 bg-[#1392ec] text-white rounded-xl font-bold hover:bg-[#1181d1] transition-all shadow-xl shadow-[#1392ec]/30 flex items-center gap-2 text-xs uppercase tracking-widest">
              Nộp bài
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MA1_LT;
