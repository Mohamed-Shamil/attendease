import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  CalendarCheck, 
  Clock, 
  AlertCircle,
  TrendingUp,
  UserCheck,
  Globe
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
  <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ padding: '0.75rem', borderRadius: '12px', backgroundColor: `${color}15`, color: color }}>
        <Icon size={24} />
      </div>
      {trend && (
        <span style={{ fontSize: '0.8rem', fontWeight: '600', color: trend.startsWith('+') ? 'var(--success)' : 'var(--error)' }}>
          {trend}
        </span>
      )}
    </div>
    <div style={{ marginTop: '0.5rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>{title}</p>
      <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '0.25rem' }}>{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();

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

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

  const renderAdminDashboard = () => (
    <>
      <div className="dashboard-grid">
        <StatCard title="Total Students" value="1,240" icon={Users} trend="+12" color="#2563eb" />
        <StatCard title="Avg. Attendance" value="92.4%" icon={CalendarCheck} trend="+2.1%" color="#10b981" />
        <StatCard title="Teacher Check-ins" value="42/45" icon={UserCheck} trend="-2" color="#f59e0b" />
        <StatCard title="Total Absentees" value="84" icon={AlertCircle} trend="+15" color="#ef4444" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div className="card" style={{ height: '400px' }}>
          <h4 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Attendance Trends (Weekly)</h4>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="var(--primary)" strokeWidth={3} dot={{ r: 6, fill: 'var(--primary)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card">
          <h4 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Class Performance</h4>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={classData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="rate" fill="var(--primary)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );

  const renderTeacherDashboard = () => (
    <>
      <div className="dashboard-grid">
        <StatCard title="Your Class Avg." value="94.2%" icon={CalendarCheck} color="#2563eb" />
        <StatCard title="Check-in Time" value="08:45 AM" icon={Clock} color="#10b981" />
        <StatCard title="Marked Offline" value="Yes" icon={UserCheck} color="#f59e0b" />
        <StatCard title="Online Session" value="Pending" icon={Globe} color="#ef4444" />
      </div>

      <div style={{ marginTop: '1.5rem' }} className="card">
        <h4 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Next Class: Grade 10-A (Mathematics)</h4>
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--primary-light)', borderRadius: '12px', border: '2px dashed var(--primary)' }}>
          <p style={{ color: 'var(--primary)', fontWeight: '600' }}>Teacher must check-in to start taking attendance</p>
          <button className="btn-primary" style={{ marginTop: '1rem' }}>Check-in Now</button>
        </div>
      </div>
    </>
  );

  const renderStudentDashboard = () => (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '120px', height: '120px', margin: '0 auto', position: 'relative' }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={[{ value: 92 }, { value: 8 }]}
                innerRadius={45}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="var(--primary)" />
                <Cell fill="var(--border)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: '700', fontSize: '1.25rem' }}>
            92%
          </div>
        </div>
        <h2 style={{ marginTop: '1rem' }}>Welcome back, Alex!</h2>
        <p style={{ color: 'var(--text-muted)' }}>You've been present 42/45 days this term.</p>
      </div>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        <h4 style={{ fontWeight: '600' }}>Recent Absence History</h4>
        {[
          { date: 'Oct 12, 2023', reason: 'Medical Leave', status: 'Approved' },
          { date: 'Sep 24, 2023', reason: 'Family Emergency', status: 'Approved' }
        ].map((item, idx) => (
          <div key={idx} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontWeight: '600' }}>{item.date}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.reason}</p>
            </div>
            <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '600', height: 'fit-content' }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-muted)' }}>Welcome to AttendEase School Management System</p>
      </div>

      {user.role === 'admin' || user.role === 'headmaster' ? renderAdminDashboard() : 
       user.role === 'teacher' ? renderTeacherDashboard() : renderStudentDashboard()}
    </div>
  );
};

export default Dashboard;
