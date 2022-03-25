import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import SignIn from '../Pages/SignIn';
import ConfirmUser from '../Pages/ConfirmUser';
import Users from '../Pages/Users/index';
import GroupsTable from '../Pages/Groups';
import StatusTable from '../Pages/Status/index';
import Timeline from '../Pages/Report/Timeline';
import Dashboard from '../Pages/Dashboard';
import About from '../Pages/About/AboutPage';
import RecoverPassword from '../Pages/RecoverPassword';
import ReportTable from '../Pages/Report/ReportTable';
import ReportDetail from '../Pages/Report/ReportDetail';
import Journey from '../Pages/Journey';
import Modality from '../Pages/Modality';
import NotFound from '../Pages/NotFound';
import Actions from '../Pages/Actions';
import Transition from '../Pages/Actions/Transition';
import JourneyView from '../Pages/Journey/JourneyPreview/JourneyPreview';
import Incident from '../Pages/Incident';
import Product from '../Pages/Products';
import Trigger from '../Pages/TriggerCommunication';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/about" component={About} />
    <Route exact path="/confirmUser" component={ConfirmUser} />
    <Route exact path="/recover-password" component={RecoverPassword} />

    <Route exact path="/add-incident" component={Incident} />
    <PrivateRoutes exact path="/dashboard" component={Dashboard} />

    <PrivateRoutes exact path="/reports" component={ReportTable} />
    <PrivateRoutes exact path="/reports/:modality" component={ReportTable} />
    <PrivateRoutes
      exact
      path="/reports/detail/:idDocument"
      component={ReportDetail}
    />
    <PrivateRoutes
      exact
      path="/reports/detail/:idDocument/logs"
      component={Timeline}
    />

    <PrivateRoutes exact path="/users" component={Users} />

    <PrivateRoutes exact path="/groups" component={GroupsTable} />

    <PrivateRoutes exact path="/status" component={StatusTable} />

    <PrivateRoutes exact path="/journey" component={Journey} />
    <PrivateRoutes exact path="/modality" component={Modality} />
    <PrivateRoutes exact path="/product" component={Product} />
    <PrivateRoutes exact path="/trigger" component={Trigger} />
    <Route exact path="/view-journey" component={JourneyView} />
    <PrivateRoutes path="/page-not-found" component={NotFound} />

    <PrivateRoutes path="/actions" component={Actions} />
    <PrivateRoutes path="/transition" component={Transition} />

    <Redirect from="*" to="/page-not-found" />
  </Switch>
);

export default Routes;
