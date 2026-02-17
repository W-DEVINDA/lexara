import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import PrimaFacie from './pages/PrimaFacie/PrimaFacie';
import PreHearing from './pages/prehearing/PreHearing';
import PreHearingSim from './pages/prehearingsim/PreHearingSim';
import CaseAnalysis from './pages/caseanalysis/CaseAnalysis';
import PreInvestigator from './pages/preinvestigator/PreInvestigator';
import InvestigatorReport from './pages/investigatorreport/InvestigatorReport';
import History from './pages/history/History';
import CaseSummary from './pages/casesummary/CaseSummary';
import PreHearingCont from './pages/prehearingcont/PreHearingCont';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/legal-desk" element={<PrimaFacie />} />
        <Route path="/case-analysis" element={<CaseAnalysis />} />
        <Route path="/pre-hearingsim" element={<PreHearingSim />} />
        <Route path="/pre-hearing" element={<PreHearing />} />
        <Route path="/pre-investigator" element={<PreInvestigator />} />
        <Route path="/investigator-report" element={<InvestigatorReport />} />
        <Route path="/previous-cases" element={<History/>}/>
        <Route path="/case-summary" element={<CaseSummary/>}/>
        <Route path="/pre-hearingcont" element={<PreHearingCont/>}/>

      </Routes>
    </Router>
  );
}

export default App;