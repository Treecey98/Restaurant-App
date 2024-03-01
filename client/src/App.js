import NavBar from './NavBar'
import InteractiveMap from './HomeMap'
import Footer from './Footer'
import Filter from './FilterApp'

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Filter></Filter>
      <InteractiveMap></InteractiveMap>
      <Footer></Footer>
    </div>
  );
}

export default App;
