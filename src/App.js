import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Services from './Components/Services';

import LoginRegister from './Components/LoginPage';
import SearchPetProfile from './Components/Searchpetprofile';
import InsuranceClaims from './Components/InsuranceClaims';
import AddInsurancePage from './Components/AddInsurance';
import AddInsuranceClaim from './Components/AddInsurancePage';
import OwnershipTransfer from './Components/OwnershipTransfer';
import ApproveTransfer from "./Components/ApproveTransfer";
import Profile from './Components/profilepet';
import MainPage from './Components/Profile';
import Health from './Components/Health';
import RegisterPet from './Components/RegisterPet'
import RequireAuth from "./Components/RequireAuth";
import VetProfile from './Components/VetProfile';
import InsuranceProfile from './Components/InsuranceProfile';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Main page with all sections combined */}
          <Route
            path="/"
            element={
              <>
                <Home />
                <About />
                <Services />
                <Contact />
                {/* <Footer /> */}
              </>
            }
          />

          {/* Separate pages */}
          <Route path="/search-profile" element={<SearchPetProfile />} />
          <Route path="/login" element={<LoginRegister />}/>
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<About/>} />
        <Route path="/contact-info" element={<Contact />} />
        <Route path = "/services" element={<Services />}  />
        <Route path="/pet-registration" element={<RegisterPet />} />
        <Route element={<RequireAuth />}>
          <Route path="/claim-insurance" element={<InsuranceClaims />} />
        <Route path="/pet-health" element={<Health />} />
        <Route path="/add-insurance" element={<AddInsurancePage />} />
        <Route path="/insurance" element={<AddInsuranceClaim />} />
        <Route path="/ownership-transfer" element={<OwnershipTransfer />} />
        <Route path="/approve-transfer" element={<ApproveTransfer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pprofile" element={<MainPage />} />
        <Route path="/vet-profile" element={<VetProfile />} />
        <Route path="/insurance-profile" element={<InsuranceProfile/>} />
        </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
