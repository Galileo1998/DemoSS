import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';


export default class DetalleOrden extends Component {
    constructor(){
        super();
        this.state = {
          things:[],
          isLoading: false,
          error: false,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
      }

      componentDidMount(){
        this.setState({isLoading:true});
        const { match: {params}} = this.props;
        const uri = `/api/ordenar/${params.id}`;
        paxios.get(uri)
        .then(
            ({data})=>{
                this.setState({...data});
            }
        )
        .catch(
          (err)=>{
            this.setState({error:"No se pudo cargar Thing."});
            console.log(err);
          }
        );
      }
    

  
  onChangeHandler(e) {
    const { name, value } = e.target;
    //validar
    this.setState({ ...this.state, [name]: value });
  }
  onSaveBtnClick(e) {
    const estado = 'Confirmado';
    paxios.put(`/api/ordenar/${this.props.match.params.id}`, {estado})
      .then(({ data }) => {
        this.props.history.push("/backlog");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar nuevo Producto" });
      })

    paxios.delete(`/api/things/${this.state.idProducto}`, { estado })
      .then(({ data }) => {
        this.props.history.push("/misOrdenes");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar nuevo Producto" });
      })
  }

  render() {
    console.log(this.state);
    return (
      <section >
        <h1>Orden con Id: {this.props.match.params.id}</h1>
        <section className="main fix640 " >
          {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
          <div className="thingItem" >
              <span>Nombre: {this.state.nombre}</span>
              <span>Identidad: {this.state.identidad}</span>
              <span>Email: {this.state.correoElectronico}</span>
              <span>Dirección: {this.state.direccion}</span>
              <span>Teléfono: {this.state.telefono}</span>
              
        </div>
        <div style={{width:50}}></div>
        <span>Ordeno:</span>
          <div className="thingItem">
              <span>{this.state.idProducto}</span>
              <span>{this.state.descripcion}</span>
              <span>L. {this.state.precio}</span>
              <span>Kg. {this.state.peso}</span>
              <span>Categoria: {this.state.categoria}</span>
            </div>
          <section className="action">
            <Button
              caption="Confirmar Orden"
              onClick={this.onSaveBtnClick}
              customClass="primary"
            />
            <div style={{width:50}}></div>
            <Button
              caption="Cancelar Orden"
              customClass="secondary"
              onClick={(e) => { this.props.history.push('/backlog') }}
            />
          </section>
        </section>
      </section>
    );
  }
}
