import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowRightLeft, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  Info,
  RefreshCw,
  Search,
  Filter,
  UserCheck,
  UserX,
  Users,
  Lightbulb,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Promotion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPromoting, setIsPromoting] = useState(false);
  const [promotionComplete, setPromotionComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const [currentGrade, setCurrentGrade] = useState('9');
  const [currentDivision, setCurrentDivision] = useState('All');
  const [targetGrade, setTargetGrade] = useState('10');
  const [targetDivision, setTargetDivision] = useState('Same');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', roll: '101', grade: '9', division: 'A', selected: true, status: 'pass' },
    { id: 2, name: 'Sarah Miller', roll: '102', grade: '9', division: 'A', selected: true, status: 'pass' },
    { id: 3, name: 'James Wilson', roll: '103', grade: '9', division: 'B', selected: true, status: 'pass' },
    { id: 4, name: 'Emily Brown', roll: '104', grade: '9', division: 'B', selected: false, status: 'fail' },
    { id: 5, name: 'Michael Davis', roll: '105', grade: '9', division: 'A', selected: true, status: 'pass' },
  ]);

  const generateDemoStudents = () => {
    const newDemoStudents = [
      { id: Date.now() + 1, name: `Demo Student ${currentGrade}-A`, roll: 'D01', grade: currentGrade, division: 'A', selected: true, status: 'pass' },
      { id: Date.now() + 2, name: `Demo Student ${currentGrade}-B`, roll: 'D02', grade: currentGrade, division: 'B', selected: true, status: 'pass' },
    ];
    setStudents([...students, ...newDemoStudents]);
  };

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesGrade = s.grade === currentGrade;
      const matchesDivision = currentDivision === 'All' || s.division === currentDivision;
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.roll.includes(searchQuery);
      return matchesGrade && matchesDivision && matchesSearch;
    });
  }, [students, currentGrade, currentDivision, searchQuery]);

  const toggleStudentSelection = (id) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const toggleAllInView = (selected) => {
    const visibleIds = filteredStudents.map(s => s.id);
    setStudents(prev => prev.map(s => visibleIds.includes(s.id) ? { ...s, selected } : s));
  };

  const selectedCount = students.filter(s => s.selected && s.grade === currentGrade && (currentDivision === 'All' || s.division === currentDivision)).length;

  const steps = [
    { title: 'Setup', icon: Filter },
    { title: 'Select', icon: Users },
    { title: 'Review', icon: ArrowRightLeft },
  ];

  const handlePromote = () => {
    setIsPromoting(true);
    setTimeout(() => {
      setIsPromoting(false);
      setPromotionComplete(true);
      setCurrentStep(4);
    }, 2500);
  };

  return (
    <div className="animate-slide-up" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2.25rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Yearly Promotion</h1>
        <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Manage academic transitions</p>
      </div>

      {!promotionComplete && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', gap: isMobile ? '0.5rem' : '2rem' }}>
          {steps.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: isDone ? 'var(--success)' : (isActive ? 'var(--primary)' : 'white'), color: (isActive || isDone) ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', borderColor: isDone ? 'var(--success)' : (isActive ? 'var(--primary)' : 'var(--border)'), transition: 'all 0.3s' }}>
                  {isDone ? <CheckCircle2 size={18} /> : <step.icon size={18} />}
                </div>
                {!isMobile && <span style={{ fontSize: '0.85rem', fontWeight: '800', color: isActive ? 'var(--primary)' : 'var(--text-muted)' }}>{step.title}</span>}
              </div>
            );
          })}
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {!promotionComplete ? (
          <div>
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="card" style={{ marginBottom: '2rem', background: 'var(--primary)', color: 'white', border: 'none' }}>
                  <h4 style={{ fontWeight: '800', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Phase 1: Configure Scope</h4>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>Identify the grade and division you want to promote for the next academic session.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div className="card" style={{ border: 'none', background: 'white' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>SOURCE GRADE</p>
                    <select value={currentGrade} onChange={(e) => { setCurrentGrade(e.target.value); setTargetGrade((parseInt(e.target.value)+1).toString()); }} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '700' }}>
                      <option value="9">Grade 9</option><option value="10">Grade 10</option>
                    </select>
                    <div style={{ marginTop: '1rem' }}>
                       <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>DIVISION</p>
                       <select value={currentDivision} onChange={(e) => setCurrentDivision(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '700' }}>
                        <option value="All">All Divisions</option><option value="A">A</option><option value="B">B</option>
                      </select>
                    </div>
                  </div>

                  <div className="card" style={{ border: 'none', background: 'white' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase' }}>DESTINATION GRADE</p>
                    <select value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '700' }}>
                      <option value="10">Grade 10</option><option value="11">Grade 11</option><option value="Graduated">Graduated</option>
                    </select>
                    <div style={{ marginTop: '1rem' }}>
                       <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>NEW DIVISION</p>
                       <select value={targetDivision} onChange={(e) => setTargetDivision(e.target.value)} style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1px solid var(--border)', fontWeight: '700' }}>
                        <option value="Same">Keep Original</option><option value="A">A</option><option value="B">B</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="btn-primary" onClick={() => setCurrentStep(2)} style={{ width: '100%', height: '54px' }}>Continue to Selection <ChevronRight size={20} /></button>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontWeight: '800', fontSize: '1.1rem' }}>Available Students</h4>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => toggleAllInView(true)} style={{ padding: '0.5rem 0.75rem', borderRadius: '10px', background: 'white', border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: '800' }}>ALL</button>
                    <button onClick={() => toggleAllInView(false)} style={{ padding: '0.5rem 0.75rem', borderRadius: '10px', background: 'white', border: '1px solid var(--border)', fontSize: '0.75rem', fontWeight: '800' }}>NONE</button>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
                  {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                    <div key={student.id} onClick={() => toggleStudentSelection(student.id)} style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: student.selected ? 'var(--primary-light)' : 'white' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '2px solid var(--primary)', background: student.selected ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {student.selected && <CheckCircle2 size={12} color="white" />}
                        </div>
                        <div>
                          <p style={{ fontWeight: '800', fontSize: '1rem' }}>{student.name}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Roll: {student.roll} • Div {student.division}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: '900', color: student.status === 'pass' ? 'var(--success)' : 'var(--error)' }}>{student.status.toUpperCase()}</span>
                    </div>
                  )) : (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                      <Lightbulb size={40} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                      <p style={{ fontWeight: '700', marginBottom: '1.5rem' }}>No Students Found</p>
                      <button onClick={generateDemoStudents} style={{ color: 'var(--primary)', fontWeight: '800' }}>+ Generate Mock Students</button>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ flex: 1, padding: '1rem', borderRadius: '14px', background: 'white', border: '1px solid var(--border)', fontWeight: '800' }} onClick={() => setCurrentStep(1)}><ArrowLeft size={20} /></button>
                  <button className="btn-primary" style={{ flex: 3 }} onClick={() => setCurrentStep(3)} disabled={selectedCount === 0}>Review {selectedCount} Students</button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="card" style={{ background: '#fef2f2', border: 'none', color: '#dc2626', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontWeight: '900', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertCircle size={20}/> Final Confirmation</h4>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9 }}>This will move students from Grade {currentGrade} to {targetGrade}.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
                  <div className="card" style={{ textAlign: 'center', border: 'none', background: 'white' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)' }}>MIGRATING</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' }}>{selectedCount}</p>
                  </div>
                  <div className="card" style={{ textAlign: 'center', border: 'none', background: 'white' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)' }}>FROM</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '900' }}>GR {currentGrade}</p>
                  </div>
                  <div className="card" style={{ textAlign: 'center', border: 'none', background: 'white' }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)' }}>TO</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--success)' }}>GR {targetGrade}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ flex: 1, padding: '1rem', borderRadius: '14px', background: 'white', border: '1px solid var(--border)' }} onClick={() => setCurrentStep(2)}><ArrowLeft size={20} /></button>
                  <button className="btn-primary" style={{ flex: 3 }} onClick={handlePromote} disabled={isPromoting}>
                    {isPromoting ? <RefreshCw className="animate-spin" size={20} /> : 'Complete Promotion'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--success)', borderRadius: '24px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', transform: 'rotate(5deg)' }}><CheckCircle2 size={40} /></div>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>Success!</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '2.5rem' }}>The academic records have been successfully migrated to Grade {targetGrade}.</p>
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => { setPromotionComplete(false); setCurrentStep(1); }}>Perform Another Batch</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Promotion;
