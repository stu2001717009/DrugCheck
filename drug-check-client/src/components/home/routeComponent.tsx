import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import HomeComponent from './homeComponent';
import MedicineComponent from '../medicine/medicineContainer';

interface IProps {
}

interface IState {
}

const PageNotFound = () => {

    return (
        <div className="page-not-found-container">
            <div className="page-not-found-text">
                <h2 className="page-not-found-text-color">
                    Page not found.
                </h2>
                <p className="page-not-found-text-color">
                    The page you are looking for doesn't exist. <br />
                   Go back, or go to the <a href="/" className="a-not-visited" >Home page</a>
                </p>
            </div>
        </div>
    )
};

class Routes extends React.Component<IProps, IState> {

  public render() {

    return (
      <>
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/medicines" component={MedicineComponent} />
          <Route component={PageNotFound} />
        </Switch>
      </>

    )
  }
}


export default Routes;