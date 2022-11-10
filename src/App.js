//import { Home } from '@mui/icons-material';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';

import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import { Payment } from '@mui/icons-material';

const promise = loadStripe('pk_test_51LXsgwCribC7BDSx10jtn8yRx8UyjUF7xo1hzGt9oISohpHAUCJFa6TZnr6C23npyMW81FmKiXNRGXQOPE1MPAyc00NI9DARXp');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);

      if (authUser) {
        //user just logged in
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });

  }, []);


  return (
    <div className="app">

      <Router>
        
        <Header />
        
        <Switch>
        <Route exact path="/" component={Home} />   
          <Route path='/login' component={Login} />
          <Route path='/checkout' component={Checkout} />
          {/* <Route path='/payment' component={Payment}  /> */}
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Switch>
      </Router>    
    </div>
  );
}

export default App;
