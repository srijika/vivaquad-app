import React, { Component, Suspense, lazy } from 'react';
import {Route } from 'react-router-dom';
import { Redirect } from 'dva/router';

//DASHBOARD
import Dashboard from '../pages/dashboard/dashboard';


//STUDENT MANAGMENT
import StudentList from '../pages/students/list';
import AddEditStudent from '../pages/students/action/addEdit';

//SCHOOL MANAGMENT
import SubAdminList from '../pages/subadmin/list';
import AddEditSubAdmin from '../pages/subadmin/action/addEdit';

//EMPLOYEE MANAGMENT
import EmployeeList from '../pages/employees/list';
import AddEditEmployee from '../pages/employees/action/addEdit';
import ViewEmployee from '../pages/employees/action/view';


//ACCOUNT
import Account from '../pages/account/index';

//PAGES(CMS) 
import PagesList from '../pages/pages/list';
import AddEditPages from '../pages/pages/action/addEdit';

//SETTINGS
import SiteSetting from '../pages/site-setting/list';
import Setting from '../pages/setting/setting';


function hasAdmin(){
		let role = localStorage.getItem('role');
		if(role === "ADMIN"){
			return true;
		}
		else{ return false }
	}
	
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      hasAdmin() ? (<Component {...props} />) : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
    }
  />
);

class SubRoute extends Component {	




	render() {
		return (
			<div> 
				{/* Dashboard */}
			  <Route exact name="Dashboad" breadcrumbName="Dashboad" path={'/'} component = {Dashboard}/>  

			  {/*START Student Routes */}
              <Route exact path='/students' component={StudentList} />
			  <Route exact path='/student/edit/:id' component={AddEditStudent} />
			  {/*End Student Routes */}

			  {/*START Student Routes */}
			  <PrivateRoute exact path='/subadmins' component={SubAdminList} />
			  <PrivateRoute exact path='/subadmin/edit/:id' component={AddEditSubAdmin} />
			  {/*End Student Routes */}

			  {/*START Employee Routes */}
			  <Route exact path='/employees' component={EmployeeList} />
			  <Route exact path='/employee/edit/:id' component={AddEditEmployee} />
			  <Route exact path='/employee/add' component={AddEditEmployee} />
			  <Route exact path='/employee/view/:id' component={ViewEmployee} />
			  {/*End Employee Routes */}

			   

			
              {/* ACCOUNT ROUTES */} 
			  <Route exact path={"/account"} component={Account}/>
              {/* END ROUTES */} 

			
			
              {/*START PAGE ROUTES */} 
			  <Route exact path={"/pages"} component={PagesList}/>
			  <Route exact path={"/pages/add"} component={AddEditPages}/>
			  <Route exact path='/pages/edit/:id' component={AddEditPages} />
              {/*END PAGE ROUTES */} 


              {/* SETTING ROUTES */}
			  <Route exact path={`/settings`} component={SiteSetting}/>
			  <Route exact path={`/setting`} component={Setting}/>
              {/* END SETTING ROUTES */}

			</div>



		);
   }
} 

export default SubRoute;