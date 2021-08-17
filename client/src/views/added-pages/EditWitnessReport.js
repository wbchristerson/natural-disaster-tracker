import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import { getCookieWithKey, USER_ACCESS_TOKEN_KEY, getBackEndHost, getFrontEndHost, isValidGeographicCoordinate, DISASTER_TYPES, getLocalTimeFromGMTDateTime, getLocalDateFromGMTDateTime } from 'src/Utilities';


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
      isValidSeverity: true,
      isValidImageURL: true,
      isValidPeopleAffected: true,
      isValidLatitude: true,
      isValidLongitude: true,
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
      isValidSeverity = true,
      isValidImageURL = true,
      isValidPeopleAffected = true,
      isValidLatitude = true,
      isValidLongitude = true;


    const {reportDate, reportTime, reportSeverity, reportImageURL, reportComment, reportPeopleAffected,
      reportLatitude, reportLongitude} = this.state;
    
    // if (informalName == "") {
    //   isValidInformalName = false;
    // }

    // if (officialName == "") {
    //   isValidOfficialName = false;
    // }

    // if (disasterType == "Please select") {
    //   isValidDisasterType = false;
    // }

    // if (!isValidGeographicCoordinate(latitude)) {
    //   isValidLatitude = false;
    // }

    // if (!isValidGeographicCoordinate(longitude)) {
    //   isValidLongitude = false;
    // }

    // if (isValidInformalName && isValidOfficialName && isValidDisasterType && isValidLatitude && isValidLongitude) {
    //   const rawBody = { id: this.disasterId };
    //   if (informalName.trim() != this.originalInformalName) {
    //     rawBody.informal_name = informalName.trim();
    //   }
    //   if (officialName.trim() != this.originalOfficialName) {
    //     rawBody.official_name = officialName.trim();
    //   }
    //   if (disasterType.trim() != this.originalDisasterType) {
    //     rawBody.disaster_type = disasterType.charAt(0).toLowerCase() + disasterType.slice(1);
    //   }
    //   if (isOngoing != this.originalIsOngoing) {
    //     rawBody.is_ongoing = isOngoing;
    //   }
    //   if (latitude != this.originalLatitude) {
    //     rawBody.location_latitude = latitude;
    //   }
    //   if (longitude != this.originalLongitude) {
    //     rawBody.location_longitude = longitude;
    //   }

    //   fetch(`${this.backEndHost}/api/disasters`,
    //     {
    //       method: 'PATCH',
    //       body: JSON.stringify(rawBody),
    //       contentType: 'application/json',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + getCookieWithKey(USER_ACCESS_TOKEN_KEY),
    //       }
    //     }
    //   )
    //   .then(response => response.json())
    //   .then(result => {
    //     console.log(result);
    //     this.originalInformalName = result.informal_name;
    //     this.originalOfficialName = result.official_name;
    //     this.originalDisasterType = result.disaster_type.charAt(0).toUpperCase() + result.disaster_type.slice(1);
    //     this.originalIsOngoing = result.is_ongoing;
    //     this.originalLatitude = result.location[0].toString();
    //     this.originalLongitude = result.location[1].toString();
    //   })
    //   .catch(e => {
    //       console.log("Error fetching disaster with id ", this.disasterId);
    //       console.log(e);
    //   });
    // }

    // this.setState({
    //   isValidInformalName,
    //   isValidOfficialName,
    //   isValidDisasterType,
    //   isValidLatitude,
    //   isValidLongitude,
    // });
  }

  resetDisasterForm() {
    this.setState({
      // informalName: this.originalInformalName,
      // officialName: this.originalOfficialName,
      // disasterType: this.originalDisasterType,
      // isOngoing: this.originalIsOngoing,
      // latitude: this.originalLatitude,
      // longitude: this.originalLongitude,
      // isValidInformalName: true,
      // isValidOfficialName: true,
      // isValidDisasterType: true,
      // isValidLatitude: true,
      // isValidLongitude: true,
    });
  }

  render() {
    const {reportDate, isValidReportDate, reportTime, isValidReportTime, reportPeopleAffected, isValidPeopleAffected, reportLatitude,
      isValidLatitude, reportLongitude, isValidLongitude, reportSeverity, isValidSeverity, reportImageURL, isValidImageURL,
      reportComment} = this.state;
    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>
                Basic Form
                <small> Elements</small>
              </CCardHeader>
              <CCardBody>
                <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="good-date-input">Date Witnessed</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportDate && <CInput id="good-date-input" name="good-date-input" placeholder="Text" value={reportDate} onChange={this.onReportDateChange.bind(this)}/>}
                      {!isValidReportDate && <CInput id="bad-date-input" invalid name="bad-date-input" placeholder="Text" value={reportDate} onChange={this.onReportDateChange.bind(this)}/>}
                      <CInvalidFeedback>Date provided is blank</CInvalidFeedback>
                      <CFormText>Date of the report</CFormText>
                    </CCol>
                  </CFormGroup>
                  
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="time-input">Time Witnessed</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidReportTime && <CInput id="time-input" name="time-input" placeholder="Text" value={reportTime} onChange={this.onReportTimeChange.bind(this)}/>}
                      {!isValidReportTime && <CInput id="time-input" invalid name="time-input" placeholder="Text" value={reportTime} onChange={this.onReportTimeChange.bind(this)}/>}
                      <CInvalidFeedback>Time provided is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Time of the report</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="people-affected-input">Number Of People Affected</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidPeopleAffected && <CInput id="people-affected-input" name="people-affected-input" placeholder="Text" value={reportPeopleAffected} onChange={this.onReportPeopleAffectedChange.bind(this)}/>}
                      {!isValidPeopleAffected && <CInput id="people-affected-input" invalid name="people-affected-input" placeholder="Text" value={reportPeopleAffected} onChange={this.onReportPeopleAffectedChange.bind(this)}/>}
                      <CInvalidFeedback>Number of people affected is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Estimate of number of people affected</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="latitude-text-input">Location Latitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidLatitude && <CInput id="latitude-text-input" name="latitude-text-input" placeholder="0.00" onChange={this.onReportLatitudeChange.bind(this)} value={reportLatitude} />}
                      {!isValidLatitude && <CInput invalid id="latitude-text-input" name="latitude-text-input" placeholder="0.00" onChange={this.onReportLatitudeChange.bind(this)} value={reportLatitude} />}
                      <CInvalidFeedback>Location latitude is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Signed latitude of disaster</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="longitude-text-input">Location Longitude</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidLongitude && <CInput id="longitude-text-input" name="longitude-text-input" placeholder="0.00" onChange={this.onReportLongitudeChange.bind(this)} value={reportLongitude}/>}
                      {!isValidLongitude && <CInput invalid id="longitude-text-input" name="longitude-text-input" placeholder="0.00" onChange={this.onReportLongitudeChange.bind(this)} value={reportLongitude}/>}
                      <CInvalidFeedback>Location longitude is blank or format is not recognized</CInvalidFeedback>
                      <CFormText>Signed longitude of disaster</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="severity-text-input">Severity (optional)</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidSeverity && <CInput id="severity-text-input" name="severity-text-input" placeholder="0" onChange={this.onReportSeverityChange.bind(this)} value={reportSeverity}/>}
                      {!isValidSeverity && <CInput invalid id="severity-text-input" name="severity-text-input" placeholder="0" onChange={this.onReportSeverityChange.bind(this)} value={reportSeverity}/>}
                      <CInvalidFeedback>Format of severity is not recognized or out of range</CInvalidFeedback>
                      <CFormText>Severity of disaster on a scale of 0 to 10, integral values only</CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="image-url-text-input">Image URL (optional)</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {isValidImageURL && <CInput id="image-url-text-input" name="image-url-text-input" placeholder="Text" onChange={this.onReportImageURLChange.bind(this)} value={reportImageURL}/>}
                      {!isValidImageURL && <CInput invalid id="image-url-text-input" name="image-url-text-input" placeholder="Text" onChange={this.onReportImageURLChange.bind(this)} value={reportImageURL}/>}
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
      </>
    );
  }
}

export default EditWitnessReport;