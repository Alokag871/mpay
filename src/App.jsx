
import { useState } from "react";
import {
  Wallet,
  Send,
  QrCode,
  History,
  Home,
  UserRound,
  Bell,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  ShieldCheck,
} from "lucide-react";
import "./App.css";

const sampleTransactions = [
  {
    id: 1,
    name: "Rahul Sharma",
    detail: "Today · 10:42 AM",
    amount: 450,
    type: "sent",
  },
  {
    id: 2,
    name: "Priya Verma",
    detail: "Today · 9:15 AM",
    amount: 1200,
    type: "received",
  },
  {
    id: 3,
    name: "Coffee Corner",
    detail: "Yesterday · 6:30 PM",
    amount: 180,
    type: "sent",
  },
];

function App() {
  const [balance] = useState(8450);
  const [activeTab, setActiveTab] = useState("Home");

  const shortcuts = [
    { label: "Send Money", icon: Send },
    { label: "Scan QR", icon: QrCode },
    { label: "History", icon: History },
    { label: "Add Money", icon: Plus },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home" onClick={() => setActiveTab("Home")}>
          <span className="brand-icon"><Wallet size={23} /></span>
          <span>MPay<span className="brand-dot">.</span></span>
        </a>

        <div className="topbar-right">
          <span className="demo-label">
            <ShieldCheck size={15} /> Demo Mode
          </span>
          <button className="icon-button" aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button className="avatar" aria-label="Profile">A</button>
        </div>
      </header>

      <main id="home" className="dashboard">
        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR MONEY, SIMPLIFIED</p>
            <h1>Good day, there! <span>👋</span></h1>
            <p className="muted">Here's what's happening with your wallet.</p>
          </div>
          <div className="date-chip">Personal Wallet</div>
        </section>

        <section className="overview-grid">
          <div className="balance-card">
            <div className="balance-heading">
              <span>Available balance</span>
              <Wallet size={20} />
            </div>
            <h2>₹{balance.toLocaleString("en-IN")}</h2>
            <p className="balance-note">Your simulated MPay balance</p>
            <div className="balance-bottom">
              <span>•••• &nbsp;•••• &nbsp;•••• &nbsp;2048</span>
              <span className="balance-status">● Active</span>
            </div>
          </div>

          <div className="quick-card">
            <h3>Quick actions</h3>
            <div className="shortcut-grid">
              {shortcuts.map(({ label, icon: Icon }) => (
                <button
                  className="shortcut"
                  key={label}
                  onClick={() => setActiveTab(label)}
                >
                  <span className="shortcut-icon"><Icon size={21} /></span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel transactions-panel">
            <div className="panel-heading">
              <div>
                <h3>Recent transactions</h3>
                <p className="muted">Your latest wallet activity</p>
              </div>
              <button className="text-button" onClick={() => setActiveTab("History")}>
                View all <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="transaction-list">
              {sampleTransactions.map((transaction) => (
                <div className="transaction-row" key={transaction.id}>
                  <div className={`transaction-icon ${transaction.type}`}>
                    {transaction.type === "sent"
                      ? <ArrowUpRight size={19} />
                      : <ArrowDownLeft size={19} />}
                  </div>
                  <div className="transaction-info">
                    <strong>{transaction.name}</strong>
                    <span>{transaction.detail}</span>
                  </div>
                  <strong className={`transaction-amount ${transaction.type}`}>
                    {transaction.type === "sent" ? "−" : "+"}
                    ₹{transaction.amount.toLocaleString("en-IN")}
                  </strong>
                </div>
              ))}
            </div>
            <p className="demo-disclaimer">
              Demo data only — these are not real payments.
            </p>
          </div>

          <aside className="panel security-panel">
            <div className="security-icon"><ShieldCheck size={25} /></div>
            <h3>Your wallet, your control</h3>
            <p className="muted">
              MPay is a payment simulation project. No real money is moved.
            </p>
            <div className="security-divider" />
            <div className="security-row">
              <span>Wallet status</span>
              <strong className="status-text">Demo active</strong>
            </div>
            <div className="security-row">
              <span>Payment protection</span>
              <strong>Simulation only</strong>
            </div>
          </aside>
        </section>

        <nav className="bottom-nav" aria-label="Main navigation">
          {[
            { label: "Home", icon: Home },
            { label: "Send Money", icon: Send },
            { label: "Scan QR", icon: QrCode },
            { label: "History", icon: History },
            { label: "Profile", icon: UserRound },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activeTab === label ? "active" : ""}`}
              onClick={() => setActiveTab(label)}
            >
              <Icon size={19} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </main>
    </div>
  );
}

export default App;
