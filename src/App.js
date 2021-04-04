import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TopNav from './components/TopNav';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute'

import Login from './auth/Login';
import Register from './auth/Register';
import Home from "./booking/Home";
import Dashboard from "./user/Dashboard";
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import StripeCallback from './stripe/StripeCallback';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';
import StripeSuccess from './stripe/StripeSuccess';
import StripeCancel from './stripe/StripeCancel';
import SearchResult from './hotels/SearchResult';

function App() {
  return (
    <Router>
      <TopNav />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Register } />
        <Route exact path="/hotel/:hotelId" component={ ViewHotel } />
        <Route exact path="/search-result" component={ ViewHotel } />
        
        <PrivateRoute exact path="/dashboard" component={ Dashboard } />
        <PrivateRoute exact path="/dashboard/seller" component={ DashboardSeller } />
        <PrivateRoute exact path="/hotels/new" component={ NewHotel } />
        <PrivateRoute exact path="/stripe/callback" component={ StripeCallback } />
        <PrivateRoute exact path="/hotel/edit/:hotelId" component={ EditHotel } />
        <PrivateRoute exact path="/stripe/success/:hotelId" component={ StripeSuccess } />
        <PrivateRoute exact path="/stripe/cancel" component={ SearchResult } />

      </Switch>
    </Router>
  );
}

export default App;
