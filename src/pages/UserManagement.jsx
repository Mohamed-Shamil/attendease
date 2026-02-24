import React, { useState, useEffect } from 'react';
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
  Check,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserManagement = () => {
  const { user } = useAuth();
  const [activeRole, setActiveRole] = useState('teacher');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [personnel, setPersonnel] = useState({
    teacher: [
      { id: 1, name: 'John Doe', email: 'john@school.edu', phone: '+123456789', class: '9-A', status: 'Active' },
      { id: 2, name: 'Sarah Lee', email: 'sarah@school.edu', phone: '+123456790', class: '10-B', status: 'Active' },
    ],
    student: [
      { id: 101, name: 'Alex Johnson', email: 'parent.alex@gmail.com', phone: '+198765432', class: '9-A', status: 'Active' },
      { id: 102, name: 'Emily Brown', email: 'parent.emily@gmail.com', phone: '+198765433', class: '9-A', status: 'Active' },
    ],
    admin: [
      { id: 1001, name: 'Admin Root', email: 'root@school.edu', phone: '+111222333', role: 'Super Admin', status: 'Active' },
    ]
  });

  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', class: '', role: '', status: 'Active' });

  const handleAddUser = (e) => {
    e.preventDefault();
    const id = Date.now();
    setPersonnel(prev => ({ ...prev, [activeRole]: [...prev[activeRole], { ...newUser, id }] }));
    setShowAddModal(false);
    setNewUser({ name: '', email: '', phone: '', class: '', role: '', status: 'Active' });
  };

  const list = personnel[activeRole].filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderAddModal = () => (
    <AnimatePresence>
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
          <motion.div initial={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }} animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }} exit={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }} className="card" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'white', position: 'relative', borderRadius: isMobile ? '32px 32px 0 0' : '24px', padding: '2.5rem 1.5rem 1.5rem' }}>
            {isMobile && <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', margin: '-1rem auto 1.5rem' }} />}
            <button onClick={() => setShowAddModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'var(--background)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '50%', padding: '0.4rem' }}><X size={20} /></button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>Add {activeRole}</h2>
            <form onSubmit={handleAddUser} style={{ display: 'grid', gap: '1rem' }}>
              <input required placeholder="Full Name" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              <input required type="email" placeholder="Email Address" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              <input required type="tel" placeholder="Phone Number" value={newUser.phone} onChange={(e) => setNewUser({...newUser, phone: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              {activeRole !== 'admin' ? (
                <select value={newUser.class} onChange={(e) => setNewUser({...newUser, class: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }}>
                  <option value="">Select Class</option><option value="9-A">Grade 9-A</option><option value="10-B">Grade 10-B</option>
                </select>
              ) : (
                <input placeholder="Position" value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              )}
              <button type="submit" className="btn-primary" style={{ height: '54px', marginTop: '1rem' }}>Create Account</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="animate-slide-up" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      {renderAddModal()}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Directory</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Manage school personnel</p>
        </div>
        <button onClick={() => setShowAddModal(true)} style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={24} /></button>
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', background: 'white', padding: '0.3rem', borderRadius: '16px', border: '1px solid var(--border)', overflowX: 'auto' }}>
          {['teacher', 'student', 'admin'].map(role => (
            <button key={role} onClick={() => setActiveRole(role)} style={{ flex: isMobile ? 1 : 'none', minWidth: '100px', padding: '0.7rem 1.25rem', borderRadius: '12px', background: activeRole === role ? 'var(--primary)' : 'transparent', color: activeRole === role ? 'white' : 'var(--text-muted)', fontWeight: '800', fontSize: '0.8rem', textTransform: 'capitalize' }}>{role}s</button>
          ))}
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search names..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '16px', border: '1px solid var(--border)', outline: 'none', background: 'white', fontWeight: '600' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1rem' }}>
        {list.map(p => (
          <div key={p.id} className="card animate-slide-up" style={{ border: 'none', background: 'white', borderRadius: '24px', display: 'flex', gap: '1rem', alignItems: 'center', padding: '1.25rem' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.2rem', flexShrink: 0 }}>{p.name[0]}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</h4>
                <div style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', background: '#ecfdf5', color: '#059669', fontSize: '0.65rem', fontWeight: '900' }}>ACTIVE</div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '1rem' }}>{p.class || p.role} • {activeRole.toUpperCase()}</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ flex: 1, padding: '0.5rem', borderRadius: '10px', background: 'var(--background)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mail size={16} /></button>
                <button style={{ flex: 1, padding: '0.5rem', borderRadius: '10px', background: 'var(--background)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={16} /></button>
                <button style={{ flex: 1, padding: '0.5rem', borderRadius: '10px', background: '#fef2f2', color: 'var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setPersonnel(prev => ({...prev, [activeRole]: prev[activeRole].filter(user => user.id !== p.id)}))}><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
