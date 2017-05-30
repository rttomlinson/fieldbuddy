import React from 'react'
import DashboardNav from './DashboardNav';


const Dashboard = ({boards, children}) => {
    return (
        <div className="container">
            <DashboardNav boards={boards} />
            {children}
        </div>   
    );
};

export default Dashboard;
