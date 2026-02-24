import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ShieldCheck, 
  BookOpen,
  Mail,
  Phone,
  X,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const { user } = useAuth();
  const [activeRole, setActiveRole] = useState('teacher');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // State for Personnel
  const [personnel, setPersonnel] = useState({
    teacher: [
      { id: 1, name: 'John Doe', email: 'john@school.edu', phone: '+123456789', class: '9-A', status: 'Active' },
      { id: 2, name: 'Sarah Lee', email: 'sarah@school.edu', phone: '+123456790', class: '10-B', status: 'Active' },
      { id: 3, name: 'Michael Chen', email: 'michael@school.edu', phone: '+123456791', class: '11-C', status: 'On Leave' },
    ],
    student: [
      { id: 101, name: 'Alex Johnson', email: 'parent.alex@gmail.com', phone: '+198765432', class: '9-A', status: 'Active' },
      { id: 102, name: 'Emily Brown', email: 'parent.emily@gmail.com', phone: '+198765433', class: '9-A', status: 'Active' },
      { id: 103, name: 'James Wilson', email: 'parent.james@gmail.com', phone: '+198765434', class: '10-B', status: 'Inactive' },
    ],
    admin: [
      { id: 1001, name: 'Admin Root', email: 'root@school.edu', phone: '+111222333', role: 'Super Admin', status: 'Active' },
      { id: 1002, name: 'HM Wilson', email: 'hm@school.edu', phone: '+111222444', role: 'Headmaster', status: 'Active' },
    ]
  });

  // State for Add User Form
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    class: '',
    role: '',
    status: 'Active'
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = Date.now();
    const finalUser = { ...newUser, id };
    
    setPersonnel(prev => ({
      ...prev,
      [activeRole]: [...prev[activeRole], finalUser]
    }));
    
    setShowAddModal(false);
    setNewUser({ name: '', email: '', phone: '', class: '', role: '', status: 'Active' });
  };

  const list = personnel[activeRole].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderAddModal = () => (
    <AnimatePresence>
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="card" 
            style={{ width: '100%', maxWidth: '500px', backgroundColor: 'white', position: 'relative' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontWeight: '800' }}>Add New {activeRole}</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X /></button>
            </div>

            <form onSubmit={handleAddUser} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', mb: '0.4rem' }}>Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Enter name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', mb: '0.4rem' }}>Email Account</label>
                  <input 
                    required
                    type="email" 
                    placeholder="email@school.edu"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', mb: '0.4rem' }}>Mobile Number</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="+12345..."
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
                  />
                </div>
              </div>
              
              {activeRole !== 'admin' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', mb: '0.4rem' }}>Assigned Class</label>
                  <select 
                    value={newUser.class}
                    onChange={(e) => setNewUser({...newUser, class: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}
                  >
                    <option value="">Select Class</option>
                    <option value="9-A">Grade 9-A</option>
                    <option value="9-B">Grade 9-B</option>
                    <option value="10-C">Grade 10-C</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', mb: '0.4rem' }}>Admin Position</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Accountant, Registrar"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
                  />
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Register {activeRole} Account
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="animate-fade-in">
      {renderAddModal()}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>User Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage teachers, students, and administrative staff</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => setShowAddModal(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <UserPlus size={18} /> Add New {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', backgroundColor: 'var(--card)', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
          {['teacher', 'student', 'admin'].map(role => (
            <button 
              key={role}
              onClick={() => { setActiveRole(role); setNewUser({...newUser, class: '', role: ''}); }}
              style={{ 
                padding: '0.6rem 1.5rem', 
                borderRadius: '8px', 
                backgroundColor: activeRole === role ? 'var(--primary)' : 'transparent',
                color: activeRole === role ? 'white' : 'var(--text-muted)',
                fontWeight: '600',
                textTransform: 'capitalize'
              }}
            >
              {role}s
            </button>
          ))}
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--border)' }} />
          <input 
            type="text" 
            placeholder={`Search ${activeRole}s by name...`} 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none' }}
          />
        </div>
      </div>

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--background)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Contact Info</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>{activeRole === 'admin' ? 'Role' : 'Class'}</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? list.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--background)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                        {p.name[0]}
                      </div>
                      <span style={{ fontWeight: '600' }}>{p.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}><Mail size={12} /> {p.email}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)' }}><Phone size={12} /> {p.phone}</div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>{p.class || p.role}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.2rem 0.6rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      backgroundColor: p.status === 'Active' ? '#ecfdf5' : '#fff7ed',
                      color: p.status === 'Active' ? '#059669' : '#c2410c'
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{ padding: '0.4rem', borderRadius: '6px', background: 'var(--background)', color: 'var(--text-muted)' }}><Edit2 size={16} /></button>
                      <button 
                        onClick={() => setPersonnel(prev => ({...prev, [activeRole]: prev[activeRole].filter(user => user.id !== p.id)}))}
                        style={{ padding: '0.4rem', borderRadius: '6px', background: '#fef2f2', color: 'var(--error)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                   <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
