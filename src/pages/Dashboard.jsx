import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  AlertCircle,
  TrendingUp,
  UserCheck,
  Globe,
  ChevronRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
  <div className="card animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', border: 'none', background: 'white' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ padding: '0.75rem', borderRadius: '14px', backgroundColor: `${color}10`, color: color }}>
        <Icon size={22} />
      </div>
      {trend && (
        <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.6rem', borderRadius: '20px', backgroundColor: trend.startsWith('+') ? '#ecfdf5' : '#fef2f2', color: trend.startsWith('+') ? '#059669' : '#dc2626' }}>
          {trend}
        </span>
      )}
    </div>
    <div style={{ marginTop: '0.75rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '2px' }}>{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = [
    { name: 'Mon', attendance: 92 },
    { name: 'Tue', attendance: 88 },
    { name: 'Wed', attendance: 95 },
    { name: 'Thu', attendance: 91 },
    { name: 'Fri', attendance: 93 },
  ];

  const classData = [
    { name: '10-A', rate: 94 },
    { name: '10-B', rate: 82 },
    { name: '9-A', rate: 91 },
    { name: '9-B', rate: 88 },
  ];

  const renderAdminDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', 
        gap: isMobile ? '1rem' : '1.5rem' 
      }}>
        <StatCard title="Students" value="1,240" icon={Users} trend="+12" color="#2563eb" />
        <StatCard title="Avg Rate" value="92.4%" icon={CalendarCheck} trend="+2.1%" color="#10b981" />
        <StatCard title="Teachers" value="42/45" icon={UserCheck} trend="-2" color="#f59e0b" />
        <StatCard title="Absentees" value="84" icon={AlertCircle} trend="+15" color="#ef4444" />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
        gap: '1.5rem' 
      }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h4 style={{ fontWeight: '800', fontSize: '1.1rem' }}>Attendance Trends</h4>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', background: 'var(--primary-light)', padding: '0.3rem 0.75rem', borderRadius: '20px' }}>WEEKLY</div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Line type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={4} dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h4 style={{ marginBottom: '1.5rem', fontWeight: '800', fontSize: '1.1rem' }}>Top Classes</h4>
          <div className="chart-container">
            <ResponsiveContainer>
              <BarChart data={classData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="rate" fill="var(--primary)" radius={[0, 10, 10, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', 
        gap: '1rem' 
      }}>
        <StatCard title="Class Avg" value="94.2%" icon={CalendarCheck} color="#2563eb" />
        <StatCard title="Check-in" value="08:45 AM" icon={Clock} color="#10b981" />
        <StatCard title="Mode" value="Offline" icon={UserCheck} color="#f59e0b" />
        <StatCard title="Next" value="10-A" icon={Globe} color="#ef4444" />
      </div>

      <div className="card" style={{ background: 'var(--primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
        <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem', position: 'relative' }}>Session Ongoing</h4>
        <p style={{ opacity: 0.9, fontSize: '0.9rem', marginBottom: '1.5rem', position: 'relative' }}>Grade 10-A • Mathematics • 08:30 - 09:30 AM</p>
        <button style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', position: 'relative' }}>
          Take Attendance Now <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="card" style={{ textAlign: 'center', background: 'white' }}>
        <div style={{ width: '160px', height: '160px', margin: '0 auto', position: 'relative' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={[{ value: 92 }, { value: 8 }]}
                innerRadius={55}
                outerRadius={75}
                paddingAngle={8}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                <Cell fill="var(--primary)" stroke="none" />
                <Cell fill="var(--border)" stroke="none" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <p style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary)', lineHeight: 1 }}>92%</p>
            <p style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attendance</p>
          </div>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginTop: '1rem' }}>Hi, Alex! 👋</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Keep it up, you're doing great this term!</p>
      </div>
      
      <div className="card">
        <h4 style={{ fontWeight: '800', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Last Activities</h4>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {[
            { date: 'Oct 12, 2023', reason: 'Medical Leave', status: 'Approved', color: 'var(--success)' },
            { date: 'Sep 24, 2023', reason: 'Emergency', status: 'Rejected', color: 'var(--error)' }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>{item.date}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.reason}</p>
              </div>
              <span style={{ padding: '0.35rem 0.8rem', borderRadius: '10px', backgroundColor: `${item.color}10`, color: item.color, fontSize: '0.75rem', fontWeight: '800' }}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ paddingBottom: isMobile ? '2rem' : '0' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.25rem', fontWeight: '900', letterSpacing: '-1px' }}>Overview</h1>
        <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      {user.role === 'admin' || user.role === 'headmaster' ? renderAdminDashboard() : 
       user.role === 'teacher' ? renderTeacherDashboard() : renderStudentDashboard()}
    </div>
  );
};

export default Dashboard;
