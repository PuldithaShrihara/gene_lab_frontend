import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const adminTabs = [
  { id: "overview",       label: "Overview",        icon: "📊" },
  { id: "users",          label: "Users",            icon: "👥" },
  { id: "patients",       label: "Patients",         icon: "🧬" },
  { id: "appointments",   label: "Appointments",     icon: "📅" },
  { id: "testRequests",   label: "Test Requests",    icon: "🧪" },
  { id: "payments",       label: "Payments",         icon: "💳" },
  { id: "contacts",       label: "Contacts",         icon: "✉️"  },
  { id: "reviews",        label: "Reviews",          icon: "⭐" },
  { id: "testAllocations",label: "Test Allocations", icon: "📋" },
];

const getStatusClass = (status = "") => {
  const v = status.toLowerCase();
  if (v.includes("new")) return "status-new";
  if (v.includes("pending")) return "status-pending";
  if (v.includes("confirmed") || v.includes("completed") || v.includes("verified") || v.includes("approved")) return "status-completed";
  if (v.includes("cancelled") || v.includes("rejected") || v.includes("closed")) return "status-cancelled";
  if (v.includes("processing") || v.includes("reviewing") || v.includes("contacted") || v.includes("ready") || v.includes("allocated")) return "status-processing";
  return "status-default";
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [users, setUsers] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [testRequests, setTestRequests] = useState([]);
  const [payments, setPayments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [testAllocations, setTestAllocations] = useState([]);
  const [error, setError] = useState(null);
  const [showAllocateModal, setShowAllocateModal] = useState(false);

  // Allocate form state
  const [allocateForm, setAllocateForm] = useState({
    email: "", name: "", testType: "", notes: "", status: "Allocated"
  });

  const adminToken = localStorage.getItem("adminToken");
  const adminUser = localStorage.getItem("adminUser") || "superadmin";

  useEffect(() => {
    if (!adminToken) navigate("/admin-login");
  }, [navigate, adminToken]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };

  const fetchAdminData = async () => {
    try {
      const headers = { Authorization: `Bearer ${adminToken}` };
      const [usersRes, patientsRes, appointmentsRes, testRequestsRes,
             paymentsRes, contactsRes, reviewsRes, testAllocationsRes] =
        await Promise.all([
          fetch(`${API_BASE_URL}/api/admin/users`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/patients`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/appointments`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/test-requests`, { headers }).catch(()=>({ok:true, json:()=>[]})),
          fetch(`${API_BASE_URL}/api/admin/payments`, { headers }),
          fetch(`${API_BASE_URL}/api/admin/contacts`, { headers }).catch(()=>({ok:true, json:()=>[]})),
          fetch(`${API_BASE_URL}/api/admin/reviews`, { headers }).catch(()=>({ok:true, json:()=>[]})),
          fetch(`${API_BASE_URL}/api/admin/tests`, { headers }),
        ]);

      if (usersRes.status === 401) { handleLogout(); return; }

      setUsers(await usersRes.json());
      setPatients(await patientsRes.json());
      setAppointments(await appointmentsRes.json());
      setTestRequests(testRequestsRes.ok ? await testRequestsRes.json() : []);
      setPayments(await paymentsRes.json());
      setContacts(contactsRes.ok ? await contactsRes.json() : []);
      setReviews(reviewsRes.ok ? await reviewsRes.json() : []);
      setTestAllocations(await testAllocationsRes.json());
      setError(null);
    } catch (err) {
      setError("Failed to load data. Please check your connection.");
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchAdminData();
    }
  }, [adminToken]);

  const updateStatus = async (type, id, status) => {
    const endpointMap = {
      appointments:   `/api/admin/appointments/${id}/status`,
      testRequests:   `/api/admin/test-requests/${id}/status`,
      payments:       `/api/admin/payments/${id}/status`,
      contacts:       `/api/admin/contacts/${id}/status`,
      reviews:        `/api/admin/reviews/${id}/status`,
    };
    try {
      const res = await fetch(`${API_BASE_URL}${endpointMap[type]}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      fetchAdminData();
    } catch {
      alert("Failed to update status. Please try again.");
    }
  };

  const submitAllocation = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/tests`, {
        method: "POST",
        headers: { "Content-Type":"application/json", Authorization:`Bearer ${adminToken}` },
        body: JSON.stringify(allocateForm),
      });
      if (res.ok) { 
        setShowAllocateModal(false); 
        fetchAdminData(); 
        setAllocateForm({ email: "", name: "", testType: "", notes: "", status: "Allocated" });
      } else {
        alert("Failed to allocate test");
      }
    } catch (e) {
      alert("Error allocating test");
    }
  };

  const filterData = (data) => {
    if (!Array.isArray(data)) return [];
    return data.filter(item => {
      const matchSearch = searchTerm === "" || 
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.patientName && item.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchStatus = statusFilter === "All" || (item.status && item.status.toLowerCase() === statusFilter.toLowerCase()) || (item.paymentStatus && item.paymentStatus.toLowerCase() === statusFilter.toLowerCase());
      return matchSearch && matchStatus;
    });
  };

  // TABS COMPONENTS
  const OverviewTab = () => (
    <div className="admin-stats-grid">
      <div className="admin-stat-card">
        <div className="admin-stat-icon">👥</div>
        <h3>{users.length}</h3>
        <p>Total Users</p>
        <small>New registrations</small>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">🧬</div>
        <h3>{patients.length}</h3>
        <p>Patient Registrations</p>
        <small>Submitted records</small>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">📅</div>
        <h3>{appointments.length}</h3>
        <p>Appointments</p>
        <small>All time</small>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">🧪</div>
        <h3>{testRequests.length}</h3>
        <p>Test Requests</p>
        <small>Requires review</small>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">💳</div>
        <h3>{payments.filter(p => (p.paymentStatus||'').toLowerCase().includes('pending')).length}</h3>
        <p>Pending Payments</p>
        <small>Awaiting verification</small>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">✉️</div>
        <h3>{contacts.filter(c => (c.status||'').toLowerCase().includes('new')).length}</h3>
        <p>Contact Inquiries</p>
        <small>Unread messages</small>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">⭐</div>
        <h3>{reviews.filter(r => (r.status||'').toLowerCase().includes('pending')).length}</h3>
        <p>Pending Reviews</p>
        <small>Awaiting approval</small>
      </div>
      <div className="admin-stat-card">
        <div className="admin-stat-icon">📋</div>
        <h3>{testAllocations.length}</h3>
        <p>Active Test Allocations</p>
        <small>In progress</small>
      </div>
    </div>
  );

  const EmptyState = ({ message = "No records found matching your filters." }) => (
    <div className="admin-empty-state">
      <h3>No Results</h3>
      <p>{message}</p>
    </div>
  );

  const UsersTab = () => {
    const data = filterData(users);
    if (!data.length) return <EmptyState />;
    return (
      <div className="admin-panel">
        <div className="admin-panel-header"><h2>Users</h2></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Provider</th><th>First Login</th><th>Last Login</th></tr></thead>
            <tbody>
              {data.map(u => (
                <tr key={u._id}>
                  <td>
                    <div className="admin-user-cell">
                      <div className="admin-user-avatar" style={{background:"var(--primary)"}}>{(u.name||'U')[0].toUpperCase()}</div>
                      {u.name}
                    </div>
                  </td>
                  <td>{u.email}</td>
                  <td><span className="admin-badge">{u.provider}</span></td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const PatientsTab = () => {
    const data = filterData(patients);
    if (!data.length) return <EmptyState />;
    return (
      <div className="admin-panel">
        <div className="admin-panel-header"><h2>Patients</h2></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Patient Name</th><th>Phone</th><th>Email</th><th>Age</th><th>Gender</th><th>City</th><th>Status</th><th>Submitted Date</th></tr></thead>
            <tbody>
              {data.map(p => (
                <tr key={p._id}>
                  <td><strong>{p.name}</strong></td>
                  <td>{p.phone}</td>
                  <td>{p.email}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>{p.city || p.address || '-'}</td>
                  <td><span className={`status-badge ${getStatusClass(p.status)}`}>{p.status || 'Registered'}</span></td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const AppointmentsTab = () => {
    const data = filterData(appointments);
    if (!data.length) return <EmptyState />;
    return (
      <div className="admin-panel">
        <div className="admin-panel-header"><h2>Appointments</h2></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Patient Name</th><th>Phone</th><th>Type</th><th>Clinic Location</th><th>Payment Status</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {data.map(a => (
                <tr key={a._id}>
                  <td><strong>{a.name || a.patientName}</strong></td>
                  <td>{a.phone}</td>
                  <td>{a.appointmentType}</td>
                  <td>{a.location || a.clinicLocation}</td>
                  <td><span className={`status-badge ${getStatusClass(a.paymentStatus)}`}>{a.paymentStatus || 'Pending'}</span></td>
                  <td>
                    <select
                      value={a.status || "Pending"}
                      onChange={e => updateStatus("appointments", a._id, e.target.value)}
                      className="admin-filter-select"
                      style={{minHeight:"32px",fontSize:"12px"}}
                    >
                      {["New", "Pending", "Contacted", "Confirmed", "Completed", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{a.date || a.preferredDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const TestRequestsTab = () => {
    const data = filterData(testRequests);
    if (!data.length) return <EmptyState />;
    return (
      <div className="admin-panel">
        <div className="admin-panel-header"><h2>Test Requests</h2></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Patient Name</th><th>Phone</th><th>Test Category</th><th>Preferred Contact</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {data.map(r => (
                <tr key={r._id}>
                  <td><strong>{r.name || r.patientName}</strong></td>
                  <td>{r.phone}</td>
                  <td>{r.testCategory}</td>
                  <td>{r.preferredContactMethod}</td>
                  <td>
                    <select
                      value={r.status || "New"}
                      onChange={e => updateStatus("testRequests", r._id, e.target.value)}
                      className="admin-filter-select"
                      style={{minHeight:"32px",fontSize:"12px"}}
                    >
                      {["New", "Reviewing", "Contacted", "Test Coordinated", "Completed", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const PaymentsTab = () => {
    const data = filterData(payments);
    if (!data.length) return <EmptyState />;
    return (
      <div className="admin-panel">
        <div className="admin-panel-header"><h2>Payments</h2></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Patient Name</th><th>Related Service</th><th>Payment Slip</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {data.map(p => (
                <tr key={p._id}>
                  <td><strong>{p.name || p.patientName}</strong></td>
                  <td>{p.appointmentType || p.service || '-'}</td>
                  <td>{p.paymentSlipName ? <a href="#">{p.paymentSlipName}</a> : 'None'}</td>
                  <td>
                    <select
                      value={p.paymentStatus || "Pending"}
                      onChange={e => updateStatus("payments", p._id, e.target.value)}
                      className="admin-filter-select"
                      style={{minHeight:"32px",fontSize:"12px"}}
                    >
                      {["Pending", "Payment Slip Uploaded", "Verified", "Rejected"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ContactsTab = () => {
    const data = filterData(contacts);
    if (!data.length) return <EmptyState />;
    return (
      <div className="admin-panel">
        <div className="admin-panel-header"><h2>Contacts</h2></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Phone</th><th>Email</th><th>Inquiry Type</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {data.map(c => (
                <tr key={c._id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.phone}</td>
                  <td>{c.email}</td>
                  <td>{c.subject || c.inquiryType}</td>
                  <td>
                    <select
                      value={c.status || "New"}
                      onChange={e => updateStatus("contacts", c._id, e.target.value)}
                      className="admin-filter-select"
                      style={{minHeight:"32px",fontSize:"12px"}}
                    >
                      {["New", "Pending", "Contacted", "Closed"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const ReviewsTab = () => {
    const data = filterData(reviews);
    if (!data.length) return <EmptyState />;
    return (
      <div className="admin-panel">
        <div className="admin-panel-header"><h2>Reviews</h2></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Rating</th><th>Service Type</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {data.map(r => (
                <tr key={r._id}>
                  <td><strong>{r.name}</strong></td>
                  <td>{r.rating} ⭐</td>
                  <td>{r.serviceType}</td>
                  <td>
                    <select
                      value={r.status || "Pending"}
                      onChange={e => updateStatus("reviews", r._id, e.target.value)}
                      className="admin-filter-select"
                      style={{minHeight:"32px",fontSize:"12px"}}
                    >
                      {["Pending", "Approved", "Hidden"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const TestAllocationsTab = () => {
    const data = filterData(testAllocations);
    return (
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>Test Allocations</h2>
          <div className="admin-panel-actions">
            <button className="admin-logout-btn" style={{background:"var(--primary)"}} onClick={() => setShowAllocateModal(true)}>+ Allocate Test</button>
          </div>
        </div>
        {!data.length ? <EmptyState /> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Patient/User</th><th>Email</th><th>Test Type</th><th>Status</th><th>Assigned Date</th></tr></thead>
              <tbody>
                {data.map(t => (
                  <tr key={t._id}>
                    <td><strong>{t.patientName}</strong></td>
                    <td>{t.userEmail || t.email}</td>
                    <td>{t.testType}</td>
                    <td><span className={`status-badge ${getStatusClass(t.status)}`}>{t.status}</span></td>
                    <td>{new Date(t.assignedAt || t.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">🧬</div>
          <div className="admin-sidebar-title">
            <h2>Gene Clinic</h2>
            <p>Admin Panel</p>
          </div>
        </div>
        <nav className="admin-sidebar-nav">
          {adminTabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-nav-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
          <button className="admin-nav-btn" style={{color:"#f87171",marginTop:"auto"}} onClick={handleLogout}>
            ⏻ Logout
          </button>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="admin-main">
        {/* TOPBAR */}
        <div className="admin-topbar">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage users, appointments, genetic test requests, payments, and patient records.</p>
          </div>
          <div className="admin-topbar-actions">
            <input className="admin-search" placeholder="Search…"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="admin-filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending / New</option>
              <option value="Completed">Completed / Verified</option>
              <option value="Cancelled">Cancelled / Rejected</option>
            </select>
            <span className="admin-badge">{adminUser}</span>
            <button className="admin-logout-btn" onClick={handleLogout}>⏻ Logout</button>
          </div>
        </div>

        {/* ERROR */}
        {error && <div style={{background:"#fef2f2",color:"#dc2626",padding:"14px 20px",borderRadius:"12px",marginBottom:"18px"}}>{error}</div>}

        {/* TAB CONTENT */}
        {activeTab === "overview"        && <OverviewTab />}
        {activeTab === "users"           && <UsersTab />}
        {activeTab === "patients"        && <PatientsTab />}
        {activeTab === "appointments"    && <AppointmentsTab />}
        {activeTab === "testRequests"    && <TestRequestsTab />}
        {activeTab === "payments"        && <PaymentsTab />}
        {activeTab === "contacts"        && <ContactsTab />}
        {activeTab === "reviews"         && <ReviewsTab />}
        {activeTab === "testAllocations" && <TestAllocationsTab />}
      </main>

      {/* ALLOCATE MODAL */}
      {showAllocateModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <button className="admin-modal-close" onClick={() => setShowAllocateModal(false)}>×</button>
            <h3>Allocate New Test</h3>
            <form onSubmit={submitAllocation} className="admin-form-grid">
              <div>
                <label className="admin-form-label">Patient Name</label>
                <input required className="admin-form-input" value={allocateForm.name} onChange={e=>setAllocateForm({...allocateForm, name: e.target.value})} />
              </div>
              <div>
                <label className="admin-form-label">Patient Email</label>
                <input required type="email" className="admin-form-input" value={allocateForm.email} onChange={e=>setAllocateForm({...allocateForm, email: e.target.value})} />
              </div>
              <div className="admin-form-full">
                <label className="admin-form-label">Test Type</label>
                <select className="admin-form-input" value={allocateForm.testType} onChange={e=>setAllocateForm({...allocateForm, testType: e.target.value})}>
                  <option value="">Select Test Type...</option>
                  {["Genetic Counselling", "Wellness Genomics", "NIPT", "Clinical Genetic Panel", "Whole Exome Sequencing", "Whole Genome Sequencing", "Cancer Genetics", "Genetic Report Interpretation", "Other"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="admin-form-full">
                <label className="admin-form-label">Status</label>
                <select className="admin-form-input" value={allocateForm.status} onChange={e=>setAllocateForm({...allocateForm, status: e.target.value})}>
                  {["Allocated", "Sample Pending", "Sample Collected", "Processing", "Report Ready", "Completed", "Cancelled"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="admin-form-full">
                <label className="admin-form-label">Notes (Optional)</label>
                <textarea className="admin-form-input" style={{resize:"vertical", minHeight:"80px"}} value={allocateForm.notes} onChange={e=>setAllocateForm({...allocateForm, notes: e.target.value})}></textarea>
              </div>
              <div className="admin-form-full">
                <button type="submit" className="admin-form-submit">Allocate Test</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
