import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import {persistor, store} from './store/store';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from "@/pages/LoginPage";
import BlankPage from "@/pages/BlankPage";
import DashboardPage from "@/pages/DashboardPage";
import RuralProducerListPage from "@/pages/RuralProducerListPage";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/esqueci-minha-senha" element={<BlankPage />} />
            <Route path="/termos" element={<BlankPage />} />
            <Route path="/privacidade" element={<BlankPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/produtor-rural/listagem" element={<RuralProducerListPage />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;