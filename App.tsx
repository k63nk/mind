
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AICVDemo from './components/AICVDemo';
import LoginPage from './components/LoginPage';
import SV from './components/SV';
import Malt from './components/malt';
import MA1_LT from './components/MA1_LT';
import DonUngTuyen from './components/DonUngTuyen';
import HoSoCaNhan from './components/HoSoCaNhan';
import { Step, Feature } from './types';

const steps: Step[] = [
  { id: '1', number: '01', title: 'Doanh nghiệp đăng tin', description: 'Upload JD tuyển dụng và đề bài case study thực tế kèm deadline chi tiết.', icon: 'description', color: 'emerald' },
  { id: '2', number: '02', title: 'Sinh viên ứng tuyển', description: 'Upload CV trực tiếp lên hệ thống, AI sẽ phân tích độ phù hợp ngay lập tức.', icon: 'send', color: 'sky' },
  { id: '3', number: '03', title: 'AI đánh giá CV', description: 'Hệ thống phản hồi tức thì về độ tiềm năng và tư vấn cải thiện CV.', icon: 'psychology', color: 'emerald' },
  { id: '4', number: '04', title: 'Làm bài & nộp test', description: 'Giải quyết bài toán thực tế của doanh nghiệp để chứng minh năng lực.', icon: 'task_alt', color: 'sky' },
  { id: '5', number: '05', title: 'Doanh nghiệp review', description: 'Chuyên gia từ doanh nghiệp trực tiếp đánh giá bài làm và gửi feedback.', icon: 'group', color: 'emerald' },
  { id: '6', number: '06', title: 'Kết quả & phỏng vấn', description: 'Nhận lời mời phỏng vấn trực tiếp từ doanh nghiệp nếu kết quả xuất sắc.', icon: 'bookmark', color: 'sky' },
];

