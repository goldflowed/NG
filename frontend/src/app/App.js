import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CompanyMain from '../features/company/main/page';
import Main from '../features/main/page';
import CompanyRegister from '../features/company/register/register';
import Nfts from '../features/company/nfts/nfts';
import Detail from '../features/company/detail/detail';
import Nft from '../features/company/nft/nft';
import AdminMain from '../features/admin/main/AdminMain';
import Approve from '../features/admin/approve/Approve';
import Deny from '../features/admin/deny/Deny';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Main/> } />
        <Route exact path="/company/123" element={ <CompanyMain/>}/>
        <Route exact path="/company/123/register" element={ <CompanyRegister/> }></Route>
        <Route exact path="/company/123/nfts" element={ <Nfts/>}/>
        <Route exact path="/company/123/nfts/:productCode" element={ <Detail/>}/>
        <Route exact path="/company/123/nfts/:productCode/:productNum" element={ <Nft/>}/>
        <Route exact path="/admin" element={<AdminMain/>}/>
        <Route exact path="/admin/approve" element={<Approve/>}/>
        <Route exact path="/admin/deny" element={<Deny/>}/>
      </Routes>
    </Router>
  );
}

export default App;
