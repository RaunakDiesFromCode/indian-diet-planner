import { useState } from 'react';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';

function App() {
  const [userPrefs, setUserPrefs] = useState(null);

  if (!userPrefs) {
    return <Onboarding onComplete={(prefs) => setUserPrefs(prefs)} />;
  }

  return <Dashboard userPrefs={userPrefs} onBack={() => setUserPrefs(null)} />;
}

export default App;
