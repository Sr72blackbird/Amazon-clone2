//import { Home } from '@mui/icons-material';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';

function App() {
  const[{},dispatch] = useStateValue();

useEffect(() => {
  
auth.onAuthStateChanged(authUser=>{
  console.log('THE USER IS >>> ',authUser);
  
  if(authUser) {
    //user just logged in
dispatch({
  type:'SET_USER',
  user:authUser
})
  } else{
    dispatch({
      type:'SET_USER',
  user:null
    })
  }
})
  
}, )


  return (
    <div className="app">

      <Router>
        <Header />
        <Switch>
          <Route path='/login' component={Login}
          />

          <Route path='/checkout' component={Checkout} />
          <Route exact path="/" component={Home} />

        </Switch>

      </Router>
    </div>
  );
}

export default App;
