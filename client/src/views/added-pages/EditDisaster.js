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
  CInvalidFeedback,
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
  CToaster,
  CToast,
  CToastHeader,
  CToastBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getCookieWithKey, USER_ACCESS_TOKEN_KEY, getBackEndHost, getFrontEndHost, isValidGeographicCoordinate, DISASTER_TYPES, getAdminPrivilegeErrorMessage,
  getAdminPrivilegeWarningMessage } from 'src/Utilities';


class EditDisaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

      isModalOpen: false,
      authorizationFailure: null, // error code for authorization failure encountered
      showToast: false,
    };
    this.backEndHost = getBackEndHost();
    this.frontEndHost = getFrontEndHost();
    this.disasterId = parseInt(this.props.location.search.substring(4));
    
    this.originalInformalName = "";
    this.originalOfficialName = "";
    this.originalDisasterType = "";
    this.originalIsOngoing = false;
    this.originalLatitude = "";
    this.originalLongitude = "";
  }

  componentDidMount() {
    fetch(`${this.backEndHost}/api/disasters/${this.disasterId}`)
    .then(response => response.json())
    .then(result => {
        this.setState({
          informalName: result.informal_name,
          officialName: result.official_name,
          disasterType: result.disaster_type.charAt(0).toUpperCase() + result.disaster_type.slice(1),
          isOngoing: result.is_ongoing,
          latitude: result.location[0].toString(),
          longitude: result.location[1].toString(),
        });

        this.originalInformalName = result.informal_name;
        this.originalOfficialName = result.official_name;
        this.originalDisasterType = result.disaster_type.charAt(0).toUpperCase() + result.disaster_type.slice(1);
        this.originalIsOngoing = result.is_ongoing;
        this.originalLatitude = result.location[0].toString();
        this.originalLongitude = result.location[1].toString();
    })
    .catch(e => {
        console.log("Error fetching disaster with id ", this.disasterId);
        console.log(e);
    });
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
    
    if (informalName == "") {
      isValidInformalName = false;
    }

    if (officialName == "") {
      isValidOfficialName = false;
    }

    if (disasterType == "Please select") {
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
      const rawBody = { id: this.disasterId };
      if (informalName.trim() != this.originalInformalName) {
        rawBody.informal_name = informalName.trim();
      }
      if (officialName.trim() != this.originalOfficialName) {
        rawBody.official_name = officialName.trim();
      }
      if (disasterType.trim() != this.originalDisasterType) {
        rawBody.disaster_type = disasterType.charAt(0).toLowerCase() + disasterType.slice(1);
      }
      if (isOngoing != this.originalIsOngoing) {
        rawBody.is_ongoing = isOngoing;
      }
      if (latitude != this.originalLatitude) {
        rawBody.location_latitude = latitude;
      }
      if (longitude != this.originalLongitude) {
        rawBody.location_longitude = longitude;
      }

      this.setState({
        showToast: false,
      });

      fetch(`${this.backEndHost}/api/disasters`,
        {
          method: 'PATCH',
          body: JSON.stringify(rawBody),
          contentType: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookieWithKey(USER_ACCESS_TOKEN_KEY),
          }
        }
      )
      .then(response => response.json())
      .then(result => {
        if (result.error == 401 && result.message == "authorization issue - 401 Unauthorized: " + 
          "The server could not verify that you are authorized to access the URL requested. You " + 
          "either supplied the wrong credentials (e.g. a bad password), or your browser doesn't " + 
          "understand how to supply the credentials required." && !result.success) {
          
          this.setState({
            isModalOpen: true,
            authorizationFailure: 401,
          });

        } else if (result.error == 403 && result.message == "authorization incorrect permission " + 
          "- 403 Forbidden: You don't have the permission to access the requested resource. It is " + 
          "either read-protected or not readable by the server." && !result.success) {
          
          this.setState({
            isModalOpen: true,
            authorizationFailure: 403,
          });
        } else {
          this.originalInformalName = result.informal_name;
          this.originalOfficialName = result.official_name;
          this.originalDisasterType = result.disaster_type.charAt(0).toUpperCase() + result.disaster_type.slice(1);
          this.originalIsOngoing = result.is_ongoing;
          this.originalLatitude = result.location[0].toString();
          this.originalLongitude = result.location[1].toString();

          if (!result.error) {
            this.setState({
              showToast: true,
            });
          }
        }
      })
      .catch(e => {
          console.log("Error fetching disaster with id ", this.disasterId);
          console.log(e);
      });
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
      informalName: this.originalInformalName,
      officialName: this.originalOfficialName,
      disasterType: this.originalDisasterType,
      isOngoing: this.originalIsOngoing,
      latitude: this.originalLatitude,
      longitude: this.originalLongitude,
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
    const {isValidInformalName, isValidOfficialName, isValidDisasterType, isValidLatitude, isValidLongitude, isModalOpen,
      authorizationFailure, informalName, showToast, disasterType, officialName, isOngoing, latitude,
      longitude} = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                <h4>Edit Disaster</h4>
                <div className="top-information-text">{getAdminPrivilegeWarningMessage("edit disaster listings")}</div>
              </CCardHeader>
              <CCardBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Informal Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidInformalName && <CInput id="text-input" name="text-input" placeholder="Text" value={informalName} onChange={this.onInformalNameChange.bind(this)}/>}
                      {!isValidInformalName && <CInput id="text-input" invalid name="text-input" placeholder="Text" value={informalName} onChange={this.onInformalNameChange.bind(this)}/>}
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
                      <CLabel htmlFor="latitude-input">Latitude</CLabel>
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
                      <CLabel htmlFor="longitude-input">Longitude</CLabel>
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
            <CModalTitle>Failure To Edit Disaster Listing</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {getAdminPrivilegeErrorMessage("edit disaster listings", authorizationFailure)}
          </CModalBody>
          <CModalFooter>
            {/* <CButton onClick={this.onConfirmedDelete.bind(this)} color="primary">Yes, delete it</CButton>{' '} */}
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
              Disaster Listing Updated
            </CToastHeader>
            <CToastBody>
              {`The disaster listing for ${informalName} has been updated successfully!`}
            </CToastBody>
          </CToast>
        </CToaster>
      </>
    );
  }
}

export default EditDisaster;