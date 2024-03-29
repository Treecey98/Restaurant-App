import Filter from '../components/FilterApp'
import InteractiveMap from '../components/HomeMap'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar';

function HomePage() {

    return (
      <div>
        <NavBar></NavBar>
        <Filter></Filter>
        <InteractiveMap></InteractiveMap>
        <Footer></Footer>
      </div>
    );
  }
  
  export default HomePage;