import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Camera,
  BellRing,
  Lock,
  Database,
  ArrowRight
} from 'lucide-react';

const Settings = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="animate-slide-up" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>Profile Settings</h1>
        <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Manage school identity & system preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2.5fr', gap: '1.5rem' }}>
        <div style={{ display: isMobile ? 'flex' : 'block', gap: '0.5rem', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '0.5rem' : '0' }}>
          {['General', 'Notifications', 'Privacy', 'Billing'].map((tab, idx) => (
            <button key={tab} style={{ 
              width: isMobile ? 'auto' : '100%', 
              textAlign: isMobile ? 'center' : 'left', 
              padding: '1rem 1.25rem', 
              borderRadius: '16px', 
              backgroundColor: idx === 0 ? 'var(--primary)' : 'white', 
              color: idx === 0 ? 'white' : 'var(--text-muted)', 
              fontWeight: '800', 
              fontSize: '0.9rem',
              marginBottom: isMobile ? '0' : '0.5rem',
              whiteSpace: 'nowrap',
              boxShadow: idx === 0 ? 'var(--shadow-md)' : 'none',
              border: idx === 0 ? 'none' : '1px solid var(--border)'
            }}>{tab}</button>
          ))}
        </div>

        <div className="card" style={{ border: 'none', background: 'white', borderRadius: '28px' }}>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'center' : 'flex-start', gap: '2rem', marginBottom: '3rem', textAlign: isMobile ? 'center' : 'left' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '32px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SettingsIcon size={54} />
              </div>
              <button style={{ position: 'absolute', bottom: -5, right: -5, backgroundColor: 'white', border: 'none', borderRadius: '14px', padding: '0.6rem', boxShadow: 'var(--shadow-md)' }}>
                <Camera size={20} color="var(--primary)" />
              </button>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontWeight: '900', fontSize: '1.5rem', color: 'var(--text-main)' }}>Elite International School</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1.5rem' }}>School ID: ELITE-S001-2024</p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <div style={{ padding: '0.5rem 1rem', background: 'var(--background)', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800' }}>VERIFIED</div>
                <div style={{ padding: '0.5rem 1rem', background: '#ecfdf5', color: '#059669', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800' }}>PREMIUM</div>
              </div>
            </div>
          </div>

          <form style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>OFFICIAL NAME</label>
              <input type="text" defaultValue="Elite International School" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', fontWeight: '700', background: 'var(--background)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>SUPPORT EMAIL</label>
              <input type="email" defaultValue="admin@eliteschool.edu" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', fontWeight: '700', background: 'var(--background)' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>HELPLINE</label>
              <input type="text" defaultValue="+1 (555) 000-1234" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', fontWeight: '700', background: 'var(--background)' }} />
            </div>
            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>CAMPUS ADDRESS</label>
              <textarea defaultValue="123 Education Lane, Learning City, State 54321" style={{ width: '100%', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border)', fontWeight: '700', background: 'var(--background)', height: '100px', resize: 'none' }} />
            </div>
            <div style={{ gridColumn: isMobile ? 'auto' : 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ width: isMobile ? '100%' : 'auto', height: '54px' }}>Update Profile Information <ArrowRight size={18} /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
