import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Backlog.css';
import { IoIosDocument, IoIosRemove} from 'react-icons/io';
import { naxios } from '../../../../Utilities';

function ListItem(props){
  return(
    <div key={props._id}>
      <b>
        <Link to={`/detail/${props._id}`}>{props.desc}</Link>
      </b>
    </div>
  );
}

class List extends Component{
  constructor(){
    super();
    this.state = {
      things:[],
      isLoading: false,
      error: false,
    }
  }
  componentDidMount(){
      this.setState({isLoading:true});
      naxios.get('/api/ordenar/')
        .then( (resp)=>{
          this.setState({things:resp.data, isLoading:false});
        })
        .catch( (err)=>{
          alert(err);
        })
      ;
  }

 
  render(){
    const items = this.state.things.map(
        (thing)=>{
          return (
            <div className="thingItem" key={thing._id}>
              <span>{thing.estado}</span>
              <span>{thing.nombre}</span>
              <span>{thing.identidad}</span>
              <span>{thing.descripcion}</span>
              <Link to={`/detalleOrden/${thing._id}`}><IoIosDocument size="2.5em" /></Link>
              <Link to={`/deleteOrden/${thing._id}`}><IoIosRemove size="2em"/></Link>
              <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
              </span>
            </div>);
        }
      );
    return (
      <div className="listHolder">
      <h1>Ordenes Ari Rescue</h1>
      <h2>Cantidad de Ordenes: {this.state.things.length}</h2>
      <div>
        {items}
      </div>
      { (this.state.isLoading)? "...Cargando": null }
      </div>
    )
  }
}

export default List;
