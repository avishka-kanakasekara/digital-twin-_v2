import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './views/organization/Dashboard';
import { EmployeeTwin } from './views/employee/EmployeeTwin';
import { OrgSimulator } from './views/organization/OrgSimulator';
import { AtRiskRadar } from './views/organization/AtRiskRadar';
import { CareerCoach } from './views/employee/CareerCoach';
import { WorkforcePlanning } from './views/organization/WorkforcePlanning';
import { TeamBuilder } from './views/organization/TeamBuilder';

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
