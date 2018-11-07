import backend from "./../js/BackendApi.js"

//import * as React from 'react';
import React from "react";

class PokeApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = { page: 1, pagesize: 10, filtername: "", filtertags: "", pokrefs: null, poks: [], pokrefscount: 0 };
	  }
	
	loadPoks(params) {
		var self = this;
		var pokRefs = this.state.pokrefs;
		var poks = [];
		
		let pagesize = (params && params.pagesize) ? params.pagesize : self.state.pagesize;
		let filtername = (params && params.filtername) ? params.filtername : self.state.filtername;
		const fromIndex = (self.state.page - 1) * pagesize;
		
		let pokRefsFiltered = [];
		
		pokRefs.forEach((pokRef, i) => {
			if (!filtername || pokRef.name.toLowerCase().indexOf(filtername) === 0) {
				pokRefsFiltered.push(pokRef);
			}
		});
		console.log("pokRefsFiltered");
		console.log(pokRefsFiltered);
		
		let pokRefsPaged = pokRefsFiltered.slice(fromIndex, pagesize);
			
		console.log("pokRefsPaged");
		console.log(pokRefsPaged);
		Promise.all(			
			pokRefsPaged.map((pr) => {
				var pokid = pokRefs.indexOf(pr) + 1;
				console.log("fetching for %s", pr.url);
				return backend.callApiByUrl(pr.url);
			})
		).then((resarr) => {
			console.log("loaded");
			console.log(resarr);
			self.setState({ poks: resarr });
		});
	}
	
	componentDidMount() {
		
		var self = this;
		backend.callApi("pokemon").then((res) => {
			var pokRefs = res.results;
			var count = res.count;
			self.setState({ pokrefscount: res.count });
			self.setState({pokrefs:pokRefs});
			self.loadPoks();
		});
		/*
		*/
  }
  
  handleSubmit() {}
  handleFilterByNameChange(e) {
	  console.log("filtername");
	  console.log(this.state.filtername);
	  console.log(e.target.value);
	  this.loadPoks({ filtername: e.target.value });
	  
  }
  handlePagingSizeChange(e, pagesize) {
	  e.preventDefault();
	  this.setState({ pagesize: pagesize });
	  this.loadPoks({ pagesize: pagesize });
  }
  
  componentWillMount() {

  }
  
  componentWillUnmount() {

  }
	
  render() {
	  
	  const trs = this.state.poks.map((poke) => {
		const statshtml = poke.stats.map((stat) => stat.stat.name + "=" + stat.base_stat).join(", ");
		const typeshtml = poke.types.map((type) => type.type.name).join(", ");
		return (
			<tr>
			<td><strong>{poke.name}</strong></td>
			<td>{typeshtml}</td>
			<td>{statshtml}</td>
		</tr>
		);
	  });
	  
	  const pageBtns = [];
	  ;
	  const pageBtnCount = Math.ceil( this.state.pokrefscount / this.state.pagesize );
	  for (let i = 1; i <= pageBtnCount; i++) {
		  let activeClass = this.state.page == i ? "active disabled" : "";
		  pageBtns.push( <li class="page-item {activeClass}"><a class="page-link" href="" onClick={() => this.handlePageChange.bind(this)(i)}>{i}</a></li> );
	  }
	  
    return (
	<div>
		<div class="form-inline">
		
			Filter:&nbsp;
			<div class="form-group">
				<label class="control-label">by Name&nbsp;<input type="text" name="filtername" onKeyUp={(e) => this.handleFilterByNameChange.bind(this)(e)} class="form-control" placeholder="Type poke name..." /></label>
			</div>
		
		</div>
		<p>&nbsp;</p>
	
		<table class="table table-striped">
			<tr>
				<th>Name</th>
				<th>Types</th>
				<th>Stats</th>
			</tr>
			{trs}
		</table>
				
		<nav aria-label="...">
		  <ul class="pagination pagination-sm">
				<li class={"page-item " + (this.state.pagesize == 10 ? "active" : "")}>
			  <a class="page-link" href="" tabindex="-1" onClick={(e) => this.handlePagingSizeChange.bind(this)(e, 10)}>10</a>
			</li>
			<li  class={"page-item " + (this.state.pagesize == 20 ? "active" : "")}><a class="page-link" href="" onClick={(e) => this.handlePagingSizeChange.bind(this)(e, 20)}>20</a></li>
			<li  class={"page-item " + (this.state.pagesize == 50 ? "active" : "")}><a class="page-link" href="" onClick={(e) => this.handlePagingSizeChange.bind(this)(e, 50)}>50</a></li>
			<li  class={"page-item " + (this.state.pagesize == 100 ? "active" : "")}><a class="page-link" href="" onClick={(e) => this.handlePagingSizeChange.bind(this)(e, 100)}>100</a></li>
		  </ul>
		</nav>
	</div>
	);
  }
};

/*
class PagingBtn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	
	render() {
		return (
			<li class="page-item"><a class="page-link" href="#" onClick={() => this.props.handlePagingSizeChange(100)}>100</a></li>
		);
	}
}
*/

export default PokeApp;