import React from 'react';
import Navigation from './src/routes/Navigation';
import { UserProvider } from './src/context/UserContext';

/*function App() {
  return <Navigation />;
}*/

const App = () => {
  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
};

export default App;
