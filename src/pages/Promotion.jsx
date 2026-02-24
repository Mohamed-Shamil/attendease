import React, { useState, useMemo } from 'react';
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
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Promotion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPromoting, setIsPromoting] = useState(false);
  const [promotionComplete, setPromotionComplete] = useState(false);
  
  // New States for Detailed Selection
  const [currentGrade, setCurrentGrade] = useState('9');
  const [currentDivision, setCurrentDivision] = useState('All');
  const [targetGrade, setTargetGrade] = useState('10');
  const [targetDivision, setTargetDivision] = useState('Same');
  const [searchQuery, setSearchQuery] = useState('');

  // Expanded Mock student data to prevent "stuck" state
  const [students, setStudents] = useState([
    { id: 1, name: 'Alex Johnson', roll: '101', grade: '9', division: 'A', selected: true, status: 'pass' },
    { id: 2, name: 'Sarah Miller', roll: '102', grade: '9', division: 'A', selected: true, status: 'pass' },
    { id: 3, name: 'James Wilson', roll: '103', grade: '9', division: 'B', selected: true, status: 'pass' },
    { id: 4, name: 'Emily Brown', roll: '104', grade: '9', division: 'B', selected: false, status: 'fail' },
    { id: 5, name: 'Michael Davis', roll: '105', grade: '9', division: 'A', selected: true, status: 'pass' },
    { id: 6, name: 'John Smith', roll: '106', grade: '10', division: 'A', selected: true, status: 'pass' },
    { id: 7, name: 'Linda White', roll: '107', grade: '10', division: 'B', selected: true, status: 'pass' },
    { id: 8, name: 'Robert Fox', roll: '201', grade: '11', division: 'A', selected: true, status: 'pass' },
    { id: 9, name: 'Jane Cooper', roll: '202', grade: '11', division: 'C', selected: true, status: 'pass' },
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
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, selected: !s.selected } : s
    ));
  };

  const toggleAllInView = (selected) => {
    const visibleIds = filteredStudents.map(s => s.id);
    setStudents(prev => prev.map(s => 
      visibleIds.includes(s.id) ? { ...s, selected } : s
    ));
  };

  const selectedCount = students.filter(s => s.selected && s.grade === currentGrade && (currentDivision === 'All' || s.division === currentDivision)).length;

  const steps = [
    { title: 'Selection', icon: Search },
    { title: 'Student List', icon: Users },
    { title: 'Confirmation', icon: ArrowRightLeft },
    { title: 'Complete', icon: CheckCircle2 },
  ];

  const handlePromote = () => {
    setIsPromoting(true);
    setTimeout(() => {
      setIsPromoting(false);
      setPromotionComplete(true);
      setCurrentStep(4);
    }, 3000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Academic Year Promotion</h1>
        <p style={{ color: 'var(--text-muted)' }}>Bulk promote students grade-wise or division-wise with individual selection</p>
      </div>

      {/* Steps Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3rem', position: 'relative', overflowX: 'auto', padding: '0.5rem' }}>
        <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', backgroundColor: 'var(--border)', zIndex: 0 }} />
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum <= currentStep;
          return (
            <div key={idx} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--background)', padding: '0 1rem', minWidth: '100px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: isActive ? 'var(--primary)' : 'white', color: isActive ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid', borderColor: isActive ? 'var(--primary)' : 'var(--border)', transition: 'all 0.3s ease' }}>
                <step.icon size={18} />
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: '600', color: isActive ? 'var(--primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{step.title}</span>
            </div>
          );
        })}
      </div>

      <div className="card" style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {!promotionComplete ? (
          <div>
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ backgroundColor: 'var(--primary-light)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                  <Info color="var(--primary)" />
                  <div>
                    <p style={{ fontWeight: '600', color: 'var(--primary)' }}>Academic Step 1: Define Promotion Scope</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Select the source grade/division and the target destination. You can refine the student list in the next step.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2rem', alignItems: 'center' }}>
                  <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border)' }}>
                    <h4 style={{ marginBottom: '1.25rem', color: 'var(--primary)', fontWeight: '700' }}>Source (From)</h4>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>Current Grade</label>
                        <select value={currentGrade} onChange={(e) => { setCurrentGrade(e.target.value); setTargetGrade((parseInt(e.target.value)+1).toString()); }} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}>
                          <option value="9">Grade 9</option>
                          <option value="10">Grade 10</option>
                          <option value="11">Grade 11</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>Division/Section</label>
                        <select value={currentDivision} onChange={(e) => setCurrentDivision(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}>
                          <option value="All">All Divisions</option>
                          <option value="A">Division A</option>
                          <option value="B">Division B</option>
                          <option value="C">Division C</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ backgroundColor: 'var(--background)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                      <ChevronRight size={32} color="var(--primary)" />
                    </div>
                  </div>

                  <div className="card" style={{ padding: '1.5rem', border: '1px solid var(--border)' }}>
                    <h4 style={{ marginBottom: '1.25rem', color: 'var(--success)', fontWeight: '700' }}>Target (To)</h4>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>Target Grade</label>
                        <select value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}>
                          <option value="10">Grade 10</option>
                          <option value="11">Grade 11</option>
                          <option value="12">Grade 12</option>
                          <option value="Graduated">Graduated/Alumni</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.8rem', fontWeight: '600' }}>Target Division</label>
                        <select value={targetDivision} onChange={(e) => setTargetDivision(e.target.value)} style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }}>
                          <option value="Same">Assign to Same Division</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="Shuffle">Shuffle Divisions</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn-primary" onClick={() => setCurrentStep(2)}>
                    Next: Student Selection <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h4 style={{ fontWeight: '700' }}>Available Students - Grade {currentGrade}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedCount} selected for promotion</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => toggleAllInView(true)} style={{ padding: '0.6rem 1rem', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', fontSize: '0.85rem', fontWeight: '600' }}>Select All</button>
                    <button onClick={() => toggleAllInView(false)} style={{ padding: '0.6rem 1rem', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', fontSize: '0.85rem', fontWeight: '600' }}>Deselect All</button>
                  </div>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid var(--border)', borderRadius: '12px', marginBottom: '2rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8fafc', zIndex: 5 }}>
                      <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                        <th style={{ padding: '1rem', width: '50px' }}>Select</th>
                        <th style={{ padding: '1rem' }}>Roll No</th>
                        <th style={{ padding: '1rem' }}>Student Name</th>
                        <th style={{ padding: '1rem' }}>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                        <tr key={student.id} onClick={() => toggleStudentSelection(student.id)} style={{ borderBottom: '1px solid var(--background)', cursor: 'pointer', backgroundColor: student.selected ? 'var(--primary-light)' : 'transparent' }}>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <input type="checkbox" checked={student.selected} readOnly style={{ width: '18px', height: '18px' }} />
                          </td>
                          <td style={{ padding: '1rem', fontWeight: '600' }}>{student.roll}</td>
                          <td style={{ padding: '1rem' }}>{student.name} (Div {student.division})</td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '700', backgroundColor: student.status === 'pass' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: student.status === 'pass' ? 'var(--success)' : 'var(--error)' }}>
                              {student.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr style={{ textAlign: 'center' }}>
                          <td colSpan="4" style={{ padding: '4rem 2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                              <Lightbulb size={48} color="var(--primary)" />
                              <p style={{ color: 'var(--text-muted)' }}>No students found in Grade {currentGrade}-{currentDivision}.</p>
                              <button onClick={generateDemoStudents} style={{ color: 'var(--primary)', fontWeight: '700', border: '1px solid var(--primary)', padding: '0.6rem 1.5rem', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>
                                Generate Sample Students
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'white' }} onClick={() => setCurrentStep(1)}>Back</button>
                  <button className="btn-primary" onClick={() => setCurrentStep(3)} disabled={selectedCount === 0}>
                    Next: Confirmation <ChevronRight size={18} style={{ marginLeft: '0.5rem' }} />
                  </button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="card" style={{ backgroundColor: '#fdf2f2', border: '1px solid #fee2e2', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                  <Info color="#ef4444" />
                  <div>
                    <p style={{ fontWeight: '700', color: '#b91c1c' }}>Final Execution Point</p>
                    <p style={{ fontSize: '0.85rem', color: '#b91c1c' }}>You are moving {selectedCount} students to Grade {targetGrade}.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div className="card" style={{ textAlign: 'center', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TOTAL SIZE</p>
                    <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary)' }}>{selectedCount}</p>
                  </div>
                  <div className="card" style={{ textAlign: 'center', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SOURCE</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '800' }}>Grade {currentGrade}</p>
                  </div>
                  <div className="card" style={{ textAlign: 'center', border: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DESTINATION</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--success)' }}>Grade {targetGrade}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                  <button style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'white' }} onClick={() => setCurrentStep(2)}>Back</button>
                  <button className="btn-primary" onClick={handlePromote} disabled={isPromoting} style={{ minWidth: '220px' }}>
                    {isPromoting ? <RefreshCw className="animate-spin" size={18} /> : 'Complete Year-End Promotion'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--success)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <CheckCircle2 size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Batch Completed!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>The student database has been successfully updated for the new session.</p>
            <button className="btn-primary" onClick={() => { setPromotionComplete(false); setCurrentStep(1); }}>Manage Another Grade</button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Promotion;
