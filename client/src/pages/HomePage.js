import Filter from '../components/FilterApp'
import InteractiveMap from '../components/HomeMap'
import Footer from '../components/Footer'

function HomePage() {
    return (
      <div>
        <Filter></Filter>
        <InteractiveMap></InteractiveMap>
        <Footer></Footer>
      </div>
    );
  }
  
  export default HomePage;