import { Component } from 'react';


import './App.css';
import CardList from './Components/Card-list/card-list.component';
import SearchBox from './Components/search-box/search-box.component';

class App extends Component {
   constructor(){
     super();

     this.state = {
       monsters : [],
       searchField: '',
     };
   }
   componentDidMount(){

    console.log('componentDidMount') 
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(()=>{
      return {monsters: users}
    }));

 }
   
 onSearchChange = (event)=> {
  const value = event.target.value;
  console.log(value);
  const searchField = value.toLocaleLowerCase();
  
  this.setState(() =>{
     return { searchField};
  });
};
  render(){
    console.log("render");

    const {monsters, searchField } = this.state;
    const {onSearchChange} = this;

    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField);
  });
     
    return (
      <div className="App">
        <h1 className="title">Monster Rolodex</h1>
         <SearchBox 
          className = 'search-box'
          placeholder = 'search monsters'
          onChangeHandler={onSearchChange}/>
        {/* filteredMonsters.map((monsters)=>{
            return(
                <div key={monsters.id}>
                  <h1>{monsters.name}</h1>
                </div>
            )
          }) */}
          <CardList monsters={filteredMonsters}/>
      </div>
    );
  } 
}

export default App;
