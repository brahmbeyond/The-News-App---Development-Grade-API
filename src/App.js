
import Navbar from './Componants/Navbar';
import News from './Componants/News';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
     <Navbar />
      <Routes>
     
        {/* <Route exact path="/" element={} > </Route> */}
        <Route exact path="/" element={<News pageSize={10} key="general" country={'in'} category={"general"} />} > </Route>
        <Route exact path="/business" element={<News key="business" pageSize={10} country={'in'} category={"business"} />} > </Route>
        <Route exact path="/entertainment" element={<News key="entertainmenth" pageSize={10} country={'in'} category={"entertainment"} />} > </Route>
        <Route exact path="/health" element={<News key="health" pageSize={10} country={'in'} category={"health"} />} > </Route>
        <Route exact path="/science" element={<News key="scienc" pageSize={10} country={'in'} category={"science"} />} > </Route>
        <Route exact path="/sports" element={<News key="sports" pageSize={10} country={'in'} category={"sports"} />} > </Route>
        <Route exact path="/technology" element={<News key="technology" pageSize={10} country={'in'} category={"technology"} />} > </Route>
      </Routes>





    </>
  );
}

export default App;
