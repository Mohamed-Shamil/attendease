import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Search, 
  Download, 
  Filter, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Briefcase,
  FileText,
  X,
  User,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AttendanceHistory = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('2024-02-23');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [viewingDetails, setViewingDetails] = useState(null);

  // Mock historical data
  const historyData = [
    { id: 1, date: '2024-02-23', displayDate: 'Feb 23, 2024', grade: '9', division: 'A', present: 30, absent: 2, total: 32, teacher: 'John Doe', type: 'Offline' },
    { id: 2, date: '2024-02-23', displayDate: 'Feb 23, 2024', grade: '9', division: 'B', present: 28, absent: 5, total: 33, teacher: 'Jane Smith', type: 'Online' },
    { id: 3, date: '2024-02-22', displayDate: 'Feb 22, 2024', grade: '10', division: 'A', present: 31, absent: 1, total: 32, teacher: 'Sarah Lee', type: 'Offline' },
    { id: 4, date: '2024-02-22', displayDate: 'Feb 22, 2024', grade: '9', division: 'A', present: 29, absent: 3, total: 32, teacher: 'John Doe', type: 'Offline' },
    { id: 5, date: '2024-02-21', displayDate: 'Feb 21, 2024', grade: '9', division: 'C', present: 34, absent: 0, total: 34, teacher: 'Michael Chen', type: 'Offline' },
  ];

  const studentHistory = [
    { date: '2024-02-23', status: 'present', checkIn: '08:45 AM', subject: 'Mathematics' },
    { date: '2024-02-22', status: 'present', checkIn: '08:50 AM', subject: 'English' },
    { date: '2024-02-21', status: 'absent', checkIn: '-', subject: 'Science' },
    { date: '2024-02-20', status: 'present', checkIn: '08:42 AM', subject: 'History' },
    { date: '2024-02-19', status: 'present', checkIn: '08:55 AM', subject: 'Geography' },
  ];

  const filteredHistory = useMemo(() => {
    return historyData.filter(item => {
      const matchGrade = selectedGrade === 'All' || item.grade === selectedGrade;
      const matchDiv = selectedDivision === 'All' || item.division === selectedDivision;
      const matchDate = !selectedDate || item.date === selectedDate;
      return matchGrade && matchDiv && matchDate;
    });
  }, [selectedGrade, selectedDivision, selectedDate]);

  const renderDetailsModal = () => (
    <AnimatePresence>
      {viewingDetails && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="card" 
            style={{ width: '100%', maxWidth: '600px', backgroundColor: 'white', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button 
              onClick={() => setViewingDetails(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '0.5rem', fontWeight: '800' }}>Attendance Details</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Grade {viewingDetails.grade}-{viewingDetails.division} • {viewingDetails.displayDate}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Present</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)' }}>{viewingDetails.present}</p>
              </div>
              <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--background)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Absent</p>
                <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--error)' }}>{viewingDetails.absent}</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Absent Students List</h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[...Array(viewingDetails.absent)].map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', border: '1px solid var(--border)', borderRadius: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={16} />
                  </div>
                  <span style={{ fontWeight: '600' }}>Absent Student Name #{i + 1}</span>
                </div>
              ))}
            </div>
            
            <button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '2rem' }}
              onClick={() => setViewingDetails(null)}
            >
              Close Details
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const renderAdminHistory = () => (
    <div className="animate-fade-in">
      {/* Filters */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end', backgroundColor: 'white' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Search by Date</label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
          />
        </div>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Grade</label>
          <select 
            value={selectedGrade} 
            onChange={(e) => setSelectedGrade(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
          >
            <option value="All">All Grades</option>
            <option value="9">Grade 9</option>
            <option value="10">Grade 10</option>
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.5rem' }}>Division</label>
          <select 
            value={selectedDivision} 
            onChange={(e) => setSelectedDivision(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
          >
            <option value="All">All Divisions</option>
            <option value="A">Division A</option>
            <option value="B">Division B</option>
            <option value="C">Division C</option>
          </select>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => { setSelectedDate(''); setSelectedGrade('All'); setSelectedDivision('All'); }}
          style={{ height: '48px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--text-muted)' }}
        >
          Reset
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: '700' }}>Recent Attendance Logs</h3>
          <button style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.6rem 1.2rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.9rem' }}>
            <Download size={18} /> Export Results
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--background)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Class</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Teacher</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Stats</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Rate</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? filteredHistory.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--background)' }}>
                  <td style={{ padding: '1rem', fontWeight: '600' }}>{log.displayDate}</td>
                  <td style={{ padding: '1rem' }}>Grade {log.grade}-{log.division}</td>
                  <td style={{ padding: '1rem' }}>{log.teacher}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ color: 'var(--success)', fontWeight: '600' }}>{log.present}P</span> / 
                    <span style={{ color: 'var(--error)', fontWeight: '600', marginLeft: '4px' }}>{log.absent}A</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', height: '6px', backgroundColor: 'var(--border)', borderRadius: '3px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: 'var(--success)', width: `${(log.present/log.total)*100}%`, borderRadius: '3px' }} />
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{Math.round((log.present/log.total)*100)}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => setViewingDetails(log)}
                      style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No logs found for selected criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTeacherHistory = () => (
    <div className="animate-fade-in">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div className="card" style={{ height: 'fit-content' }}>
          <h4 style={{ mb: '1rem', fontWeight: '700' }}>Quick Select Date</h4>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', marginBottom: '1rem' }} 
          />
          <div style={{ display: 'grid', gap: '0.5rem' }}>
            <div className="card" style={{ border: '1px solid var(--border)', background: 'var(--primary-light)' }}>
              <p style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: '700' }}>AVERAGE PRESENCE</p>
              <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>92%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '1.5rem' }}>
            <h3 style={{ fontWeight: '700' }}>Session Logs: Grade 9-A</h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '1rem' }}>Date</th>
                  <th style={{ padding: '1rem' }}>Present</th>
                  <th style={{ padding: '1rem' }}>Absent</th>
                  <th style={{ padding: '1rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map(log => (
                  <tr key={log.id} style={{ borderBottom: '1px solid var(--background)' }}>
                    <td style={{ padding: '1rem' }}>{log.displayDate}</td>
                    <td style={{ padding: '1rem', color: 'var(--success)', fontWeight: '600' }}>{log.present}</td>
                    <td style={{ padding: '1rem', color: 'var(--error)', fontWeight: '600' }}>{log.absent}</td>
                    <td style={{ padding: '1rem' }}>
                      <button 
                        onClick={() => setViewingDetails(log)}
                        style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.85rem', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentHistory = () => (
    <div className="animate-fade-in">
      <div className="card" style={{ mb: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontWeight: '700' }}>Attendance Calendar</h3>
        <input 
          type="month" 
          defaultValue="2024-02"
          style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--border)' }} 
        />
      </div>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {studentHistory.map((item, idx) => (
          <div key={idx} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: item.status === 'present' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: item.status === 'present' ? 'var(--success)' : 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.status === 'present' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
              </div>
              <div>
                <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>{item.date}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.subject} • {item.checkIn}</p>
              </div>
            </div>
            <span style={{ 
              padding: '0.4rem 1rem', 
              borderRadius: '20px', 
              backgroundColor: item.status === 'present' ? 'var(--primary-light)' : 'rgba(239, 68, 68, 0.1)', 
              color: item.status === 'present' ? 'var(--primary)' : 'var(--error)',
              fontWeight: '700',
              fontSize: '0.75rem'
            }}>{item.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      {renderDetailsModal()}
      
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Attendance History</h1>
          <p style={{ color: 'var(--text-muted)' }}>Analyze patterns and download records</p>
        </div>
        {(user.role === 'admin' || user.role === 'headmaster') && (
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileText size={18} /> Export Analytics
          </button>
        )}
      </div>

      {user.role === 'admin' || user.role === 'headmaster' ? renderAdminHistory() : 
       user.role === 'teacher' ? renderTeacherHistory() : renderStudentHistory()}
    </div>
  );
};

export default AttendanceHistory;
