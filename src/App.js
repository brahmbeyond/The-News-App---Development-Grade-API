
import Navbar from './Componants/Navbar';
import News from './Componants/News';

function App() {
  return (
   <>
   <Navbar/>
   <News pageSize={10} country={'in'} category={"science"}/>
   </>
  );
}

export default App;
