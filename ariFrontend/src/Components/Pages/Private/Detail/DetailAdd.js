// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import axios from 'axios';
import { paxios } from '../../../../Utilities';
import { timingSafeEqual } from 'crypto';

/*
  module.exports = class Login .....
*/
export default class DetailAdd extends Component {
  constructor() {
    super();
    //definición del estado inicial
    this.state = {
      selectedFile: null,
      descripcion:'',
      precio: 0.00,
      peso: 0.00,
      categoria: '',
      imagen: null,
      error: false
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
  }

  handleFile(e)
  {
    let imagen = e.target.files[0];
    this.setState({imagen: imagen});
  }

  fileSelectedHandler = event =>{
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  }
  onSaveBtnClick(e) {
    const { descripcion, precio, peso, categoria, imagen } = this.state;
    paxios.post('/api/things', { descripcion, precio, peso, categoria, imagen })
      .then(({ data }) => {
        this.props.history.goBack();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al crear nuevo producto" });
      })
  }

  render() {
    return (
      <section>
        <h1>Crear Nuevo Producto</h1>
        <section className="main fix640">
          <Campo
            caption="Descripción"
            value={this.state.descripcion}
            name="descripcion"
            onChange={this.onChangeHandler}
          />
         <Campo
            caption="Precio"
            value={this.state.precio}
            name="precio"
            onChange={this.onChangeHandler}
          />
          <Campo
            caption="Peso"
            value={this.state.peso}
            name="peso"
            onChange={this.onChangeHandler}
          />
          <Campo
            caption="Categoría"
            value={this.state.categoria}
            name="categoria"
            onChange={this.onChangeHandler}
          />
         <Campo
            caption="Imagen"
            type= "file"
            value={this.state.imagen}
            name="imagen"
            onChange={this.onChangeHandler}
            //onChange={(e)=>this.handleFile(e)}
          />
          {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
          <section className="action">
            <Button
              caption="Crear Producto"
              onClick={this.onSaveBtnClick}
              customClass="primary"
            />
            <br></br>
            <Button
              caption="Cancelar"
              customClass="secondary"
              onClick={(e) => { this.props.history.goBack() }}
            />
          </section>
        </section>
      </section>
    );
  }
}