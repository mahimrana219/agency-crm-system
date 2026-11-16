import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './Components/Layout/AppShell';

// Dashboard & Sub-components Imports
import Dashboard from './Components/Dashboard/Dashboard';
import Leads from './Components/Dashboard/Pipeline/Leads';
import Clients from './Components/Dashboard/Pipeline/Clients';
import Projects from './Components/Dashboard/Pipeline/Projects';
import Retainers from './Components/Dashboard/Revenue/Retainers';
import Payments from './Components/Dashboard/Revenue/Payments';
import PublicPage from './Components/Dashboard/Revenue/PublicPage';
import Messages from './Components/Dashboard/Workspace/Messages';
import Meetings from './Components/Dashboard/Workspace/Meetings';
import Tasks from './Components/Dashboard/Workspace/Tasks';
import Documents from './Components/Dashboard/Workspace/Documents';
import Team from './Components/Dashboard/Organization/Team';
import Billing from './Components/Dashboard/Organization/Billing';
import Attendance from './Components/Dashboard/Attendance/Attendance';
import Freelance_rate_calculator from './Components/Dashboard/Calculators/Freelance_rate_calculator';
import GST_calculator from './Components/Dashboard/Calculators/GST_calculator';
import Profit_margin_calculator from './Components/Dashboard/Calculators/Profit_margin_calculator';
import Retainer_calculator from './Components/Dashboard/Calculators/Retainer_calculator';
import TDS_calculator from './Components/Dashboard/Calculators/TDS_calculator';
import Expense from './Components/Dashboard/Expenses/Expense';
import Clint_Onboarding from './Components/Dashboard/Invoices/Clint_Onboarding';
import Clint_Reminder_invoice from './Components/Dashboard/Invoices/Clint_Reminder_invoice';
import Freelance_Contract from './Components/Dashboard/Invoices/Freelance_Contract';
import Invoicecreate from './Components/Dashboard/Invoices/Invoicecreate';
import Invoices from './Components/Dashboard/Invoices/Invoices';
import NDA_freelancer from './Components/Dashboard/Invoices/NDA_freelancer';
import Project_Proposal from './Components/Dashboard/Invoices/Project_Proposal';
import Quotation from './Components/Dashboard/Invoices/Quotation';
import Retainer_Agreement from './Components/Dashboard/Invoices/Retainer_Agreement';
import Scope_of_work from './Components/Dashboard/Invoices/Scope_of_work';
import Wellcome_Onboard from './Components/Dashboard/Invoices/Wellcome_Onboard';
import Payroll from './Components/Dashboard/Payroll/Payroll';
import Integrations from './Components/Dashboard/Settings/Integrations';
import Profile from './Components/Dashboard/Settings/Profile';
import Settings from './Components/Dashboard/Settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/retainers" element={<Retainers />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/public-page" element={<PublicPage />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/team" element={<Team />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/freelance_rate_calculator" element={<Freelance_rate_calculator />} />
          <Route path="/GST_calculator" element={<GST_calculator />} />
          <Route path="/profit_margin_calculator" element={<Profit_margin_calculator />} />
          <Route path="/retainer_calculator" element={<Retainer_calculator />} />
          <Route path="/TDS_calculator" element={<TDS_calculator />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/clint_onboarding" element={<Clint_Onboarding />} />
          <Route path="/clint_reminder_invoice" element={<Clint_Reminder_invoice />} />
          <Route path="/freelance_contract" element={<Freelance_Contract />} />
          <Route path="/invoicecreate" element={<Invoicecreate />} />
         <Route path="/invoices" element={<Invoices />} />
        <Route path="/NDA_freelance" element={<NDA_freelancer />} />
        <Route path="/project_proposal" element={<Project_Proposal />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/retainer_agreement" element={<Retainer_Agreement />} />
        <Route path="/scope_of_work" element={<Scope_of_work />} />
        <Route path="/wellcome_onboard" element={<Wellcome_Onboard />} />
     <Route path="/payroll" element={<Payroll />} />
             <Route path="/integrations" element={<Integrations />} />
                     <Route path="/profile" element={<Profile />} />
                             <Route path="/settings" element={<Settings />} />

















        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;