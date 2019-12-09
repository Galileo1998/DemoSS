import  React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { IoIosSync, IoMdAddCircle, IoIosAddCircleOutline } from 'react-icons/io';
import {Link} from 'react-router-dom';


import { naxios } from '../../../../Utilities';

import "./Backlog.css";

export default class Venta extends Component {
  constructor(props){
    super();
    this.state={
      things:[],
      redirect:false,
      page:1,
      itemsToLoad:10
    }
    this.loadMore = this.loadMore.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    console.log(this.props);
  }
  loadMore(page){
    const items  = this.state.itemsToLoad;
    const uri = `/api/things/page/${page}/${items}/NA`;
    naxios.get(uri)
      .then(
        ({data})=>{
          this.props.setAuth(data.token, data.user);
          const { things, totalThings} = data;
          const loadedThings = this.state.things;
          things.map((e)=>loadedThings.push(e));
          if(totalThings){
              this.setState({
                "things": loadedThings,
                "hasMore": (page * items < totalThings)
              });
          } else {
            this.setState({
              "hasMore": false
            });
          }
        }
      )
      .catch(
        (err)=>{
          console.log(err);
        }
      );
  }
  handleClick(key){
    const { dd, type } = this.props.match.params;
    let body = { dd, type};
    naxios.put(`/api/things/${key}`, body)
    .then(
      ({data})=>{
        this.props.history.goBack();
      }
    )
    .catch(
      (err)=>{
        console.log(err);
      }
    );
  }

  render() {
  const items = this.state.things.map(
    (thing)=>{
      return (
        <div className="thingItem" key={thing._id}>
        <span>{thing.descripcion}</span>
        <span>{thing.precio}</span>
          <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
              <IoIosAddCircleOutline size="2em"/>
          </span>
        </div>);
    }
  );

  if(!items.length) items.push(
    <div className="thingItem" key="pbBackLogAddOne">
      <span>Nuevo Thing</span>
      <Link to="/detailadd"><IoMdAddCircle size="2.5em" /></Link>
    </div>);

  return (
    <section>
      <h1>
        Añadir nuevo producto
      </h1>
      <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={this.state.hasMore}
            useWindow={false}
            getScrollParent={()=>this.scrollParentRef}
            loader={<div key="pbBackLogLoading" className="thingItem center"><IoIosSync/></div>}
            >
              {items}
          </InfiniteScroll>
      </div>
     </section>
   );
  }
}
