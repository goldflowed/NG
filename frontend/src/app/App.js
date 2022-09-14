import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CompanyMain from '../features/company/main/page';
import Main from '../features/main/page';
import CompanyRegister from '../features/company/register/register';
import Nfts from '../features/company/nfts/nfts';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Main/> } />
        <Route exact path="/company/123" element={ <CompanyMain/>}/>
        <Route exact path="/company/123/register" element={ <CompanyRegister/> }></Route>
        <Route exact path="/company/123/nfts" element={ <Nfts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
