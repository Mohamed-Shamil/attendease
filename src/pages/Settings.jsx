import React from 'react';
import { 
  Settings as SettingsIcon, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Camera,
  BellRing,
  Lock,
  Database
} from 'lucide-react';

const Settings = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '700' }}>School Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure your school profile and system preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div className="card" style={{ height: 'fit-content' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', fontWeight: '600' }}>General Info</button>
            <button style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-muted)' }}>Notifications</button>
            <button style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-muted)' }}>Security</button>
            <button style={{ textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '8px', color: 'var(--text-muted)' }}>Subscription</button>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '20px', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SettingsIcon size={48} />
              </div>
              <button style={{ position: 'absolute', bottom: -10, right: -10, backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '50%', padding: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
                <Camera size={16} />
              </button>
            </div>
            <div>
              <h3 style={{ fontWeight: '700' }}>Elite International School</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>School ID: ELITE-S001-2024</p>
            </div>
          </div>

          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>School Name</label>
              <input type="text" defaultValue="Elite International School" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Email Address</label>
              <input type="email" defaultValue="admin@eliteschool.edu" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Phone Number</label>
              <input type="text" defaultValue="+1 (555) 000-1234" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Address</label>
              <textarea defaultValue="123 Education Lane, Learning City, state 54321" style={{ width: '100%', padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', height: '100px', resize: 'none' }} />
            </div>

            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button className="btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