const features: Feature[] = [
  { id: 'f1', title: 'AI Chấm CV Tự Động', description: 'Phân tích sâu kỹ năng và kinh nghiệm dựa trên yêu cầu thực tế của JD trong vài giây.', icon: 'memory', accent: 'bg-emerald-500/20' },
  { id: 'f2', title: 'Kho Case Study Thực Tế', description: 'Thư viện bài toán thực tế từ các tập đoàn lớn giúp sinh viên rèn luyện tư duy thực chiến.', icon: 'menu_book', accent: 'bg-sky-500/20' },
  { id: 'f3', title: 'Quy Trình Tự Động', description: 'Hệ thống thông báo và kết nối tự động giúp quá trình tuyển dụng diễn ra trôi chảy.', icon: 'bolt', accent: 'bg-amber-500/20' },
];

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'login' | 'sv_dashboard' | 'exercise_library' | 'exercise_workspace' | 'applications_management' | 'personal_profile'>('home');

  const handleLoginSuccess = (role: 'student' | 'business') => {
    if (role === 'student') {
      setView('sv_dashboard');
    } else {
      alert('Giao diện doanh nghiệp đang phát triển!');
    }
  };

  if (view === 'login') {
    return <LoginPage onBack={() => setView('home')} onLoginSuccess={handleLoginSuccess} />;
  }

  if (view === 'sv_dashboard') {
    return (
      <SV 
        onLogout={() => setView('home')} 
        onStartPractice={() => setView('exercise_library')} 
        onNavigateToApplications={() => setView('applications_management')}
        onNavigateToProfile={() => setView('personal_profile')}
      />
    );
  }

  if (view === 'applications_management') {
    return (
      <DonUngTuyen 
        onBack={() => setView('sv_dashboard')}
        onLogout={() => setView('home')}
        onNavigateToExercises={() => setView('exercise_library')}
        onStartTest={() => setView('exercise_workspace')}
        onNavigateToProfile={() => setView('personal_profile')}
      />
    );
  }

  if (view === 'exercise_library') {
    return (
      <Malt 
        onBack={() => setView('sv_dashboard')} 
        onLogout={() => setView('home')} 
        onSelectExercise={() => setView('exercise_workspace')}
        onNavigateToApplications={() => setView('applications_management')}
        onNavigateToProfile={() => setView('personal_profile')}
      />
    );
  }

  if (view === 'exercise_workspace') {
    return <MA1_LT onBack={() => setView('exercise_library')} />;
  }

  if (view === 'personal_profile') {
    return (
      <HoSoCaNhan 
        onBack={() => setView('sv_dashboard')}
        onLogout={() => setView('home')}
        onNavigateToApplications={() => setView('applications_management')}
        onNavigateToExercises={() => setView('exercise_library')}
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar onLoginClick={() => setView('login')} />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-36 overflow-hidden min-h-screen flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 network-mesh opacity-40"></div>
        <div className="glow-effect top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-10">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            AI-Powered Recruitment Platform
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-12 leading-tight tracking-tight text-slate-100 uppercase italic">
            KẾT NỐI TRI THỨC <br/>
            <span className="gradient-text uppercase italic">Kiến tạo sự nghiệp</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            Nền tảng tuyển dụng đột phá kết nối sinh viên và doanh nghiệp thông qua giải quyết các bài toán thực tế tích hợp công nghệ AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setView('login')}
              className="w-full sm:w-auto px-12 py-6 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all hover:scale-105 shadow-xl shadow-primary/20 group"
            >
              Dành cho Sinh viên
              <span className="material-icons-round text-xl group-hover:translate-x-1 transition-transform">school</span>
            </button>
            <button 
              onClick={() => setView('login')}
              className="w-full sm:w-auto px-12 py-6 border border-slate-300 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 font-bold rounded-2xl transition-all hover:scale-105 flex items-center justify-center gap-3 dark:text-white"
            >
              Dành cho Doanh nghiệp
              <span className="material-icons-round text-xl">business</span>
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-40 bg-slate-50 dark:bg-[#080808]" id="co-che">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Quy trình chuyên nghiệp</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 dark:text-white">Cơ chế <span className="gradient-text">hoạt động</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">6 bước đơn giản tối ưu hóa lộ trình từ ứng tuyển đến nhận lời mời làm việc chính thức.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.id} className="p-10 rounded-[2rem] bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 hover:border-primary/50 transition-all group shadow-sm hover:shadow-xl">
                <div className="flex justify-between items-start mb-8">
                  <span className="text-5xl font-black text-slate-100 dark:text-white/5 group-hover:text-primary/10 transition-colors">{step.number}</span>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-sky-500/10 text-sky-500'}`}>
                    <span className="material-icons-round text-3xl">{step.icon}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40" id="tinh-nang">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <p className="text-primary font-bold text-sm tracking-[0.2em] uppercase mb-4">Tính năng nổi bật</p>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 dark:text-white">Sức mạnh của <span className="gradient-text uppercase">MindTrace</span></h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Tích hợp trí tuệ nhân tạo tiên tiến giúp tối ưu hóa 90% thời gian sàng lọc và tuyển dụng.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature) => (
              <div key={feature.id} className="relative group">
                <div className="absolute inset-0 bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
                <div className="relative p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white dark:bg-card-dark h-full hover:shadow-2xl transition-all">
                  <div className={`w-16 h-16 ${feature.accent} rounded-2xl flex items-center justify-center mb-8`}>
                    <span className={`material-icons-round text-4xl ${feature.id === 'f1' ? 'text-primary' : feature.id === 'f2' ? 'text-sky-500' : 'text-amber-500'}`}>{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CV Demo */}
      <AICVDemo />

      {/* Footer */}
      <footer className="py-24 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-white/5 text-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                  <span className="material-icons-round text-white text-xl">psychology</span>
                </div>
                <span className="text-xl font-extrabold tracking-tight uppercase dark:text-white">Mind<span className="gradient-text">Trace</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">Nền tảng kết nối nhân tài trẻ với cơ hội nghề nghiệp thông qua thực tế và công nghệ.</p>
            </div>
            <div>
              <h4 className="font-bold mb-8 dark:text-white">Sinh viên</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary transition-colors" href="#">Tìm việc làm</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Luyện Case Study</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Cải thiện CV</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 dark:text-white">Doanh nghiệp</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a className="hover:text-primary transition-colors" href="#">Đăng tuyển</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Quản lý ứng viên</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Bảng giá dịch vụ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 dark:text-white">Liên hệ</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="flex items-center gap-3"><span className="material-icons-round text-primary text-sm">mail</span> contact@mindtrace.vn</li>
                <li className="flex items-center gap-3"><span className="material-icons-round text-primary text-sm">location_on</span> Hà Nội, Việt Nam</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-500">© 2024 MindTrace. All rights reserved.</p>
            <div className="flex gap-8 text-xs text-slate-500">
              <a className="hover:text-primary" href="#">Chính sách bảo mật</a>
              <a className="hover:text-primary" href="#">Điều khoản sử dụng</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
