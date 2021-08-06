import React , {useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'; //checar
import {Container,Dimmer,Loader} from 'semantic-ui-react';
import Home from './components/Home';
import People from './components/People';
import Planets from './components/Planets';

function App() {

  const [people,setPeople] = useState([]);
  const [planets,setPlanets] = useState([]);
  const [loading,setLoading] = useState([true]);

  useEffect( ()=> {
       
    async function fetchPeople(){
          
      let res = await fetch('https://www.swapi.tech/api/people/?format=json');
      let data = await res.json();
      setPeople(data.results);
      setLoading(false);


    }
    

    async function fetchPlanets(){
          
      let res = await fetch('https://www.swapi.tech/api/planets/?format=json');
      let data = await res.json();
      setPlanets(data.results);
      setLoading(false);

    }

    fetchPeople();
    fetchPlanets();

  },[])
  

  return (
    


     <Router>
     <Navbar/>
     <Container>
          {loading ?(

             <Dimmer active inverted>
                  <Loader inverted> Loading  </Loader>


             </Dimmer>

          ): (
              
            <Switch>
            <Route exact path='/'>
                <Home />
            </Route>
            
            <Route exact path='/people'>
                <People data={people} />
            </Route>

            <Route exact path='/planets'>
                <Planets data={planets} />
            </Route>

            </Switch>
          )}


          


    </Container>

     </Router>

           
    
  );
}

export default App;
