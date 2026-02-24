import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Edit2, Trash2, Users, UserPlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ClassManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [classes, setClasses] = useState([
    { id: 1, name: 'Grade 10-A', teacher: 'John Doe', students: 32, attendance: '94%' },
    { id: 2, name: 'Grade 10-B', teacher: 'Sarah Lee', students: 30, attendance: '92%' },
    { id: 3, name: 'Grade 9-A', teacher: 'Michael Chen', students: 35, attendance: '95%' },
    { id: 4, name: 'Grade 9-B', teacher: 'Jane Smith', students: 33, attendance: '91%' },
  ]);

  const [newClass, setNewClass] = useState({ name: '', teacher: '', students: 0 });

  const handleCreateClass = (e) => {
    e.preventDefault();
    const id = Date.now();
    setClasses([...classes, { ...newClass, id, attendance: '0%' }]);
    setShowModal(false);
    setNewClass({ name: '', teacher: '', students: 0 });
  };

  const removeClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  return (
    <div className="animate-fade-in">
      {/* Create Class Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card" 
              style={{ width: '100%', maxWidth: '450px', backgroundColor: 'white' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontWeight: '800' }}>Create New Class</h2>
                <button onClick={() => setShowModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X /></button>
              </div>

              <form onSubmit={handleCreateClass} style={{ display: 'grid', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Class Name</label>
                  <input 
                    required 
                    placeholder="e.g. Grade 11-A"
                    value={newClass.name} 
                    onChange={e => setNewClass({...newClass, name: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Assigned Teacher</label>
                  <input 
                    required 
                    placeholder="Teacher name"
                    value={newClass.teacher} 
                    onChange={e => setNewClass({...newClass, teacher: e.target.value})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: '600' }}>Initial Student Count</label>
                  <input 
                    type="number" 
                    value={newClass.students} 
                    onChange={e => setNewClass({...newClass, students: parseInt(e.target.value)})}
                    style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} 
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Save Class Settings</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Class Management</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your school classes and teacher assignments</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Create New Class
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--border)' }} />
            <input 
              type="text" 
              placeholder="Search classes or teachers..." 
              style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', width: '100%' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {classes.map((cls) => (
            <div key={cls.id} className="card" style={{ border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '4px', 
                height: '100%', 
                backgroundColor: 'var(--primary)' 
              }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontWeight: '700', fontSize: '1.2rem' }}>{cls.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Teacher: {cls.teacher}</p>
                </div>
                <button style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => removeClass(cls.id)}><Trash2 size={18} /></button>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Students</p>
                  <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>{cls.students}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Attendance</p>
                  <p style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--success)' }}>{cls.attendance}</p>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <button style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '500' }}>
                  <Edit2 size={14} /> Edit
                </button>
                <button style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: '500' }}>
                  <Users size={14} /> Students
                </button>
              </div>
            </div>
          ))}
          
          <button 
            onClick={() => setShowModal(true)}
            style={{ 
              border: '2px dashed var(--border)', 
              borderRadius: 'var(--radius)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1rem',
              padding: '2rem',
              backgroundColor: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <Plus size={32} />
            <span style={{ fontWeight: '600' }}>Add New Class</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassManagement;
