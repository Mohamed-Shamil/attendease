import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, role, schoolId }

  const login = (role) => {
    // Mock user identification
    const mockUsers = {
      admin: { id: '1', name: 'System Admin', role: 'admin', schoolId: 'S001' },
      headmaster: { id: '2', name: 'Dr. Sarah Wilson', role: 'headmaster', schoolId: 'S001' },
      teacher: { id: '3', name: 'John Doe', role: 'teacher', schoolId: 'S001', classId: 'C10' },
      student: { id: '4', name: 'Alex Smith', role: 'student', schoolId: 'S001', classId: 'C10' },
    };
    setUser(mockUsers[role]);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
