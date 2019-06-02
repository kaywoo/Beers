import React from 'react';
import ReactTable from 'react-table';
import matchSorter from 'match-sorter';
import 'react-table/react-table.css';



class List extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        beers: [],
      }
    }
  
    componentDidMount() {
      fetch('https://api.punkapi.com/v2/beers?page=1&per_page=80')
      .then(response => response.json())
      .then(data => {
        this.setState({beers: data})
        
      });
        
    }

    onClick(e) {
      e.target.classList.toggle('red');
      // if (e.target.classList.contains('red')) {
      //     e.target.classList.remove('red')
      // } else{
      //   e.target.classList.add("red");
      // }
    }

    render() {
      const columns = [{
        Header: 'Image',
        accessor: 'image_url',
        Cell: row => <img src={row.value} style={{height: '100px'}} alt={row.value} onClick={this.onClick}></img>
      },{
        Header: 'Name',
        id:"name",
        filterable: true,
        accessor: d => d.name,
        filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name']}),
        filterAll: true
      },{
        Header: 'Tagline',
        accessor: 'tagline'
      
        
      }]
      return (
        <div className="beers">
          <header class="header"><h2>Beers List</h2></header>
          <ReactTable data={this.state.beers} columns={columns} defaultPageSize={10}/>
        </div>
      )
    }

}

export default List;