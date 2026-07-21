import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './views/Dashboard';
import { EmployeeTwin } from './views/EmployeeTwin';
import { OrgSimulator } from './views/OrgSimulator';
import { AtRiskRadar } from './views/AtRiskRadar';
import { CareerCoach } from './views/CareerCoach';
import { WorkforcePlanning } from './views/WorkforcePlanning';
import { TeamBuilder } from './views/TeamBuilder';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employee-twin" element={<EmployeeTwin />} />
          <Route path="career-coach" element={<CareerCoach />} />
          <Route path="radar" element={<AtRiskRadar />} />
          <Route path="simulator" element={<OrgSimulator />} />
          <Route path="workforce" element={<WorkforcePlanning />} />
          <Route path="team-builder" element={<TeamBuilder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
