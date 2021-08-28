import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CInvalidFeedback,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getCookieWithKey, USER_ACCESS_TOKEN_KEY, getBackEndHost, getFrontEndHost, DISASTER_TYPES, getAdminPrivilegeErrorMessage, 
  getAdminPrivilegeWarningMessage, isValidGeographicCoordinate } from 'src/Utilities';


class AddDisaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      informalName: "",
      officialName: "",
      disasterType: DISASTER_TYPES[0],
      isOngoing: false,
      latitude: "",
      longitude: "",

      isValidInformalName: true,
      isValidOfficialName: true,
      isValidDisasterType: true,
      isValidLatitude: true,
      isValidLongitude: true,
      
      isModalOpen: false,
      authorizationFailure: null, // an error code, either 401, 403, or null
      showToast: false,
    };
    this.backEndHost = getBackEndHost();
    this.frontEndHost = getFrontEndHost();
  }

  onInformalNameChange(evt) {
    this.setState({ informalName: evt.target.value });
  }

  onOfficialNameChange(evt) {
    this.setState({ officialName: evt.target.value });
  }

  onDisasterTypeChange(evt) {
    this.setState({ disasterType: evt.target.value });
  }

  onIsOngoingChange(evt) {
    this.setState({ isOngoing: !this.state.isOngoing });
  }

  onLatitudeChange(evt) {
    this.setState({ latitude: evt.target.value });
  }

  onLongitudeChange(evt) {
    this.setState({ longitude: evt.target.value });
  }

  onSubmit() {
    let
      isValidInformalName = true,
      isValidOfficialName = true,
      isValidDisasterType = true,
      isValidLatitude = true,
      isValidLongitude = true;

    const {informalName, officialName, disasterType, isOngoing, latitude,
      longitude} = this.state;

    if (informalName === "") {
      isValidInformalName = false;
    }

    if (officialName === "") {
      isValidOfficialName = false;
    }

    if (disasterType === "Please select") {
      isValidDisasterType = false;
    }

    if (!isValidGeographicCoordinate(latitude)) {
      isValidLatitude = false;
    }

    if (!isValidGeographicCoordinate(longitude)) {
      isValidLongitude = false;
    }

    if (isValidInformalName && isValidOfficialName && isValidDisasterType &&
      isValidLatitude && isValidLongitude) {

      this.setState({
        showToast: false,
      });
      
      fetch(`${this.backEndHost}/api/disasters`,
        {
          method: 'POST',
          body: JSON.stringify({
            informal_name: informalName,
            official_name: officialName,
            disaster_type: disasterType,
            is_ongoing: isOngoing,
            location_latitude: latitude,
            location_longitude: longitude,
          }),
          contentType: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookieWithKey(USER_ACCESS_TOKEN_KEY),
          }
        }
      )
      .then(data => {
        if ((data.status === 401 && data.statusText === "UNAUTHORIZED") || (data.status === 403 && data.statusText === "FORBIDDEN")) {
          this.setState({
            isModalOpen: true,
            authorizationFailure: data.status,
          });
        } else if (data.status === 200) {
          this.setState({
            showToast: true,
          });
        }
      })
      .catch(error => console.log("error!!!: ", error)); 
    }

    this.setState({
      isValidInformalName,
      isValidOfficialName,
      isValidDisasterType,
      isValidLatitude,
      isValidLongitude,
    });
  }


  resetDisasterForm() {
    this.setState({
      informalName: "",
      officialName: "",
      disasterType: "",
      isOngoing: false,
      latitude: "",
      longitude: "",

      isValidInformalName: true,
      isValidOfficialName: true,
      isValidDisasterType: true,
      isValidLatitude: true,
      isValidLongitude: true,
    });
  }


  onModalClose() {
    this.setState({
      isModalOpen: false,
      authorizationFailure: null,
    });
  }


  render() {
    const {isModalOpen, authorizationFailure, showToast, informalName,
      isValidInformalName, isValidOfficialName, isValidDisasterType,
      isValidLatitude, isValidLongitude, isOngoing, disasterType, officialName, latitude, longitude} = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                <h4>Add Disaster Listing</h4>
                <div className="top-information-text">{getAdminPrivilegeWarningMessage("add disaster listings")}</div>
              </CCardHeader>
              <CCardBody>
                
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="informal-name-input">Informal Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidInformalName && <CInput id="informal-name-input" name="informal-name-input" placeholder="Text" value={informalName} onChange={this.onInformalNameChange.bind(this)}/>}
                      {!isValidInformalName && <CInput id="informal-name-input" invalid name="informal-name-input" placeholder="Text" value={informalName} onChange={this.onInformalNameChange.bind(this)}/>}
                      <CInvalidFeedback>Informal name is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>The colloquial name of the disaster</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="official-name-input">Official Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidOfficialName && <CInput id="official-name-input" name="official-name-input" placeholder="Text" value={officialName} onChange={this.onOfficialNameChange.bind(this)}/>}
                      {!isValidOfficialName && <CInput id="official-name-input" invalid name="official-name-input" placeholder="Text" value={officialName} onChange={this.onOfficialNameChange.bind(this)}/>}
                      <CInvalidFeedback>Official name is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>The identifying name of the disaster</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Disaster Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidDisasterType &&
                        <CSelect custom name="select" id="select" value={disasterType} onChange={this.onDisasterTypeChange.bind(this)}>
                          {DISASTER_TYPES.map(disaster => <option key={disaster} value={disaster}>{disaster}</option>)}
                        </CSelect>
                      }
                      {!isValidDisasterType &&
                        <CSelect invalid custom name="select" id="select" value={disasterType} onChange={this.onDisasterTypeChange.bind(this)}>
                          {DISASTER_TYPES.map(disaster => <option key={disaster} value={disaster}>{disaster}</option>)}
                        </CSelect>
                      }
                      <CInvalidFeedback>No disaster type is selected</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol tag="label" sm="3" className="col-form-label">
                      Disaster Ongoing
                    </CCol>
                    <CCol sm="1">
                      <CSwitch
                        id="add-disaster-ongoing-switch"
                        className="mr-1"
                        color="danger"
                        // defaultChecked
                        shape="pill"
                        checked={isOngoing}
                        onChange={this.onIsOngoingChange.bind(this)}
                      />
                    </CCol>
                    <CCol sm="3">
                      <CLabel htmlFor="add-disaster-ongoing-switch">{isOngoing ? "Yes" : "No"}</CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Latitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                    {isValidLatitude && <CInput id="latitude-input" name="latitude-input" placeholder="Disaster Latitude" value={latitude} onChange={this.onLatitudeChange.bind(this)}/>}
                      {!isValidLatitude && <CInput invalid id="latitude-input" name="latitude-input" placeholder="Disaster Latitude" value={latitude} onChange={this.onLatitudeChange.bind(this)}/>}
                      <CInvalidFeedback>Provided latitude is blank or format is not recognized</CInvalidFeedback>
                      <CFormText className="help-block">The latitude of the disaster</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Longitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidLongitude && <CInput name="longitude-input" placeholder="Disaster Latitude" value={longitude} onChange={this.onLongitudeChange.bind(this)}/>}
                      {!isValidLongitude && <CInput invalid id="longitude-input" name="longitude-input" placeholder="Disaster Latitude" value={longitude} onChange={this.onLongitudeChange.bind(this)}/>}
                      <CInvalidFeedback>Provided longitude is blank or format is not recognized</CInvalidFeedback>
                      <CFormText className="help-block">The longitude of the disaster</CFormText>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton type="submit" size="sm" color="primary" onClick={this.onSubmit.bind(this)}><CIcon name="cil-scrubber" /> Submit</CButton>
                <CButton type="reset" size="sm" color="danger" onClick={this.resetDisasterForm.bind(this)}><CIcon name="cil-ban" /> Reset</CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
        <CModal show={isModalOpen} onClose={this.onModalClose.bind(this)}>
          <CModalHeader closeButton>
            <CModalTitle>Failure To Create Disaster Listing</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {getAdminPrivilegeErrorMessage("add disaster listings", authorizationFailure)}
          </CModalBody>
          <CModalFooter>
            <CButton 
              color="secondary" 
              onClick={() => this.onModalClose()}
            >OK</CButton>
          </CModalFooter>
        </CModal>
        
        <CToaster
          position={'top-center'}
          key={'toaster-top-center'}
        >
          <CToast
            key={'toast'}
            show={showToast}
            autohide={5000}
            fade={true}
          >
            <CToastHeader closeButton={true}>
              Disaster Listing Added
            </CToastHeader>
            <CToastBody>
              {`The disaster listing for ${informalName} has been added successfully!`}
            </CToastBody>
          </CToast>
        </CToaster>
      </>
    );
  }
}

export default AddDisaster;