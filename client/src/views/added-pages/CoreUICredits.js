import React from 'react'

class CoreUICredits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <>
        <h1 className="credits-header">Thank you to <a target="_blank" rel="noreferrer" href="https://coreui.io/">Core UI</a>, <a 
          target="_blank" rel="noreferrer" href="https://auth0.com/">Auth0</a>, <a target="_blank" rel="noreferrer"
          href="https://pixabay.com/">Pixabay</a>, and <a target="_blank" rel="noreferrer" href="https://unsplash.com/">Unsplash</a>!</h1>
        <h4 className="credits-sub-text">
          Many of the components used in this project are either directly taken from or based upon those provided by Core UI. If you are interested in accessing 
          its free collection of React components, feel free to check out the <a href="https://coreui.io/react/" rel="noreferrer" target="_blank">site's offerings</a>. 
        </h4>
        <h4 className="credits-sub-text">
          The authorization workflow for log in used the service provided by Auth0. For details about incorporating the Auth0 log-in/sign-up workflow into a 
          project using Flask SQL Alchemy, see <a target="_blank" rel="noreferrer" href="https://auth0.com/docs/quickstart/backend/python/01-authorization">here 
          for details</a>.
        </h4>
        <h4 className="credits-sub-text">
          All of the images used in the landing page section and the sample witness reports that I created were from either Pixabay or Unsplash. Thank 
          you to both sites for providing freely available and incredible images.
        </h4>
      </>
    )
  }
}

export default CoreUICredits
