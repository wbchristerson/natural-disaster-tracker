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
  CTextarea,
  CInput,
  CLabel,
  CRow,
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
import { getCookieWithKey, USER_ACCESS_TOKEN_KEY, getBackEndHost, getFrontEndHost, isValidGeographicCoordinate, getLocalTimeFromGMTDateTime,
  getLocalDateFromGMTDateTime, isValidTime, isValidNonnegativeIntegerInRange, isValidNonnegativeInteger, isValidImageURL, getGeneralTimeFormat,
  getSignInRequirementWarningMessage, getSignInRequirementsErrorMessage } from 'src/Utilities';


class EditWitnessReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportDate: "",
      reportTime: "",
      reportSeverity: "",
      reportImageURL: "",
      reportComment: "",
      reportPeopleAffected: "",
      reportLatitude: "",
      reportLongitude: "",

      isValidReportDate: true,
      isValidReportTime: true,
      isValidReportSeverity: true,
      isValidReportImageURL: true,
      isValidReportPeopleAffected: true,
      isValidReportLatitude: true,
      isValidReportLongitude: true,

      isModalOpen: false,
      showToast: false,
    };
    this.backEndHost = getBackEndHost();
    this.frontEndHost = getFrontEndHost();
    this.witnessReportId = parseInt(this.props.location.search.substring(4));
    this.disasterId = "";
    this.observerId = "";
    
    this.originalReportDate = "";
    this.originalReportTime = "";
    this.originalReportSeverity = "";
    this.originalReportImageURL = "";
    this.originalReportComment = "";
    this.originalReportPeopleAffected = "";
    this.originalReportLatitude = "";
    this.originalReportLongitude = "";
  }

  componentDidMount() {
    fetch(`${this.backEndHost}/api/witnessreports/${this.witnessReportId}`)
    .then(response => response.json())
    .then(result => {
        this.disasterId = result.disaster_id;
        this.observerId = result.observer_id;
        this.setState({
          reportDate: getLocalDateFromGMTDateTime(result.event_datetime),
          reportTime: getLocalTimeFromGMTDateTime(result.event_datetime),
          reportSeverity: result.severity ? result.severity.toString() : "",
          reportImageURL: result.image_url ? result.image_url : "",
          reportComment: result.comment ? result.comment : "",
          reportPeopleAffected: result.people_affected.toString(),
          reportLatitude: result.location[0].toString(),
          reportLongitude: result.location[1].toString(),
        });

        this.originalReportDate = getLocalDateFromGMTDateTime(result.event_datetime);
        this.originalReportTime = getLocalTimeFromGMTDateTime(result.event_datetime);
        this.originalReportSeverity = result.severity ? result.severity.toString() : "";
        this.originalReportImageURL = result.image_url ? result.image_url : "";
        this.originalReportComment = result.comment ? result.comment : "";
        this.originalReportPeopleAffected = result.people_affected.toString();
        this.originalReportLatitude = result.location[0].toString();
        this.originalReportLongitude = result.location[1].toString();
    })
    .catch(e => {
        console.log("Error fetching disaster with id ", this.disasterId);
        console.log(e);
    });
  }

  onReportDateChange(evt) {
    this.setState({
      reportDate: evt.target.value,
    });
  }

  onReportTimeChange(evt) {
    this.setState({
      reportTime: evt.target.value,
    });
  }

  onReportPeopleAffectedChange(evt) {
    this.setState({
      reportPeopleAffected: evt.target.value,
    });
  }

  onReportLatitudeChange(evt) {
    this.setState({
      reportLatitude: evt.target.value,
    });
  }

  onReportLongitudeChange(evt) {
    this.setState({
      reportLongitude: evt.target.value,
    });
  }

  onReportSeverityChange(evt) {
    this.setState({
      reportSeverity: evt.target.value,
    });
  }

  onReportImageURLChange(evt) {
    this.setState({
      reportImageURL: evt.target.value,
    });
  }

  onReportCommentChange(evt) {
    this.setState({
      reportComment: evt.target.value,
    });
  }

  onSubmit() {
    let
      isValidReportDate = true,
      isValidReportTime = true,
      isValidReportSeverity = true,
      isValidReportImageURL = true,
      isValidReportPeopleAffected = true,
      isValidReportLatitude = true,
      isValidReportLongitude = true;


    const {reportDate, reportTime, reportSeverity, reportImageURL, reportComment, reportPeopleAffected,
      reportLatitude, reportLongitude} = this.state;
    
    if (reportDate == "") {
      isValidReportDate = false;
    }

    if (!isValidTime(reportTime)) {
      isValidReportTime = false;
    }

    if (reportSeverity != "" && !isValidNonnegativeIntegerInRange(reportSeverity, 0, 10)) {
      isValidReportSeverity = false;
    }

    if (reportImageURL != "" && !isValidImageURL(reportImageURL)) {
      isValidReportImageURL = false;
    }

    if (!isValidNonnegativeInteger(reportPeopleAffected)) {
      isValidReportPeopleAffected = false;
    }

    if (!isValidGeographicCoordinate(reportLatitude)) {
      isValidReportLatitude = false;
    }

    if (!isValidGeographicCoordinate(reportLongitude)) {
      isValidReportLongitude = false;
    }

    if (isValidReportDate && isValidReportTime && isValidReportSeverity && isValidReportImageURL && 
      isValidReportPeopleAffected && isValidReportLatitude && isValidReportLongitude) {

      const rawBody = { id: this.witnessReportId };
      if (reportDate != this.originalReportDate || reportTime.trim() != this.originalReportTime.trim()) {
        rawBody.event_datetime = new Date(reportDate + "T" + getGeneralTimeFormat(reportTime));
      }
      if (reportSeverity.trim() != this.originalReportSeverity.trim()) {
        rawBody.severity = parseInt(reportSeverity.trim());
      }
      if (reportImageURL.trim() != this.originalReportImageURL.trim()) {
        rawBody.image_url = reportImageURL.trim();
      }
      if (reportComment.trim() != this.originalReportComment.trim()) {
        rawBody.comment = reportComment.trim();
      }
      if (reportPeopleAffected.trim() != this.originalReportPeopleAffected.trim()) {
        rawBody.people_affected = parseInt(reportPeopleAffected.trim());
      }
      if (reportLatitude.trim() != this.originalReportLatitude.trim()) {
        rawBody.location_latitude = parseFloat(reportLatitude.trim());
      }
      if (reportLongitude.trim() != this.originalReportLongitude.trim()) {
        rawBody.location_longitude = parseFloat(reportLongitude.trim());
      }

      this.setState({
        showToast: false,
      });

      fetch(`${this.backEndHost}/api/witnessreports`,
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
          });
        } else {
          this.originalReportDate = getLocalDateFromGMTDateTime(result.event_datetime);
          this.originalReportTime = getLocalTimeFromGMTDateTime(result.event_datetime);
          this.originalReportSeverity = result.severity ? result.severity.toString() : "";
          this.originalReportImageURL = result.image_url ? result.image_url : "";
          this.originalReportComment = result.comment ? result.comment : "";
          this.originalReportPeopleAffected = result.people_affected.toString();
          this.originalReportLatitude = result.location[0].toString();
          this.originalReportLongitude = result.location[1].toString();
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
      isValidReportDate,
      isValidReportTime,
      isValidReportSeverity,
      isValidReportImageURL,
      isValidReportPeopleAffected,
      isValidReportLatitude,
      isValidReportLongitude,
    });
  }

  resetDisasterForm() {
    this.setState({
      reportDate: this.originalReportDate,
      reportTime: this.originalReportTime,
      reportSeverity: this.originalReportSeverity,
      reportImageURL: this.originalReportImageURL,
      reportComment: this.originalReportComment,
      reportPeopleAffected: this.originalReportPeopleAffected,
      reportLatitude: this.originalReportLatitude,
      reportLongitude: this.originalReportLongitude,

      isValidReportDate: true,
      isValidReportTime: true,
      isValidReportSeverity: true,
      isValidReportImageURL: true,
      isValidReportPeopleAffected: true,
      isValidReportLatitude: true,
      isValidReportLongitude: true,
    });
  }

  onModalClose() {
    this.setState({
      isModalOpen: false,
    });
  }

  render() {
    const {reportDate, isValidReportDate, reportTime, isValidReportTime, reportPeopleAffected, isValidReportPeopleAffected,
      reportLatitude, isValidReportLatitude, reportLongitude, isValidReportLongitude, reportSeverity, isValidReportSeverity,
      reportImageURL, isValidReportImageURL, reportComment, isModalOpen, showToast} = this.state;
    const userAccessToken = getCookieWithKey(USER_ACCESS_TOKEN_KEY);
    const isLoggedOut = !userAccessToken || userAccessToken == "";

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                <h4>Edit Witness Report</h4>
                {isLoggedOut && <div className="top-information-text">{getSignInRequirementWarningMessage("edit witness reports")}</div>}
              </CCardHeader>
              <CCardBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="good-date-input">Date Witnessed</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportDate && <CInput type="date" id="good-date-input" name="good-date-input" placeholder="date" value={reportDate} onChange={this.onReportDateChange.bind(this)}/>}
                      {!isValidReportDate && <CInput type="date" id="bad-date-input" invalid name="bad-date-input" placeholder="date" value={reportDate} onChange={this.onReportDateChange.bind(this)}/>}
                      <CInvalidFeedback>Date provided is blank</CInvalidFeedback>
                      <CFormText>Date of the report</CFormText>
                    </CCol>
                  </CFormGroup>
                  
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="time-input">Time Witnessed</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportTime && <CInput id="good-time-input" name="good-time-input" placeholder="Text" value={reportTime} onChange={this.onReportTimeChange.bind(this)}/>}
                      {!isValidReportTime && <CInput id="bad-time-input" invalid name="bad-time-input" placeholder="Text" value={reportTime} onChange={this.onReportTimeChange.bind(this)}/>}
                      <CInvalidFeedback>Time provided is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Time of the report</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="people-affected-input">Number Of People Affected</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportPeopleAffected && <CInput id="people-affected-input" name="people-affected-input" placeholder="Text" value={reportPeopleAffected} onChange={this.onReportPeopleAffectedChange.bind(this)}/>}
                      {!isValidReportPeopleAffected && <CInput id="people-affected-input" invalid name="people-affected-input" placeholder="Text" value={reportPeopleAffected} onChange={this.onReportPeopleAffectedChange.bind(this)}/>}
                      <CInvalidFeedback>Number of people affected is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Estimate of number of people affected</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="latitude-text-input">Location Latitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportLatitude && <CInput id="latitude-text-input" name="latitude-text-input" placeholder="0.00" onChange={this.onReportLatitudeChange.bind(this)} value={reportLatitude} />}
                      {!isValidReportLatitude && <CInput invalid id="latitude-text-input" name="latitude-text-input" placeholder="0.00" onChange={this.onReportLatitudeChange.bind(this)} value={reportLatitude} />}
                      <CInvalidFeedback>Location latitude is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Signed latitude of disaster</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="longitude-text-input">Location Longitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportLongitude && <CInput id="longitude-text-input" name="longitude-text-input" placeholder="0.00" onChange={this.onReportLongitudeChange.bind(this)} value={reportLongitude}/>}
                      {!isValidReportLongitude && <CInput invalid id="longitude-text-input" name="longitude-text-input" placeholder="0.00" onChange={this.onReportLongitudeChange.bind(this)} value={reportLongitude}/>}
                      <CInvalidFeedback>Location longitude is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Signed longitude of disaster</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="severity-text-input">Severity (optional)</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportSeverity && <CInput id="severity-text-input" name="severity-text-input" placeholder="0" onChange={this.onReportSeverityChange.bind(this)} value={reportSeverity}/>}
                      {!isValidReportSeverity && <CInput invalid id="severity-text-input" name="severity-text-input" placeholder="0" onChange={this.onReportSeverityChange.bind(this)} value={reportSeverity}/>}
                      <CInvalidFeedback>Format of severity is not recognized or out of range</CInvalidFeedback>
                      <CFormText>Severity of disaster on a scale of 0 to 10, integral values only</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="image-url-text-input">Image URL (optional)</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportImageURL && <CInput id="image-url-text-input" name="image-url-text-input" placeholder="Text" onChange={this.onReportImageURLChange.bind(this)} value={reportImageURL}/>}
                      {!isValidReportImageURL && <CInput invalid id="image-url-text-input" name="image-url-text-input" placeholder="Text" onChange={this.onReportImageURLChange.bind(this)} value={reportImageURL}/>}
                      <CInvalidFeedback>Format of image URL is not recognized</CInvalidFeedback>
                      <CFormText>Image of disaster (must be hosted on Internet already)</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Comment (optional)</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea 
                        name="textarea-input" 
                        id="textarea-input" 
                        rows="9"
                        placeholder="Content..."
                        onChange={this.onReportCommentChange.bind(this)}
                        value={reportComment}
                      />
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
            <CModalTitle>Failure To Edit Witness Report</CModalTitle>
          </CModalHeader>
          <CModalBody>
            {getSignInRequirementsErrorMessage("edit witness reports")}
          </CModalBody>
          <CModalFooter>
            <CButton 
              color="secondary" 
              onClick={this.onModalClose.bind(this)}
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
              Witness Report Updated
            </CToastHeader>
            <CToastBody>
              {`The witness report has been updated successfully!`}
            </CToastBody>
          </CToast>
        </CToaster>
      </>
    );
  }
}

export default EditWitnessReport;