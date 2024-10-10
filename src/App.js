import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'

import './App.css'
import NotFound from './components/NotFound'
import JobItemDetails from './components/jobItemDetails'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact path="/jobs/:id" component={JobItemDetails} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
