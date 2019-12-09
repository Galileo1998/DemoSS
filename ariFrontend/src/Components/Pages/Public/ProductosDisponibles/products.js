import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Backlog.css';
import { IoIosShuffle, IoIosMenu, IoIosCash} from 'react-icons/io';
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
      naxios.get('/api/venta/')
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
              <img src={thing.imagen}/>
              <span>{thing.descripcion}</span>
              <span>L. {thing.precio}</span>
              <span>Kg. {thing.peso}</span>
              <span>Categoria: {thing.categoria}</span>
              <Link to={`/orden/${thing._id}/${thing.descripcion}/${thing.precio}/${thing.categoria}/${thing.peso}`}><IoIosCash size="2.5em" /></Link>
              <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
              </span>
            </div>);
        }
      );
    return (
      <div className="listHolder">
      <h1>Productos Ari Rescue</h1>
      <h2>Cantidad de Productos: {this.state.things.length}</h2>
      <div>
        {items}
      </div>
      { (this.state.isLoading)? "...Cargando": null }
      </div>
    )
  }
}

export default List;
