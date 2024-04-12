import Filter from '../components/FilterApp'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar';

function HomePage() {

    return (
      <div>
        <NavBar></NavBar>
        <Filter></Filter>
        <Footer></Footer>
      </div>
    );
  }
  
  export default HomePage;