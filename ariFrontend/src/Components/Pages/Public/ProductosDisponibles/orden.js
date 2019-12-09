// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import ScrollArea from 'react-scrollbar';
import {Link} from 'react-router-dom';
import { naxios } from '../../../../Utilities';

/*
  module.exports = class Login .....
*/
export default class Orden extends Component {
  constructor() {
    super();
    //definición del estado inicial

    this.state = {
      nombre:'',
      identidad: '',
      correoElectronico: '',
      direccion: '',
      telefono: '',
      idProducto: '',
      descripcion: '',
      precio: 0.00,
      peso: 0.00,
      categoria: '',
      error: false,
      isLoading: false,
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e){
    this.setState({isLoading:true});
    naxios.post(
        `/api/ordenar/nuevaOrden`,
        {
          nombre:this.state.nombre,
          identidad:this.state.identidad,
          correoElectronico:this.state.correoElectronico,
          direccion:this.state.direccion,
          telefono: this.state.telefono,
          idProducto:  this.props.match.params.id,
          descripcion: this.props.match.params.desc,
          precio: this.props.match.params.prec,
          peso: this.props.match.params.peso,
          categoria: this.props.match.params.cate,
          estado: 'Sin confirmar'
        }
      ).then(
        ({data})=>{
          this.props.history.goBack();
        }
      )
      .catch(
        (err)=>{
          console.log(err);
          this.setState({error:"Error al ordenar"});
        }
      );
  }

  onChangeHandler(e){
    let {name, value} = e.currentTarget;
    this.setState({[name]:value});
    }
    onBlurHandler(e){
      let { name, value } = e.currentTarget;
    }
  onSaveBtnClick(e) {
    const { nombre, identidad, correoElectronico, direccion, telefono } = this.state;
    naxios.post('/api/ordenar/new/', { nombre, identidad, correoElectronico, direccion, telefono })
      .then(({ data }) => {
        this.props.history.goBack();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al ordenar" });
      })
  }

  render() {

    return (

      <section>
        <h1>Ordenar Producto</h1>
              <ScrollArea
                speed = {0.8}
                className = "area"
                contentClassName = "content"
                vertical = {true}
                horizontal = {false}
              >
          <section className="main fix640">

              <b>Usted esta ordenando: {this.props.match.params.desc}, precio: L. {this.props.match.params.prec}, categoría: {this.props.match.params.cate}</b>

              <Campo
                caption="Nombre"
                value={this.state.nombre}
                name="nombre"
                onChange={this.onChangeHandler}
              />
            <Campo
                caption="Identidad"
                value={this.state.identidad}
                name="identidad"
                onChange={this.onChangeHandler}
              />
              <Campo
                caption="Correo Electrónico"
                value={this.state.correoElectronico}
                name="correoElectronico"
                onChange={this.onChangeHandler}
              />
              <Campo
                caption="Dirección"
                value={this.state.direccion}
                name="direccion"
                onChange={this.onChangeHandler}
              />
            <Campo
                caption="Teléfono"
                value={this.state.telefono}
                name="telefono"
                onChange={this.onChangeHandler}
              />

              {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
              <section className="action">
                <Button
                  caption="Ordenar"
                  onClick={this.onClickHandler}
                  customClass="primary"
                />
                <div style={{width:50}}></div>
                <Button
                  caption="Cancelar"
                  customClass="secondary"
                  onClick={(e) => { this.props.history.goBack() }}
                />

              </section>

        </section>
         </ScrollArea>
      </section>

    );
  }
}