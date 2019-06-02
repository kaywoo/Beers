import React from 'react';
import MaterialTable from 'material-table';


class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentWillMount() {
    fetch('https://api.punkapi.com/v2/beers?page=1&per_page=80')
    .then(response => response.json())
    .then(data => {
      let tempArray = [];
      data.forEach(element => {
        let tempObj = {};
        tempObj.name = element.name;
        tempObj.image = <img src={element.image_url} style={{height: '50px'}} alt={element.image_url}></img>;
        tempObj.tagline = element.tagline;
        tempArray.push(tempObj);
      });
      this.setState({data: tempArray})
      
    });
      
  }
  render () {
    

    const columns = [
      { title: 'Image', field: 'image' },
      { title: 'Name', field: 'name' },
      { title: 'Tagline', field: 'tagline'},
    ]

    const let = this.state.data


      return (
          <div> 
            <MaterialTable
              title="Editable Example"
              columns={columns}
              data={this.state.data}
              editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.state.data];
                      data.push(newData);
                      this.setState({ ...this.state, data });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.state.data];
                      data[data.indexOf(oldData)] = newData;
                      this.setState({ ...this.state, data });
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      const data = [...this.state.data];
                      data.splice(data.indexOf(oldData), 1);
                      this.setState({ ...this.state, data });
                    }, 600);
                  }),
              }}
        /></div>

      )

  }


}

export default About;