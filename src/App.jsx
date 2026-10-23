
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
  CheckCircle2,
  GraduationCap,
} from "lucide-react";
import "./App.css";

const initialTransactions = [
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
  const [balance, setBalance] = useState(100000);
  const [recipient, setRecipient] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");
  const [transactions, setTransactions] = useState(initialTransactions);
  const [activeTab, setActiveTab] = useState("Home");

  const shortcuts = [
    { label: "Send Money", icon: Send },
    { label: "Scan QR", icon: QrCode },
    { label: "History", icon: History },
    { label: "Add Money", icon: Plus },
  ];

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const handlePayment = (event) => {
    event.preventDefault();

    const cleanRecipient = recipient.trim();
    const cleanPaymentId = paymentId.trim();
    const paymentAmount = Number(amount);

    if (!cleanRecipient || !cleanPaymentId) {
      showMessage("Please enter the recipient name and demo payment ID.", "error");
      return;
    }

    if (
      !Number.isFinite(paymentAmount) ||
      !Number.isSafeInteger(paymentAmount) ||
      paymentAmount <= 0
    ) {
      showMessage("Enter a valid whole-number amount greater than ₹0.", "error");
      return;
    }

    if (paymentAmount > balance) {
      showMessage("Insufficient virtual wallet balance.", "error");
      return;
    }

    // This updates only the local demo wallet. No real payment is made.
    setBalance((currentBalance) => currentBalance - paymentAmount);

    const newTransaction = {
      id: `${Date.now()}-${Math.random()}`,
      name: cleanRecipient,
      detail: "Just now · Demo payment",
      amount: paymentAmount,
      type: "sent",
      paymentId: cleanPaymentId,
    };

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions,
    ]);

    showMessage(
      `Practice payment of ₹${paymentAmount.toLocaleString(
        "en-IN"
      )} to ${cleanRecipient} completed successfully!`,
      "success"
    );

    setRecipient("");
    setPaymentId("");
    setAmount("");
  };

  const handleShortcut = (label) => {
    setActiveTab(label);

    if (label === "Send Money") {
      document.getElementById("payment-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (label === "History") {
      document.getElementById("transaction-history")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (label === "Scan QR") {
      showMessage(
        "QR practice is coming next. No real QR payments are supported yet.",
        "info"
      );
    } else if (label === "Add Money") {
      showMessage(
        "Your practice wallet starts with ₹1,00,000. Adding virtual money will be a future feature.",
        "info"
      );
    }
  };

  const navigation = [
    { label: "Home", icon: Home },
    { label: "Send Money", icon: Send },
    { label: "Scan QR", icon: QrCode },
    { label: "History", icon: History },
    { label: "Profile", icon: UserRound },
  ];

  return (
    <div className="app-shell">
      <header className="topbar">
        <a
          className="brand"
          href="#home"
          onClick={() => setActiveTab("Home")}
        >
          <span className="brand-icon">
            <Wallet size={23} />
          </span>
          <span>
            MPay<span className="brand-dot">.</span>
          </span>
        </a>

        <div className="topbar-right">
          <span className="demo-label">
            <ShieldCheck size={15} />
            Demo Mode
          </span>

          <button
            className="icon-button"
            type="button"
            aria-label="Notifications"
            onClick={() =>
              showMessage("You have no new demo notifications.", "info")
            }
          >
            <Bell size={20} />
          </button>

          <button
            className="avatar"
            type="button"
            aria-label="Profile"
            onClick={() => {
              setActiveTab("Profile");
              showMessage(
                "Profile settings will be available in a future step.",
                "info"
              );
            }}
          >
            A
          </button>
        </div>
      </header>

      <main id="home" className="dashboard">
        <section className="welcome">
          <div>
            <p className="eyebrow">LEARN · PRACTICE · PAY SAFELY</p>
            <h1>
              Welcome to MPay Learning! <span>👋</span>
            </h1>
            <p className="muted">
              Learn digital payments at your own pace, without risking real
              money.
            </p>
          </div>

          <div className="date-chip">
            <GraduationCap size={16} />
            Learning Wallet
          </div>
        </section>

        <section className="overview-grid">
          <div className="balance-card">
            <div className="balance-heading">
              <span>Available practice balance</span>
              <Wallet size={20} />
            </div>

            <h2>₹{balance.toLocaleString("en-IN")}</h2>

            <p className="balance-note">
              Virtual money only · No real payments
            </p>

            <div className="balance-bottom">
              <span>MPAY · PRACTICE ACCOUNT</span>
              <span className="balance-status">● Demo active</span>
            </div>
          </div>

          <div className="quick-card">
            <h3>Quick actions</h3>

            <div className="shortcut-grid">
              {shortcuts.map(({ label, icon: Icon }) => (
                <button
                  className="shortcut"
                  key={label}
                  type="button"
                  onClick={() => handleShortcut(label)}
                >
                  <span className="shortcut-icon">
                    <Icon size={21} />
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {message && (
          <div
            className={`app-message ${messageType}`}
            role="status"
            aria-live="polite"
          >
            {messageType === "success" && <CheckCircle2 size={19} />}
            <span>{message}</span>
            <button
              type="button"
              className="message-close"
              aria-label="Dismiss message"
              onClick={() => setMessage("")}
            >
              ×
            </button>
          </div>
        )}

        <section className="panel payment-panel" id="payment-form">
          <div className="panel-heading">
            <div>
              <h3>Practice sending money</h3>
              <p className="muted">
                Follow the steps to learn how a digital payment works.
              </p>
            </div>

            <span className="practice-tag">Practice only</span>
          </div>

          <form className="payment-form" onSubmit={handlePayment}>
            <label htmlFor="recipient">1. Recipient name</label>
            <input
              id="recipient"
              name="recipient"
              type="text"
              autoComplete="off"
              maxLength={60}
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              placeholder="e.g. Rahul Sharma"
              required
            />

            <label htmlFor="paymentId">2. Demo payment ID</label>
            <input
              id="paymentId"
              name="paymentId"
              type="text"
              autoComplete="off"
              maxLength={100}
              value={paymentId}
              onChange={(event) => setPaymentId(event.target.value)}
              placeholder="e.g. rahul@mpay.demo"
              required
            />

            <label htmlFor="amount">3. Amount to practice (₹)</label>
            <input
              id="amount"
              name="amount"
              type="number"
              min="1"
              max={balance}
              step="1"
              inputMode="numeric"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="Enter an amount, e.g. 500"
              required
            />

            <p className="form-hint">
              Tip: Always check the recipient and amount before confirming a
              payment.
            </p>

            <button type="submit" className="pay-button">
              <Send size={17} />
              Confirm demo payment
            </button>
          </form>

          <p className="demo-disclaimer">
            This is a learning simulation. It does not contact a bank or send
            money to the payment ID you enter.
          </p>
        </section>

        <section className="content-grid">
          <div className="panel transactions-panel" id="transaction-history">
            <div className="panel-heading">
              <div>
                <h3>Recent transactions</h3>
                <p className="muted">
                  Your latest practice wallet activity
                </p>
              </div>

              <button
                className="text-button"
                type="button"
                onClick={() => setActiveTab("History")}
              >
                View all <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="transaction-list">
              {transactions.length === 0 ? (
                <p className="muted">No practice transactions yet.</p>
              ) : (
                transactions.map((transaction) => (
                  <div className="transaction-row" key={transaction.id}>
                    <div
                      className={`transaction-icon ${transaction.type}`}
                    >
                      {transaction.type === "sent" ? (
                        <ArrowUpRight size={19} />
                      ) : (
                        <ArrowDownLeft size={19} />
                      )}
                    </div>

                    <div className="transaction-info">
                      <strong>{transaction.name}</strong>
                      <span>{transaction.detail}</span>
                    </div>

                    <strong
                      className={`transaction-amount ${transaction.type}`}
                    >
                      {transaction.type === "sent" ? "−" : "+"}
                      ₹{transaction.amount.toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))
              )}
            </div>

            <p className="demo-disclaimer">
              Sample entries are illustrative. New entries are local demo
              records only.
            </p>
          </div>

          <aside className="panel security-panel">
            <div className="security-icon">
              <ShieldCheck size={25} />
            </div>

            <h3>Learn to pay safely</h3>

            <p className="muted">
              Practice carefully before using real digital payment services.
            </p>

            <div className="security-divider" />

            <div className="security-row">
              <span>Wallet type</span>
              <strong className="status-text">Virtual only</strong>
            </div>

            <div className="security-row">
              <span>Real bank connection</span>
              <strong>Not connected</strong>
            </div>

            <div className="security-row">
              <span>Real money transfer</span>
              <strong>Disabled</strong>
            </div>
          </aside>
        </section>

        <nav className="bottom-nav" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`nav-item ${
                activeTab === label ? "active" : ""
              }`}
              onClick={() => {
                if (label === "Home") {
                  setActiveTab("Home");
                  document.getElementById("home")?.scrollIntoView({
                    behavior: "smooth",
                  });
                } else if (label === "Send Money") {
                  handleShortcut("Send Money");
                } else if (label === "History") {
                  handleShortcut("History");
                } else if (label === "Scan QR") {
                  handleShortcut("Scan QR");
                } else {
                  setActiveTab("Profile");
                  showMessage(
                    "Profile settings will be available in a future step.",
                    "info"
                  );
                }
              }}
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
