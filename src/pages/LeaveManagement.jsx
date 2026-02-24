import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  FileCheck, 
  FileX, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const LeaveManagement = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Pending');

  const leaves = [
    { id: 1, name: 'Alex Smith', class: '9-A', reason: 'Medical Checkup', date: 'Feb 26, 2024', status: 'Pending', type: 'Medical' },
    { id: 2, name: 'Sarah Miller', class: '10-C', reason: 'Family Marriage', date: 'Feb 28-March 2', status: 'Pending', type: 'Personal' },
    { id: 3, name: 'John Wilson', class: '9-B', reason: 'Fever', date: 'Feb 22, 2024', status: 'Approved', type: 'Medical' },
    { id: 4, name: 'Emily Davis', class: '11-A', reason: 'Sports Event', date: 'Feb 21, 2024', status: 'Rejected', type: 'Other' },
  ];

  const filteredLeaves = leaves.filter(l => l.status === activeTab);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Leave Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track and approve student leave applications</p>
        </div>
        {user.role === 'student' && (
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Apply for Leave
          </button>
        )}
      </div>

      <div className="card" style={{ marginBottom: '2rem', padding: '0.5rem', backgroundColor: 'var(--background)', display: 'flex', gap: '0.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
        {['Pending', 'Approved', 'Rejected'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              flex: 1, 
              padding: '0.75rem', 
              borderRadius: '8px', 
              backgroundColor: activeTab === tab ? 'white' : 'transparent',
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: '600',
              boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {filteredLeaves.map(leave => (
          <motion.div 
            layout
            key={leave.id} 
            className="card" 
            style={{ border: '1px solid var(--border)', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: '700' }}>
                  {leave.name[0]}
                </div>
                <div>
                  <h4 style={{ fontWeight: '700' }}>{leave.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class {leave.class} • {leave.type} Leave</p>
                </div>
              </div>
              <span style={{ 
                fontSize: '0.7rem', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '4px', 
                backgroundColor: activeTab === 'Pending' ? '#fffbeb' : activeTab === 'Approved' ? '#ecfdf5' : '#fef2f2',
                color: activeTab === 'Pending' ? '#b45309' : activeTab === 'Approved' ? '#059669' : '#b91c1c',
                fontWeight: '700'
              }}>
                {leave.status}
              </span>
            </div>
            
            <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--background)', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{leave.reason}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                <Calendar size={14} />
                <span>Leaves for: {leave.date}</span>
              </div>
            </div>

            {user.role !== 'student' && activeTab === 'Pending' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ 
                  flex: 1, 
                  padding: '0.6rem', 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--success)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  fontWeight: '600' 
                }}>
                  <FileCheck size={18} /> Approve
                </button>
                <button style={{ 
                  flex: 1, 
                  padding: '0.6rem', 
                  borderRadius: '10px', 
                  backgroundColor: 'var(--error)', 
                  color: 'white', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  fontWeight: '600' 
                }}>
                  <FileX size={18} /> Reject
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaveManagement;
