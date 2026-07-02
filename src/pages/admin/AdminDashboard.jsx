import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import { Users, FileText, Calendar, CreditCard, Activity, LogOut, Search, Check, X, Shield } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [tests, setTests] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');
  const adminUser = localStorage.getItem('adminUser');

  useEffect(() => {
    if (!token) {
      navigate('/admin-login');
      return;
    }
    fetchAllData();
  }, [token, navigate]);

  const fetchAllData = async () => {
    setLoading(true);
    setError('');
    try {
      const headers = { 'Authorization': `Bearer ${token}` };

      const [usersRes, patientsRes, apptsRes, paymentsRes, testsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/admin/users`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/patients`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/appointments`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/payments`, { headers }),
        fetch(`${API_BASE_URL}/api/admin/tests`, { headers })
      ]);

      if (usersRes.status === 401 || usersRes.status === 403) {
        handleLogout();
        return;
      }

      setUsers(await usersRes.json());
      setPatients(await patientsRes.json());
      setAppointments(await apptsRes.json());
      setPayments(await paymentsRes.json());
      setTests(await testsRes.json());
    } catch (err) {
      setError('Failed to fetch dashboard data. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
  };

  const handleUpdateApptStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAllData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderStats = () => (
    <div className="grid grid-5 mb-8" style={{ gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
      <div className="card text-center" style={{ padding: '20px' }}>
        <Users size={24} className="text-secondary mx-auto mb-2" />
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{users.length}</h3>
        <span className="small-text text-muted">Total Users</span>
      </div>
      <div className="card text-center" style={{ padding: '20px' }}>
        <FileText size={24} className="text-accent mx-auto mb-2" />
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{patients.length}</h3>
        <span className="small-text text-muted">Total Patients</span>
      </div>
      <div className="card text-center" style={{ padding: '20px' }}>
        <Calendar size={24} className="text-gold mx-auto mb-2" />
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{appointments.length}</h3>
        <span className="small-text text-muted">Appointments</span>
      </div>
      <div className="card text-center" style={{ padding: '20px' }}>
        <CreditCard size={24} style={{ color: '#10b981' }} className="mx-auto mb-2" />
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{payments.length}</h3>
        <span className="small-text text-muted">Payments</span>
      </div>
      <div className="card text-center" style={{ padding: '20px' }}>
        <Activity size={24} style={{ color: '#8b5cf6' }} className="mx-auto mb-2" />
        <h3 style={{ fontSize: '1.8rem', color: 'var(--primary)' }}>{tests.length}</h3>
        <span className="small-text text-muted">Active Tests</span>
      </div>
    </div>
  );

  const renderUsersTable = () => {
    const filtered = users.filter(u => u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div className="table-responsive card" style={{ padding: '20px' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Provider</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u._id}>
                <td>
                  <div className="flex-row-center gap-3">
                    {u.photoURL ? <img src={u.photoURL} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} /> : <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-tertiary)' }}/>}
                    <strong>{u.name}</strong>
                  </div>
                </td>
                <td>{u.email}</td>
                <td><span className="badge badge-accent">{u.provider}</span></td>
                <td>{new Date(u.lastLoginAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="4" className="text-center py-4">No users found.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPatientsTable = () => {
    const filtered = patients.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone?.includes(searchTerm));
    return (
      <div className="table-responsive card" style={{ padding: '20px' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Patient Details</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Status</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id}>
                <td>
                  <strong>{p.name}</strong>
                  <div className="xsmall-text text-muted">Age: {p.age} | {p.gender}</div>
                </td>
                <td>
                  <div>{p.phone}</div>
                  <div className="xsmall-text text-muted">{p.email}</div>
                </td>
                <td>{p.address}</td>
                <td><span className="badge badge-gold">{p.status}</span></td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="5" className="text-center py-4">No patients found.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAppointmentsTable = () => {
    const filtered = appointments.filter(a => a.name?.toLowerCase().includes(searchTerm.toLowerCase()) || a.phone?.includes(searchTerm));
    return (
      <div className="table-responsive card" style={{ padding: '20px' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Type / Location</th>
              <th>Date / Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a._id}>
                <td>
                  <strong>{a.name}</strong>
                  <div className="xsmall-text text-muted">{a.phone}</div>
                </td>
                <td>
                  <div>{a.appointmentType}</div>
                  <div className="xsmall-text text-muted">{a.location}</div>
                </td>
                <td>
                  <div>{a.date || a.preferredDate}</div>
                  <div className="xsmall-text text-muted">{a.timeSlot || a.preferredTimeSlot}</div>
                </td>
                <td>
                  <span className={`badge badge-status-${(a.status || 'pending').toLowerCase()}`}>{a.status}</span>
                </td>
                <td>
                  <div className="flex-row gap-2">
                    {a.status === 'Pending' && <button onClick={() => handleUpdateApptStatus(a._id, 'Confirmed')} className="btn btn-sm btn-primary" style={{ padding: '4px 8px', fontSize: '12px' }}>Confirm</button>}
                    {a.status === 'Confirmed' && <button onClick={() => handleUpdateApptStatus(a._id, 'Completed')} className="btn btn-sm btn-secondary" style={{ padding: '4px 8px', fontSize: '12px', background: '#10b981', color: '#fff', borderColor: '#10b981' }}>Complete</button>}
                    {a.status !== 'Cancelled' && a.status !== 'Completed' && <button onClick={() => handleUpdateApptStatus(a._id, 'Cancelled')} className="btn btn-sm btn-secondary" style={{ padding: '4px 8px', fontSize: '12px', background: '#ef4444', color: '#fff', borderColor: '#ef4444' }}>Cancel</button>}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="5" className="text-center py-4">No appointments found.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  const renderPaymentsTable = () => {
    const filtered = payments.filter(p => p.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div className="table-responsive card" style={{ padding: '20px' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Slip Name</th>
              <th>Appt Type</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id}>
                <td>
                  <strong>{p.name}</strong>
                  <div className="xsmall-text text-muted">{p.phone}</div>
                </td>
                <td>
                  {p.paymentSlipName ? (
                    <span className="badge badge-secondary">{p.paymentSlipName}</span>
                  ) : <span className="text-muted">None</span>}
                </td>
                <td>{p.appointmentType}</td>
                <td>
                  <span className={`badge ${p.paymentStatus === 'Verified' ? 'badge-accent' : 'badge-gold'}`}>{p.paymentStatus || 'Pending'}</span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="4" className="text-center py-4">No payments found.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTestsTable = () => {
    const filtered = tests.filter(t => t.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) || t.testType?.toLowerCase().includes(searchTerm.toLowerCase()));
    return (
      <div className="table-responsive card" style={{ padding: '20px' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Test Type</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t._id}>
                <td>
                  <strong>{t.patientName}</strong>
                  <div className="xsmall-text text-muted">{t.userEmail}</div>
                </td>
                <td>{t.testType}</td>
                <td>{new Date(t.assignedAt).toLocaleDateString()}</td>
                <td><span className="badge badge-accent">{t.status}</span></td>
                <td><span className="small-text">{t.notes || '-'}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="5" className="text-center py-4">No test allocations found.</td></tr>}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading && !users.length) {
    return <div className="text-center py-12">Loading Dashboard...</div>;
  }

  return (
    <div className="animate-fade-in bg-secondary" style={{ minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Top Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid var(--border-color)', padding: '20px 0' }}>
        <div className="container flex-row-between align-center">
          <div>
            <div className="flex-row-center gap-2 mb-1">
              <Shield size={20} className="text-accent" />
              <h1 style={{ fontSize: '1.4rem', margin: 0 }}>Admin Dashboard</h1>
            </div>
            <p className="small-text text-muted m-0">Monitor users, patients, appointments, payments, and allocated tests.</p>
          </div>
          <div className="flex-row-center gap-4">
            <span className="small-text font-bold">Hello, {adminUser}</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm flex-row-center gap-2" style={{ background: '#fef2f2', color: '#dc2626', borderColor: '#fee2e2' }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mt-6">
        {error && (
          <div className="alert alert-danger mb-6" style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px' }}>
            {error}
          </div>
        )}

        {renderStats()}

        {/* Tabs & Search */}
        <div className="flex-row-between flex-wrap gap-4 mb-6 align-center">
          <div className="flex-row gap-2" style={{ overflowX: 'auto', paddingBottom: '4px' }}>
            {['users', 'patients', 'appointments', 'payments', 'tests'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-secondary'}`}
                style={{ textTransform: 'capitalize', padding: '8px 16px', borderRadius: '20px' }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-row-center gap-2 border px-3 py-2 rounded-md bg-white" style={{ minWidth: '250px', borderRadius: '20px' }}>
            <Search size={16} className="text-muted" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.9rem' }}
            />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'users' && renderUsersTable()}
        {activeTab === 'patients' && renderPatientsTable()}
        {activeTab === 'appointments' && renderAppointmentsTable()}
        {activeTab === 'payments' && renderPaymentsTable()}
        {activeTab === 'tests' && renderTestsTable()}
      </main>
    </div>
  );
}
