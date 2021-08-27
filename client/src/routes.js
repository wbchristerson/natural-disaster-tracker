import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const AddDisaster = React.lazy(() => import('./views/added-pages/AddDisaster'));
const SingleDisasterDisplay = React.lazy(() => import('./views/added-pages/SingleDisasterDisplay'));
const EditDisaster = React.lazy(() => import('./views/added-pages/EditDisaster'));
const EditWitnessReport = React.lazy(() => import('./views/added-pages/EditWitnessReport'));
const CoreUICredits = React.lazy(() => import('./views/added-pages/CoreUICredits'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/add-disaster-event', name: "Add Disaster Event", component: AddDisaster },
  { path: '/single-disaster-display', name: "Single Disaster Display", component: SingleDisasterDisplay },
  { path: '/edit-disaster-event', name: "Edit Disaster Event", component: EditDisaster },
  { path: '/edit-witness-report', name: "Edit Witness Report", component: EditWitnessReport },
  { path: '/core-ui-credits', name: "Core UI Credits", component: CoreUICredits },

];

export default routes;
