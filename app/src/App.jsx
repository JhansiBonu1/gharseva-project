import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import WorkerDashboard from './components/WorkerDashboard';
import AddWorker from './components/AddWorker';
import Alldetails from './components/AllDetails';
import Del from './components/Del';
import Update from './components/Update';
import AddCategory from "./components/AddCategory";
import Categories from "./components/Categories";
import AddSubCategory from "./components/Addsubcategory";
import UpdateCat from "./components/UpdateCat";
import Manageworkers from "./components/Manageworkers";
import AvailableWorkers from "./components/AvailableWorkers";
import Workerdetails from "./components/Workerdetails";
import SubServiceView from "./components/SubServiceView";
import WorkerList from "./components/WorkerList";
import './App.css';
import './Usercat.css';
import CategoriesDashboard from "./components/CategoriesDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/User" element={<UserDashboard />} />
        <Route path="/Admin" element={<AdminDashboard />} />
        <Route path="/Worker" element={<WorkerDashboard />} />
        <Route path="/add" element={<AddWorker />} />
        <Route path="/alldetails" element={<Alldetails />} />
        <Route path="/delete" element={<Del />} />
        <Route path="/update" element={<Update />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/addsubcategory" element={<AddSubCategory />} />
        <Route path="/updcategory" element={<UpdateCat />} />
        <Route path="/manageworkers" element={<Manageworkers />} />
        <Route path="/availableworkers" element={<AvailableWorkers />} />
        <Route path="/workerdetails" element={<Workerdetails />} />
        <Route path="/worker/:id" element={<Workerdetails />} />
        <Route path="/worker/details/:id" element={<Workerdetails />} />
        <Route path="/availableworkers/:skill" element={<AvailableWorkers />} />
        <Route path="/category" element={<UserDashboard />} />
        <Route path="/services/:catId" element={<SubServiceView />} />
        <Route path="/workers/:skill" element={<WorkerList />} />
         <Route path="/admin/categories" element={<CategoriesDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
