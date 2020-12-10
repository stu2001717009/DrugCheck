import React from 'react';
import { useHistory } from "react-router";

const HomeComponent = (props) => {
    const history = useHistory();

    const goTo = (route) => {
        history.push({ pathname: route });
    }

    return <div className="home-container">
        <div className="section check-interactions">
            CHECK INTERACTIONS
        </div>
        <div className="section">
            <div className="medicine-section" onClick={() => goTo('/medicines')}>
                MEDICINES
            </div>
            <div className="active-ingredients-section">
                ACTIVE INGREDIENTS
            </div>
        </div>
    </div>
}

export default HomeComponent;