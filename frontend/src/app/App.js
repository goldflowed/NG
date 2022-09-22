import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CompanyMain from '../features/company/main/page';
import Home from '../features/main/home/home';
import BrandRegister from '../features/main/brandregister/brandregister'
import CompanyRegister from '../features/company/register/register';
import Nfts from '../features/company/nfts/nfts';
import Detail from '../features/company/detail/detail';
import Nft from '../features/company/nft/nft';
import AdminMain from '../features/admin/main/AdminMain';
import Approve from '../features/admin/approve/Approve';
import Deny from '../features/admin/deny/Deny';
import CompanyRoute from '../common/companyroute/CompanyRoute';
import AboutUs from '../features/main/aboutus/aboutus'
import SearchNft from "../features/main/searchnft/searchnft"
import MyNft from "../features/main/mynft/mynft"
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/brandregister" element={ <BrandRegister/> } />
        <Route exact path="/aboutus" element={ <AboutUs/> } />
        <Route exact path="/searchnft" element={ <SearchNft/> } />
        <Route exact path="/mynft" element={ <MyNft/> } />
        <Route exact path="/company/123" element={ <CompanyRoute><CompanyMain/></CompanyRoute>}/>
        <Route exact path="/company/123/register" element={ <CompanyRoute><CompanyRegister/></CompanyRoute> }/>
        <Route exact path="/company/123/nfts" element={ <CompanyRoute><Nfts/></CompanyRoute>}/>
        <Route exact path="/company/123/nfts/:productCode" element={ <CompanyRoute><Detail/></CompanyRoute>}/>
        <Route exact path="/company/123/nfts/:productCode/:productNum" element={ <CompanyRoute><Nft/></CompanyRoute>}/>
        <Route exact path="/admin" element={<AdminMain/>}/>
        <Route exact path="/admin/approve" element={<Approve/>}/>
        <Route exact path="/admin/deny" element={<Deny/>}/>
      </Routes>
    </Router>
  );
}

export default App;
