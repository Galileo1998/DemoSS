import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';

export default class Venta extends Component 
{
    constructor() {
        super();
        //definición del estado inicial
        this.state = {
          descripcion: '',
          precio: 0,
          peso: 0.00,
          categoria: '',
          error: false
        };
        this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
      }

      componentDidMount(){
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
          }
        );
      }
    
      onSaveBtnClick(e) {
        const { descripcion,precio,  _id} = this.state;
        paxios.delete(`/api/ordenar/${_id}`, { descripcion, precio })
          .then(({ data }) => {
            this.props.history.push("/misOrdenes");
          })
          .catch((error) => {
            console.log(error);
            this.setState({ error: "Error al eliminar nuevo Producto" });
          })
      }

      render() {
        console.log(this.state);
        return (
            <div>
            <Button
              caption="Eliminar producto"
              onClick={this.onSaveBtnClick}
              customClass="primary"
            />
            <br></br>
            <Button
              caption="Cancelar"
              customClass="secondary"
              onClick={(e) => { this.props.history.push('/misOrdenes') }}
            />
            </div>
        )
      }
}