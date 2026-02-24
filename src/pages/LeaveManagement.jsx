import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FileCheck, 
  FileX, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calendar,
  X,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LeaveManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Pending');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const leaves = [
    { id: 1, name: 'Alex Smith', class: '9-A', reason: 'Medical Checkup', date: 'Feb 26, 2024', status: 'Pending', type: 'Medical' },
    { id: 2, name: 'Sarah Miller', class: '10-C', reason: 'Family Marriage', date: 'Feb 28-March 2', status: 'Pending', type: 'Personal' },
    { id: 3, name: 'John Wilson', class: '9-B', reason: 'Fever', date: 'Feb 22, 2024', status: 'Approved', type: 'Medical' },
    { id: 4, name: 'Emily Davis', class: '11-A', reason: 'Sports Event', date: 'Feb 21, 2024', status: 'Rejected', type: 'Other' },
  ];

  const filteredLeaves = leaves.filter(l => l.status === activeTab);

  const renderApplyModal = () => (
    <AnimatePresence>
      {showApplyModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
          <motion.div initial={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }} animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }} exit={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }} className="card" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'white', position: 'relative', borderRadius: isMobile ? '32px 32px 0 0' : '24px', padding: '2.5rem 1.5rem 1.5rem' }}>
            {isMobile && <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', margin: '-1rem auto 1.5rem' }} />}
            <button onClick={() => setShowApplyModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'var(--background)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '50%', padding: '0.4rem' }}><X size={20} /></button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>Apply for Leave</h2>
            
            <form style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>REASON</label>
                <input placeholder="Why do you need leave?" style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                   <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>START DATE</label>
                   <input type="date" style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)' }} />
                </div>
                <div>
                   <label style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.4rem', display: 'block' }}>END DATE</label>
                   <input type="date" style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)' }} />
                </div>
              </div>
              <button type="button" onClick={() => setShowApplyModal(false)} className="btn-primary" style={{ width: '100%', height: '54px', marginTop: '1rem' }}><Send size={18} /> Submit Application</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="animate-slide-up" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      {renderApplyModal()}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Leaves</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Manage applications & excuses</p>
        </div>
        {user.role === 'student' && (
          <button onClick={() => setShowApplyModal(true)} style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={24} /></button>
        )}
      </div>

      <div className="card" style={{ marginBottom: '1.5rem', padding: '0.4rem', background: 'white', display: 'flex', borderRadius: '16px', border: '1px solid var(--border)' }}>
        {['Pending', 'Approved', 'Rejected'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: '0.75rem', borderRadius: '12px', background: activeTab === tab ? 'var(--primary-light)' : 'transparent', color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', fontSize: '0.85rem' }}>{tab}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
        {filteredLeaves.map(leave => (
          <motion.div layout key={leave.id} className="card" style={{ border: 'none', background: 'white', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '14px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: '800' }}>{leave.name[0]}</div>
                <div><h4 style={{ fontWeight: '800', fontSize: '1.05rem' }}>{leave.name}</h4><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Class {leave.class} • {leave.type}</p></div>
              </div>
              <span style={{ fontSize: '0.65rem', padding: '0.3rem 0.6rem', borderRadius: '20px', background: activeTab === 'Pending' ? '#fffbeb' : activeTab === 'Approved' ? '#ecfdf5' : '#fef2f2', color: activeTab === 'Pending' ? '#b45309' : activeTab === 'Approved' ? '#059669' : '#b91c1c', fontWeight: '800' }}>{leave.status.toUpperCase()}</span>
            </div>
            
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--background)', borderRadius: '16px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: '500' }}>"{leave.reason}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '600' }}><Calendar size={14} /> <span>{leave.date}</span></div>
            </div>

            {user.role !== 'student' && activeTab === 'Pending' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ flex: 1, height: '44px', borderRadius: '12px', background: 'var(--success)', color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>Approve</button>
                <button style={{ flex: 1, height: '44px', borderRadius: '12px', background: 'var(--error)', color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>Reject</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaveManagement;
