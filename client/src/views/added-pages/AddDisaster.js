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
  CModalFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getCookieWithKey, USER_ACCESS_TOKEN_KEY, getBackEndHost, getFrontEndHost, DISASTER_TYPES, getAdminPrivilegeErrorMessage, getAdminPrivilegeWarningMessage } from 'src/Utilities';
import { nominalTypeHack } from 'prop-types';


class AddDisaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      informalName: "",
      officialName: "",
      disasterType: "",
      isOngoing: false,
      latitude: "",
      longitude: "",

      isModalOpen: false,
      authorizationFailure: null, // an error code, either 401, 403, or null
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
    const latitudeRegExp = /^-?\d*\.?\d*$/;
    if (latitudeRegExp.test(evt.target.value) && parseFloat(evt.target.value) >= -180.0 && parseFloat(evt.target.value) <= 180.0) {
      this.setState({ latitude: evt.target.value });
    } else if (evt.target.value == "") {
      this.setState({ latitude: "" });
    } else if (evt.target.value == "-") {
      this.setState({ latitude: "-" });
    }
  }

  onLongitudeChange(evt) {
    const longitudeRegExp = /^-?\d*\.?\d*$/;
    if (longitudeRegExp.test(evt.target.value) && parseFloat(evt.target.value) >= -180.0 && parseFloat(evt.target.value) <= 180.0) {
      this.setState({ longitude: evt.target.value });
    } else if (evt.target.value == "") {
      this.setState({ longitude: "" });
    } else if (evt.target.value == "-") {
      this.setState({ longitude: "-" });
    }
  }

  onSubmit() {
    fetch(`${this.backEndHost}/api/disasters`,
      {
        method: 'POST',
        body: JSON.stringify({
          informal_name: this.state.informalName,
          official_name: this.state.officialName,
          disaster_type: this.state.disasterType,
          is_ongoing: this.state.isOngoing,
          location_latitude: this.state.latitude,
          location_longitude: this.state.longitude,
        }),
        contentType: 'application/json',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + getCookieWithKey(USER_ACCESS_TOKEN_KEY),
        }
      }
    )
    .then(data => {
      if ((data.status == 401 && data.statusText == "UNAUTHORIZED") || (data.status == 403 && data.statusText == "FORBIDDEN")) {
        this.setState({
          isModalOpen: true,
          authorizationFailure: data.status,
        });
      }
      console.log(data);
    })
    .catch(error => console.log("error!!!: ", error));
  }

  resetDisasterForm() {
    this.setState({
      informalName: "",
      officialName: "",
      disasterType: "",
      isOngoing: false,
      latitude: "",
      longitude: "",
    });
  }

  onModalClose() {
    this.setState({
      isModalOpen: false,
      authorizationFailure: null,
    });
  }

  render() {
    const {isModalOpen, authorizationFailure} = this.state;
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
                      <CLabel htmlFor="text-input">Informal Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Text" value={this.state.informalName} onChange={this.onInformalNameChange.bind(this)}/>
                      <CFormText>The colloquial name of the disaster</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Official Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput id="text-input" name="text-input" placeholder="Text" value={this.state.officialName} onChange={this.onOfficialNameChange.bind(this)}/>
                      <CFormText>The identifying name of the disaster</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Disaster Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect custom name="select" id="select" value={this.state.disasterType} onChange={this.onDisasterTypeChange.bind(this)}>
                        {DISASTER_TYPES.map(disaster => <option key={disaster} value={disaster}>{disaster}</option>)}
                      </CSelect>
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
                        checked={this.state.isOngoing}
                        onChange={this.onIsOngoingChange.bind(this)}
                      />
                    </CCol>
                    <CCol sm="3">
                      <CLabel htmlFor="add-disaster-ongoing-switch">{this.state.isOngoing ? "Yes" : "No"}</CLabel>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Latitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="email" id="email-input" name="email-input" placeholder="Disaster Latitude" value={this.state.latitude} onChange={this.onLatitudeChange.bind(this)}/>
                      <CFormText className="help-block">The latitude of the disaster</CFormText>
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Longitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput type="email" id="email-input" name="email-input" placeholder="Disaster Latitude" value={this.state.longitude} onChange={this.onLongitudeChange.bind(this)}/>
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
      </>
    );
  }
}

export default AddDisaster;