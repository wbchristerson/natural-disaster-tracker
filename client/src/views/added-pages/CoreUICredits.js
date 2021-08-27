import React, { lazy } from 'react'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CForm,
  CInput,
  CPagination,
  CListGroup,
  CListGroupItem,
  CFormGroup,
  CLabel,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class CoreUICredits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <>
        
        <h1>Thank you to <a target="_blank" href="https://coreui.io/">Core UI</a>!</h1>
        <h4 className="credits-sub-text">
            Many of the components used in this project are either directly taken from or based upon those provided by Core UI. If you are interested in accessing 
            its free collection of React components, feel free to check out the <a href="https://coreui.io/react/" target="_blank">site's offerngs</a>. 
        </h4>
      </>
    )
  }
}

export default CoreUICredits