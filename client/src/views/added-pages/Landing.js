import React from 'react';
import chevron from '../../assets/images/chevron.png';
import {Link} from 'react-scroll'

class Landing extends React.Component {
    constructor(props) {
        super(props);
        const d = new Date();
        this.recordedSeconds = d.getSeconds();
    }

    render() {
        return (
            <div className={`my-test main-image-${this.recordedSeconds % 9 + 1}`}>
                <div className="card-overlay">
                    <h1 className="display-3 main-top-text">Disaster Reporter</h1>
                    <p className="main-bottom-text">See and Write Reports about Natural Disasters Near You</p>
                    <Link  to="display-section" spy={true} smooth={true}>
                        <img className="chevron" src={chevron} alt="chevron!!!!!!"/>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Landing
