import { useNavigate, useLocation } from 'react-router-dom';
import './LeftSidebar.css';

function LeftSidebar({ toggleChatHistory }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="left-sidebar">
      <div 
        className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
        onClick={() => handleNavigation('/')}
      >
        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.75 13.125V8.125C8.75 7.95924 8.68854 7.80027 8.57915 7.68306C8.46975 7.56585 8.32138 7.5 8.16667 7.5H5.83333C5.67862 7.5 5.53025 7.56585 5.42085 7.68306C5.31146 7.80027 5.25 7.95924 5.25 8.125V13.125" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.75 6.24999C1.74996 6.06816 1.78694 5.88851 1.85838 5.72357C1.92981 5.55863 2.03397 5.41237 2.16358 5.29499L6.24692 1.54499C6.45749 1.35431 6.72429 1.24969 7 1.24969C7.27571 1.24969 7.54251 1.35431 7.75308 1.54499L11.8364 5.29499C11.966 5.41237 12.0702 5.55863 12.1416 5.72357C12.2131 5.88851 12.25 6.06816 12.25 6.24999V11.875C12.25 12.2065 12.1271 12.5245 11.9083 12.7589C11.6895 12.9933 11.3928 13.125 11.0833 13.125H2.91667C2.60725 13.125 2.3105 12.9933 2.09171 12.7589C1.87292 12.5245 1.75 12.2065 1.75 11.875V6.24999Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Home</span>
      </div>
      <div 
  className={`nav-item ${location.pathname === '/pre-investigator' ? 'active' : ''}`}
  onClick={() => handleNavigation('/pre-investigator')}
>
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" stroke="#B2BDCB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M14 2v5a1 1 0 0 0 1 1h5" stroke="#B2BDCB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="m16 13-3.5 3.5-2-2L8 17" stroke="#B2BDCB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  <span>Investigator Report</span>
</div>
      <div 
        className={`nav-item ${location.pathname === '/legal-desk' ? 'active' : ''}`}
        onClick={() => handleNavigation('/legal-desk')}
      >
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.87005 9.53286C1.96195 9.74922 1.98241 9.9863 1.9288 10.2136L1.26318 12.1328C1.24173 12.2301 1.24727 12.3309 1.27929 12.4257C1.3113 12.5205 1.36872 12.606 1.44609 12.6743C1.52347 12.7425 1.61824 12.7912 1.72143 12.8157C1.82461 12.8401 1.93278 12.8396 2.03568 12.8141L4.1688 12.2319C4.39862 12.1894 4.63663 12.208 4.85568 12.2856C6.19029 12.8673 7.70216 12.9904 9.12452 12.6331C10.5469 12.2758 11.7883 11.4612 12.6299 10.3328C13.4714 9.20449 13.8589 7.83501 13.724 6.46601C13.5891 5.09701 12.9405 3.81646 11.8926 2.85031C10.8447 1.88415 9.46487 1.29446 7.99654 1.1853C6.52822 1.07613 5.06576 1.4545 3.8672 2.25364C2.66864 3.05278 1.81101 4.22134 1.44561 5.55315C1.08021 6.88495 1.23053 8.29441 1.87005 9.53286Z" stroke="#B2BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Legal Desk</span>
      </div>
      <div 
  className={`nav-item ${location.pathname === '/previous-cases' ? 'active' : ''}`}
  onClick={() => handleNavigation('/previous-cases')}
>
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 4.08331V12.25" stroke="#B2BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.875 10.5C1.70924 10.5 1.55027 10.4385 1.43306 10.3291C1.31585 10.2197 1.25 10.0714 1.25 9.91667V2.33333C1.25 2.17862 1.31585 2.03025 1.43306 1.92085C1.55027 1.81146 1.70924 1.75 1.875 1.75H5C5.66304 1.75 6.29893 1.99583 6.76777 2.43342C7.23661 2.871 7.5 3.46449 7.5 4.08333C7.5 3.46449 7.76339 2.871 8.23223 2.43342C8.70107 1.99583 9.33696 1.75 10 1.75H13.125C13.2908 1.75 13.4497 1.81146 13.5669 1.92085C13.6842 2.03025 13.75 2.17862 13.75 2.33333V9.91667C13.75 10.0714 13.6842 10.2197 13.5669 10.3291C13.4497 10.4385 13.2908 10.5 13.125 10.5H9.375C8.87772 10.5 8.40081 10.6844 8.04918 11.0126C7.69754 11.3408 7.5 11.7859 7.5 12.25C7.5 11.7859 7.30246 11.3408 6.95083 11.0126C6.5992 10.6844 6.12228 10.5 5.625 10.5H1.875Z" stroke="#B2BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  <span>Previous Cases</span>
</div>
      <div className="nav-item" onClick={toggleChatHistory} style={{cursor: 'pointer'}}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8C2 9.18669 2.35189 10.3467 3.01118 11.3334C3.67047 12.3201 4.60754 13.0892 5.7039 13.5433C6.80026 13.9974 8.00666 14.1162 9.17054 13.8847C10.3344 13.6532 11.4035 13.0818 12.2426 12.2426C13.0818 11.4035 13.6532 10.3344 13.8847 9.17054C14.1162 8.00666 13.9974 6.80026 13.5433 5.7039C13.0892 4.60754 12.3201 3.67047 11.3334 3.01118C10.3467 2.35189 9.18669 2 8 2C6.32263 2.00631 4.71265 2.66082 3.50667 3.82667L2 5.33333" stroke="#B2BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 2V5.33333H5.33333" stroke="#B2BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 4.66669V8.00002L10.6667 9.33335" stroke="#B2BDCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Chat History</span>
      </div>
    </nav>
  );
}

export default LeftSidebar;