
import React, { useState, useEffect } from 'react';

interface MA1_LTProps {
  onBack: () => void;
}

const MA1_LT: React.FC<MA1_LTProps> = ({ onBack }) => {
  const [answer, setAnswer] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; comment: string } | null>(null);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 giờ tính bằng giây

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

  const handleSimulateAI = () => {
    if (!answer.trim()) return;
    setIsGrading(true);
    setTimeout(() => {
      setIsGrading(false);
      setFeedback({
        score: 88,
        comment: "Giải pháp nạp tiền 1-chạm (One-tap Top-up) của bạn rất đột phá. AI nhận thấy khả năng giảm drop-off tới 25% nếu áp dụng giao diện tối giản này."
      });
    }, 2500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0f14] text-slate-100 font-display">
      {/* Sidebar Thu Gọn */}
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
          <button onClick={onBack} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="text-sm">Quay lại Dashboard</span>
          </button>
          <div className="pt-6 pb-2 px-3">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Đang thực hiện</span>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#1392ec]/10 text-[#1392ec] font-semibold border border-[#1392ec]/20">
            <span className="material-symbols-outlined">science</span>
            <span className="text-sm">Luyện tập AI Case</span>
          </div>
        </nav>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0a0f14]">
        {/* Header với Timer */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#0a0f14] border-b border-slate-800">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Case Study: Tối ưu tỷ lệ nạp tiền MOMO</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Đề tài: Product Design</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span className="text-[10px] font-bold text-[#1392ec] uppercase tracking-widest">Đơn vị: MOMO E-WALLET</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 shadow-inner">
              <span className="material-symbols-outlined text-orange-400 animate-pulse">timer</span>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-slate-500 uppercase leading-none">Thời gian còn lại</span>
                <span className="text-xl font-mono font-black text-orange-400">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-700 border border-slate-600 bg-cover" style={{backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky')`}}></div>
          </div>
        </header>

        {/* Nội dung bài tập (2 cột) */}
        <div className="flex-1 overflow-hidden flex">
          {/* Cột trái: Đề bài & Thông tin */}
          <div className="w-1/2 border-r border-slate-800 overflow-y-auto p-10 bg-[#111821]/30">
            <div className="max-w-xl ml-auto space-y-10">
              <section>
                <h3 className="text-xs font-black text-[#1392ec] uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">info</span> Vấn đề hiện tại
                </h3>
                <div className="bg-[#111821] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
                  <p className="text-slate-300 leading-relaxed text-sm">
                    Tính năng nạp tiền điện thoại (Top-up) hiện đang gặp tỷ lệ drop-off cao (42%) tại bước lựa chọn mệnh giá. Người dùng mất trung bình 15 giây để tìm kiếm nhà mạng.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-xs text-slate-400 font-medium">
                      <span className="text-red-500 font-black">•</span>
                      <span>Giao diện lựa chọn nhà mạng chiếm 60% diện tích màn hình.</span>
                    </li>
                    <li className="flex gap-3 text-xs text-slate-400 font-medium">
                      <span className="text-red-500 font-black">•</span>
                      <span>Thiếu các gói cước gợi ý dựa trên thói quen người dùng.</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-5 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">target</span> Mục tiêu cần đạt được
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl group hover:bg-emerald-500/10 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-emerald-500">speed</span>
                      <h4 className="font-bold text-white text-sm tracking-tight">Tối ưu quy trình</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Giảm ít nhất 2 thao tác trong luồng nạp tiền tiêu chuẩn.</p>
                  </div>
                  <div className="p-4 bg-[#1392ec]/5 border border-[#1392ec]/10 rounded-2xl group hover:bg-[#1392ec]/10 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-[#1392ec]">analytics</span>
                      <h4 className="font-bold text-white text-sm tracking-tight">Tăng tỷ lệ chuyển đổi</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">Đề xuất UI/UX giúp tăng tỷ lệ hoàn tất nạp tiền thêm 15%.</p>
                  </div>
                </div>
              </section>

              <div className="p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 flex items-start gap-4">
                 <span className="material-symbols-outlined text-slate-500">lightbulb</span>
                 <p className="text-[11px] text-slate-500 italic leading-relaxed">
                   Mẹo: Bạn có thể trình bày giải pháp bằng văn bản hoặc tải lên file proposal. MindTrace AI sẽ ưu tiên chấm điểm dựa trên tư duy phản biện và dữ liệu thực tế.
                 </p>
              </div>
            </div>
          </div>

          {/* Cột phải: Workspace Bài giải */}
          <div className="w-1/2 overflow-y-auto p-10 flex flex-col bg-[#0a0f14]">
            <div className="max-w-xl mr-auto w-full flex-1 flex flex-col">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2">Trình bày bài giải</h3>
                  <p className="text-[10px] font-black text-[#1392ec] bg-[#1392ec]/10 border border-[#1392ec]/20 px-3 py-1 rounded uppercase tracking-wider">AI Grading System Active</p>
                </div>
                <span className="text-[10px] font-bold text-slate-600">SỐ TỪ: {answer.trim().split(/\s+/).filter(x => x).length}</span>
              </div>

              <textarea 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="flex-1 min-h-[300px] w-full bg-[#111821] border border-slate-800 rounded-3xl p-8 text-sm text-slate-200 placeholder:text-slate-700 focus:border-[#1392ec] focus:ring-1 focus:ring-[#1392ec]/50 outline-none transition-all resize-none shadow-2xl mb-8"
                placeholder="Nhập lộ trình giải quyết vấn đề, phân tích User Flow mới và các thay đổi UI đề xuất..."
              />

              {/* Khu vực Feedback AI */}
              {feedback ? (
                <div className="mb-8 p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                         <span className="text-2xl font-black text-emerald-500">{feedback.score}</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-widest">AI Result</h4>
                        <p className="text-[10px] text-emerald-500/70 font-bold uppercase">Xuất sắc!</p>
                      </div>
                    </div>
                    <button onClick={() => setFeedback(null)} className="p-2 text-slate-500 hover:text-white transition-colors">
                      <span className="material-symbols-outlined text-xl">refresh</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic font-medium">"{feedback.comment}"</p>
                </div>
              ) : (
                <div className="mb-8 p-6 rounded-3xl bg-[#111821] border border-slate-800/50 flex items-center justify-between group hover:border-[#1392ec]/30 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:bg-[#1392ec]/10 transition-colors">
                         <span className="material-symbols-outlined text-[#1392ec] group-hover:scale-110 transition-transform">auto_awesome</span>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-300">Tư vấn từ AI</h4>
                        <p className="text-[10px] text-slate-500">Nhấn để xem gợi ý hướng giải quyết</p>
                      </div>
                   </div>
                   <button className="text-[10px] font-black uppercase text-[#1392ec] hover:underline">Xem gợi ý</button>
                </div>
              )}

              {/* Nút bấm Hành động */}
              <div className="flex gap-4">
                <button 
                  onClick={handleSimulateAI}
                  disabled={isGrading || !answer.trim()}
                  className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 disabled:grayscale text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
                >
                  {isGrading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <span className="material-symbols-outlined text-lg">bolt</span>}
                  {isGrading ? "Đang chấm điểm..." : "Chấm thử bằng AI"}
                </button>
                <button className="px-8 py-4 bg-[#1392ec] hover:bg-[#1181d1] text-white font-black rounded-2xl transition-all shadow-xl shadow-[#1392ec]/10 uppercase tracking-widest text-[11px] flex items-center gap-2">
                  Nộp bài <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MA1_LT;
