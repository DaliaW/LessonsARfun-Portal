// Styles
import "./styles/App.scss";
import "./styles/SideBar.scss";
import "./styles/NavBar.scss";

// Components
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import NavBar from "./components/Navbar";
import { ToastProvider } from "react-toast-notifications";

// Pages
import Homepage from "./pages/Homepage";
import Assets from "./pages/CreateALesson/Assets";
import MyClasses from "./pages/MyClasses";
import MyLessons from "./pages/MyLessons";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Lessons from "./pages/Lessons.jsx";
import Preview from "./pages/CreateALesson/Preview";
import Publish from "./pages/CreateALesson/Publish";

var currentLocation = window.location.pathname;

function App() {
  return (
    <div>
      {currentLocation === "/login" ||
      currentLocation === "/unauthorized" ||
      currentLocation === "/signup" ? null : (
        <NavBar />
      )}
      {currentLocation === "/login" ||
      currentLocation === "/unauthorized" ||
      currentLocation === "/signup" ? null : (
        <Sidebar />
      )}
      <Router>
        <Switch>
          <ToastProvider>
            {currentLocation === "/login" || currentLocation === "/signup" ? (
              <div>
                <Switch>
                  <Route
                    exact
                    path="/login"
                    render={(props) => <Login {...props} />}
                  />
                  <Route
                    path="/signup"
                    render={(props) => <SignUp {...props} />}
                  />
                </Switch>
              </div>
            ) : (
              <div className="myApp">
                <Switch>
                  <Route
                    exact
                    path="/home"
                    render={(props) => <Homepage {...props} />}
                  />
                  <Route
                    exact
                    path="/CreateLesson/assets"
                    render={(props) => <Assets {...props} />}
                  />
                  <Route
                    exact
                    path="/CreateLesson/preview"
                    render={(props) => <Preview {...props} />}
                  />
                  <Route
                    exact
                    path="/CreateLesson/publish"
                    render={(props) => <Publish {...props} />}
                  />
                  <Route
                    exact
                    path="/MyClasses"
                    render={(props) => <MyClasses {...props} />}
                  />
                  <Route
                    exact
                    path="/MyLessons"
                    render={(props) => <MyLessons {...props} />}
                  />
                  <Route
                    exact
                    path="/profile"
                    render={(props) => <Profile {...props} />}
                  />
                  <Route
                    exact
                    path="/lessons/:id"
                    render={(props) => <Lessons {...props} />}
                  />
                  {/* // to be last */}
                  <Route
                    exact
                    path="/"
                    render={(props) => <Homepage {...props} />}
                  />
                </Switch>
              </div>
            )}
          </ToastProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
