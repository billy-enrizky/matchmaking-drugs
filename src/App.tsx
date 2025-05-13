import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AccountCreationWizard from "./components/AccountCreationWizard";
import DrugSearchInterface from "./components/DrugSearchInterface";
import MessagingInterface from "./components/MessagingInterface";
import DrugInventoryManager from "./components/DrugInventoryManager";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account-creation" element={<AccountCreationWizard />} />
        <Route path="/drug-search" element={<DrugSearchInterface />} />
        <Route path="/messaging" element={<MessagingInterface />} />
        <Route path="/inventory" element={<DrugInventoryManager />} />
      </Routes>
    </Suspense>
  );
}

export default App;
