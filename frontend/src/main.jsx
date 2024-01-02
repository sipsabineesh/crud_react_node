import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider 
} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import AdminLoginScreen from './screens/AdminLoginScreen.jsx'
import AdminUsersListScreen from './screens/AdminUsersListScreen.jsx'
import AdminCreateUserScreen from './screens/CreateUserScreen.jsx'
import AdminUserUpdateScreen from './screens/AdminUserUpdateScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<HomeScreen/>}/>
      <Route path='/login' element={<LoginScreen/>}/>
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route path='/adminLogin' element={<AdminLoginScreen/>}/>
      <Route path='/getUsers' element={<AdminUsersListScreen/>}/>
      <Route path='/createUser' element={<AdminCreateUserScreen />} />
      <Route path='/updateUser/:id' element={<AdminUserUpdateScreen />} />


      {/* <Route path='' element={<AdminRoute />}>
        <Route path='admin/list' element={<ListScreen />} />
        <Route path='admin/create' element={<CreateScreen />} />
        <Route path='admin/update' element={<UpdateScreen />} />
        <Route path='admin/delete' element={<DeleteScreen />} />
      </Route> */}
    </Route>
  )
);



ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
 <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
 </Provider>

)
