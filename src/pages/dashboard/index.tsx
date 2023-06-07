import React from 'react';
import VerificationOfEmail from '@components/VerificationOfEmail';

import DashboardComponent from '@components/Dashboard';

const Dashboard = () => {
    return (
        <>
          <VerificationOfEmail />
          <DashboardComponent />;
        </>
      );

};

export default Dashboard;
