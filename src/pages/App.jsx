
import { Fragment, useEffect, useState } from 'react';
import Loader from '../components/common/loader/loader';
import Footer from '../components/common/footer/footer';
import Sidebar from '../components/common/sidebar/sidebar';
import Switcher from '../components/common/switcher/switcher';
import Header from '../components/common/header/header';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import store from '../redux/store';
import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Tabtotop from '../components/common/tabtotop/tabtotop';
import storeSchool from '../redux/Store/storeSchool';
import { IdProvider } from '../components/common/context/idContext';
import { AllDashIdProvider } from '../components/common/context/allDashIdContext';
import { UserRoleNameProvider } from '../components/common/context/userRoleContext';


function App() {
  const [MyclassName, setMyClass] = useState("");

  // const Bodyclickk = () => {
  //   if (localStorage.getItem("ynexverticalstyles") == "icontext") {
  //     setMyClass("");
  //   }
  //   if (window.innerWidth > 992) {
  //     let html = document.documentElement;
  //     if (html.getAttribute('icon-overlay') === 'open') {
  //         html.setAttribute('icon-overlay' ,"");
  //     }
  //   }
  // }



  useEffect(() => {
    import("preline");

  }, []);
  return (
    <Fragment>
      <Loader />
      <Provider store={store} >
        <HelmetProvider>
          <Helmet
            htmlAttributes={{
              lang: "en",
              dir: "ltr",
              "data-menu-styles": "dark",
              "class": "light",
              "data-nav-layout": "vertical",
              "data-header-styles": "light",
              "data-vertical-style": "overlay",
              "loader": "disable",
              "data-icon-text": MyclassName,
            }}
          />
          <Switcher />
              <IdProvider>
                <AllDashIdProvider>
                  <UserRoleNameProvider>
                <div className='page'>
                  <Header />
                  <Sidebar />
                  <div className='content main-index'>
                    <div className='main-content'
                    // onClick={Bodyclickk}
                    >
                      <Provider store={storeSchool}>
                        <Outlet />
                      </Provider>
                    </div>
                  </div>
                  <Footer />
                </div>
                </UserRoleNameProvider>
                </AllDashIdProvider>
                </IdProvider>
          <Tabtotop />
        </HelmetProvider>
      </Provider>
    </Fragment>
  );
}

export default App;
