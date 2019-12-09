import React , {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import { setJWT, setUnAuthHandler, getLocalStorage, setLocalStorage, removeLocalStorage } from './Utilities';
import { AnimatedSwitch } from 'react-router-transition';
import { pageTransitions as transition, mapGlideStyles as mapStyles } from './Transition';
import PrivateRoute from './PrivateRoute';

import NavBar from './Components/Common/NavBar/NavBar';
import Home from './Components/Pages/Public/Home/Home';
import Login from './Components/Pages/Public/Login/Login';

import Sigin from './Components/Pages/Public/Signin/Sigin';
import Dashboard from  './Components/Pages/Private/Dashboard/Dashboard';
import Backlog  from './Components/Pages/Private/Backlog/Backlog';
import Venta  from './Components/Pages/Public/ProductosDisponibles/products';
import Orden  from './Components/Pages/Public/ProductosDisponibles/orden';
import BacklogAdd from './Components/Pages/Private/Backlog/BacklogAdd';
import DetailAdd from './Components/Pages/Private/Detail/DetailAdd';
import DetailUpdate from './Components/Pages/Private/Detail/DetailUpdate';
import DetailDelete from './Components/Pages/Private/Detail/DetailDelete';
import MisOrdenes from './Components/Pages/Private/Backlog/misOrdenes';
import DetalleOrden from './Components/Pages/Private/Backlog/detalleOrden';
import DeleteOrden from './Components/Pages/Private/Backlog/deleteOrden';
import Cuentas from './Components/Pages/Public/Signin/cuentas';
import CuentasUpdate from './Components/Pages/Public/Signin/cuentasUpdate';
import CuentasDelete from './Components/Pages/Public/Signin/cuentasDelete';


class App extends Component {
  constructor(){
    super();
    // verificar los datos de local storage
    this.state =  {
      "auth":( JSON.parse(getLocalStorage('auth')) ||
      {
        logged: false,
        token: false,
        user: {}
      })
    };
    this.setAuth = this.setAuth.bind(this);
    this.setUnAuth = this.setUnAuth.bind(this);

    setJWT(this.state.auth.token);
    setUnAuthHandler(this.setUnAuth);
  } // constructor


  setUnAuth(error){
    this.setAuth(false,{});
  }

  setAuth(token, user){
    setJWT(token);
    let _auth = {
      logged: token && true,
      token: token,
      user: user
    };
    setLocalStorage('auth', JSON.stringify(_auth));
    this.setState({
      auth: _auth
    });
  }

  render(){
    return (
      <Router>
        <section className="container">
        <NavBar auth={this.state.auth} />
          <AnimatedSwitch
            {... transition}
            mapStyles={mapStyles}
            className="switch-wrapper"
          >
              <Route path="/" exact render={(props) => (<Home {...props} auth={this.state.auth} setUnAuth={this.setUnAuth} />)} />
              <Route path="/login" render={ (props)=>(<Login {...props} auth={this.state.auth} setAuth={this.setAuth} />) } />
              <Route path="/venta" component={Venta}/>
              <Route path="/orden/:id/:desc/:prec/:cate/:peso" component={Orden}/>
              <PrivateRoute path="/signin"  auth={this.state.auth} component={Sigin} />
              <PrivateRoute path="/main" auth={this.state.auth} component={Dashboard} />
              <Route path="/backlog" component={Backlog} />
              <PrivateRoute path="/backlogadd/:type/:dd" auth={this.state.auth} component={BacklogAdd} />
              <PrivateRoute path="/detailadd" auth={this.state.auth} component={DetailAdd} />
              <PrivateRoute path="/detailupdate/:id" auth={this.state.auth} component={DetailUpdate} />
              <PrivateRoute path="/detailDelete/:id" auth={this.state.auth} component={DetailDelete} />
              <PrivateRoute path="/misOrdenes/" auth={this.state.auth} component={MisOrdenes} />
              <PrivateRoute path="/detalleOrden/:id" auth={this.state.auth} component={DetalleOrden} />
              <PrivateRoute path="/deleteOrden/:id" auth={this.state.auth} component={DeleteOrden} />
              <PrivateRoute path="/cuentas" auth={this.state.auth} component={Cuentas} />
              <PrivateRoute path="/cuentasUpdate/:id" auth={this.state.auth} component={CuentasUpdate} />
              <PrivateRoute path="/cuentasDelete/:id" auth={this.state.auth} component={CuentasDelete} />
          </AnimatedSwitch>

        </section>
      </Router>
    );
  }
}

export default App;
