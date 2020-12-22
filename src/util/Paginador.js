

import React, { Component } from 'react';
import Pagination from "react-js-pagination";

class Paginador extends React.Component {

	constructor(props) {
        super(props);
        this.state={
            activePage: 15,
            total_registros:300,
            pag_primer:50,
            numeroRegistrosPagina:100,
            numeroPaginasGrupo:20,
        };
    }

	handlePageChange = (pageNumber) =>{
        console.log(`active page is ${this}`);
       this.setState({activePage: pageNumber});
    }

    render(){
        return (
                <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                />
        );
    }

}
export default Paginador;

