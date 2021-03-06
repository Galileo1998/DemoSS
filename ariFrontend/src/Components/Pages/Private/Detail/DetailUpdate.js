import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';


export default class DetailUpdate extends Component {
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
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
  }

  componentDidMount(){
    const { match: {params}} = this.props;
    const uri = `/api/things/${params.id}`;
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
    const { descripcion,precio,peso, categoria,  _id } = this.state;
    paxios.put(`/api/things/${_id}`, { descripcion, precio, peso, categoria})
      .then(({ data }) => {
        this.props.history.push("/backlog");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar nuevo Producto" });
      })
  }

  render() {
    console.log(this.state);
    return (
      <section>
        <h1>{this.props.match.params.id}</h1>
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
          {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
          <section className="action">
            <Button
              caption="Actualizar producto"
              onClick={this.onSaveBtnClick}
              customClass="primary"
            />
            <br></br>
            <Button
              caption="Cancelar"
              customClass="secondary"
              onClick={(e) => { this.props.history.push('/backlog') }}
            />
          </section>
        </section>
      </section>
    );
  }
}
