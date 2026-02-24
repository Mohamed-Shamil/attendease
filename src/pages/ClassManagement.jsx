import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Edit2, Trash2, Users, UserPlus, X, BookOpen, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClassManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [classes, setClasses] = useState([
    { id: 1, name: 'Grade 10-A', teacher: 'John Doe', students: 32, attendance: '94%', color: '#2563eb' },
    { id: 2, name: 'Grade 10-B', teacher: 'Sarah Lee', students: 30, attendance: '92%', color: '#10b981' },
    { id: 3, name: 'Grade 9-A', teacher: 'Michael Chen', students: 35, attendance: '95%', color: '#f59e0b' },
    { id: 4, name: 'Grade 9-B', teacher: 'Jane Smith', students: 33, attendance: '91%', color: '#ef4444' },
  ]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [newClass, setNewClass] = useState({ name: '', teacher: '', students: 0 });

  const handleCreateClass = (e) => {
    e.preventDefault();
    const id = Date.now();
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const color = colors[classes.length % colors.length];
    setClasses([...classes, { ...newClass, id, attendance: '0%', color }]);
    setShowModal(false);
    setNewClass({ name: '', teacher: '', students: 0 });
  };

  const removeClass = (id) => setClasses(classes.filter(c => c.id !== id));

  const renderModal = () => (
    <AnimatePresence>
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: isMobile ? 'flex-end' : 'center', justifyContent: 'center', zIndex: 1100, backdropFilter: 'blur(4px)' }}>
          <motion.div initial={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }} animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1 }} exit={isMobile ? { y: 300 } : { opacity: 0, scale: 0.95 }} className="card" style={{ width: '100%', maxWidth: '450px', backgroundColor: 'white', position: 'relative', borderRadius: isMobile ? '32px 32px 0 0' : '24px', padding: '2.5rem 1.5rem 1.5rem' }}>
            {isMobile && <div style={{ width: '40px', height: '4px', backgroundColor: 'var(--border)', borderRadius: '2px', margin: '-1rem auto 1.5rem' }} />}
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'var(--background)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', borderRadius: '50%', padding: '0.4rem' }}><X size={20} /></button>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem' }}>New Class</h2>
            <form onSubmit={handleCreateClass} style={{ display: 'grid', gap: '1rem' }}>
              <input required placeholder="Class Name (e.g. Grade 11-A)" value={newClass.name} onChange={e => setNewClass({...newClass, name: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              <input required placeholder="Assign Teacher" value={newClass.teacher} onChange={e => setNewClass({...newClass, teacher: e.target.value})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              <input type="number" placeholder="Student Count" value={newClass.students} onChange={e => setNewClass({...newClass, students: parseInt(e.target.value)})} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '600' }} />
              <button type="submit" className="btn-primary" style={{ height: '54px', marginTop: '1rem' }}>Save Class</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="animate-slide-up" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      {renderModal()}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Classes</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Academic structure & assignments</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={24} /></button>
      </div>

      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input type="text" placeholder="Search classes..." style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '16px', border: '1px solid var(--border)', outline: 'none', background: 'white', fontWeight: '600' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {classes.map((cls) => (
          <div key={cls.id} className="card animate-slide-up" style={{ border: 'none', background: 'white', borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ height: '6px', background: cls.color }} />
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontWeight: '900', fontSize: '1.2rem', color: 'var(--text-main)' }}>{cls.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>Taught by {cls.teacher}</p>
                </div>
                <button onClick={() => removeClass(cls.id)} style={{ color: 'var(--error)', background: '#fef2f2', border: 'none', padding: '0.5rem', borderRadius: '10px' }}><Trash2 size={18} /></button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: '14px' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Students</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: '900' }}>{cls.students}</p>
                </div>
                <div style={{ background: 'var(--background)', padding: '0.75rem', borderRadius: '14px' }}>
                  <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Attendance</p>
                  <p style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--success)' }}>{cls.attendance}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button style={{ flex: 1, height: '44px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Users size={16} /> Students</button>
                <button style={{ flex: 1, height: '44px', borderRadius: '12px', background: 'var(--background)', color: 'var(--text-muted)', fontWeight: '800', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Edit2 size={16} /> Edit</button>
              </div>
            </div>
          </div>
        ))}
        
        <button onClick={() => setShowModal(true)} style={{ border: '2px dashed var(--border)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '2rem', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', minHeight: '200px' }}>
          <Plus size={32} />
          <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>Add New Class</span>
        </button>
      </div>
    </div>
  );
};

export default ClassManagement;
