import React from 'react'
import {
  CBadge,
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
  CSwitch,
  CListGroup,
  CListGroupItem,
  CButtonClose,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import { DEFAULT_DISASTER_FIELD_TEXT, displayDisasterDataLine, formatLatitudeLongitude, getBackEndHost, getFrontEndHost, isValidGeographicCoordinate,
        isValidImageURL, isValidNonnegativeIntegerInRange, isValidNonnegativeInteger, isValidTime, getCookieWithKey, OBSERVER_DATABASE_ID_KEY, 
        getGeneralTimeFormat, USER_ACCESS_TOKEN_KEY} from 'src/Utilities';


class SingleDisasterDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      average_severity: null,
      disaster_type: null,
      first_observance: null,
      id: props.location.search.substring(4),
      informal_name: null,
      is_ongoing: false,
      last_observance: null,
      location: null,
      num_reports: 0,
      official_name: null,
      people_affected: 0,
      reports: [],
      witnessReportFormVisible: false,

      newWitnessedDate: "",
      newWitnessedTime: "",
      newWitnessedNumPeople: "",
      newWitnessedLatitude: "",
      newWitnessedLongitude: "",
      newWitnessedSeverity: "",
      newWitnessedImageURL: "",
      newWitnessedComment: "",
      witnessedDateValid: true,
      witnessedTimeValid: true,
      witnessedNumPeopleValid: true,
      witnessedLatitudeValid: true,
      witnessedLongitudeValid: true,
      witnessedSeverityValid: true,
      witnessedImageURLValid: true,
    };
    this.backEndHost = getBackEndHost();
    this.frontEndHost = getFrontEndHost();
  }

  componentDidMount() {
    const disasterId = parseInt(this.props.location.search.substring(4));
    this.fetchDisasterInformation(disasterId);
  }

  fetchDisasterInformation(disasterId) {
    fetch(`${this.backEndHost}/api/disasters/${disasterId}?page=${this.state.page}`)
    .then(response => response.json())
    .then(result => {
        this.setState({
          average_severity: result.average_severity,
          disaster_type: result.disaster_type,
          first_observance: result.first_observance,
          last_observance: result.last_observance,
          informal_name: result.informal_name,
          is_ongoing: result.is_ongoing,
          location: result.location,
          num_reports: result.num_reports,
          official_name: result.official_name,
          people_affected: result.people_affected,
          reports: result.reports,
        })
    })
    .catch(e => {
        console.log("Error fetching disaster with id ", disasterId);
        console.log(e);
    });
  }

  setWitnessReportFormVisible(val) {
    this.setState({
      witnessReportFormVisible: val,
    });
  }

  onNewWitnessedDateChange(val) {
    this.setState({
      newWitnessedDate: val.target.value,
    });
  }

  onNewWitnessedTimeChange(val) {
    this.setState({
      newWitnessedTime: val.target.value,
    });
  }

  onNewWitnessedNumPeopleChange(val) {
    this.setState({
      newWitnessedNumPeople: val.target.value,
    });
  }

  onNewWitnessedLatitudeChange(val) {
    this.setState({
      newWitnessedLatitude: val.target.value,
    });
  }

  onNewWitnessedLongitudeChange(val) {
    this.setState({
      newWitnessedLongitude: val.target.value,
    });
  }

  onNewWitnessedSeverityChange(val) {
    this.setState({
      newWitnessedSeverity: val.target.value,
    });
  }

  onNewWitnessedImageURLChange(val) {
    let valueToInsert = val.target.value;
    if (valueToInsert.length > 250) {
      valueToInsert = valueToInsert.substring(0, 250);
    }
    this.setState({
      newWitnessedImageURL: valueToInsert,
    });
  }

  onNewWitnesseedCommentChange(val) {
    let valueToInsert = val.target.value;
    if (valueToInsert.length > 500) {
      valueToInsert = valueToInsert.substring(0, 500);
    }
    this.setState({
      newWitnessedComment: valueToInsert,
    });
  }

  clearWitnessReportForm() {
    this.setState({
      newWitnessedDate: "",
      newWitnessedTime: "",
      newWitnessedNumPeople: "",
      newWitnessedLatitude: "",
      newWitnessedLongitude: "",
      newWitnessedSeverity: "",
      newWitnessedImageURL: "",
      newWitnessedComment: "",
      witnessedDateValid: true,
      witnessedTimeValid: true,
      witnessedNumPeopleValid: true,
      witnessedLatitudeValid: true,
      witnessedLongitudeValid: true,
      witnessedSeverityValid: true,
      witnessedImageURLValid: true,
    });
  }

  onNewWitnessReportSubmit() {
    const {
      id,
      newWitnessedDate,
      newWitnessedTime,
      newWitnessedNumPeople,
      newWitnessedLatitude,
      newWitnessedLongitude,
      newWitnessedSeverity,
      newWitnessedImageURL,
      newWitnessedComment,
    } = this.state;

    let
      witnessedDateValid = true,
      witnessedTimeValid = true,
      witnessedNumPeopleValid = true,
      witnessedLatitudeValid = true,
      witnessedLongitudeValid = true,
      witnessedSeverityValid = true,
      witnessedImageURLValid = true;

    if (newWitnessedDate == "") {
      witnessedDateValid = false;
    }

    if (!isValidTime(newWitnessedTime)) {
      witnessedTimeValid = false;
    }

    if (!isValidNonnegativeInteger(newWitnessedNumPeople)) {
      witnessedNumPeopleValid = false;
    }

    if (!isValidGeographicCoordinate(newWitnessedLatitude)) {
      witnessedLatitudeValid = false;
    }

    if (!isValidGeographicCoordinate(newWitnessedLongitude)) {
      witnessedLongitudeValid = false;
    }

    if (newWitnessedSeverity != "" && !isValidNonnegativeIntegerInRange(newWitnessedSeverity, 0, 10)) {
      witnessedSeverityValid = false;
    }

    if (newWitnessedImageURL != "" && !isValidImageURL(newWitnessedImageURL)) {
      witnessedImageURLValid = false;
    }

    this.setState({
      witnessedDateValid,
      witnessedTimeValid,
      witnessedNumPeopleValid,
      witnessedLatitudeValid,
      witnessedLongitudeValid,
      witnessedSeverityValid,
      witnessedImageURLValid,
    });

    if (
      witnessedDateValid && witnessedTimeValid && witnessedNumPeopleValid && 
      witnessedLatitudeValid && witnessedLongitudeValid && witnessedSeverityValid &&
      witnessedImageURLValid) {
      
      // send creation request
      fetch(`${this.backEndHost}/api/witnessreports`,
        {
          method: 'POST',
          body: JSON.stringify({
            disaster_id: this.state.id,
            observer_id: getCookieWithKey(OBSERVER_DATABASE_ID_KEY),
            event_datetime: new Date(newWitnessedDate + "T" + getGeneralTimeFormat(newWitnessedTime)),
            severity: newWitnessedSeverity ? parseInt(newWitnessedSeverity.trim()) : null,
            image_url: newWitnessedImageURL ? newWitnessedImageURL.trim() : null,
            comment: newWitnessedComment ? newWitnessedComment.trim() : null,
            people_affected: parseInt(newWitnessedNumPeople.trim()),
            location_latitude: parseFloat(newWitnessedLatitude.trim()),
            location_longitude: parseFloat(newWitnessedLongitude.trim()),
          }),
          contentType: 'application/json',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookieWithKey(USER_ACCESS_TOKEN_KEY),
          }
        }
      )
      .then(response => response.json())
      .then(() => {
        this.clearWitnessReportForm();
        this.setState({
          witnessReportFormVisible: false,
        });
        this.fetchDisasterInformation(this.state.id);
      })
      .catch(e => {
          console.log("Error fetching disaster with id ", id);
          console.log(e);
      });
    }
  }


  getAddWitnessReportForm() {
    const {
      newWitnessedDate, newWitnessedTime,
      witnessedDateValid, witnessedTimeValid, witnessedNumPeopleValid, witnessedLatitudeValid,
      witnessedLongitudeValid, witnessedSeverityValid, witnessedImageURLValid} = this.state;
    return (
      <CCard>
        <CCardHeader className="individual-disaster-header-block">
          <h4 className="with-no-bottom-margin">New Witness Report</h4>
          <CButtonClose onClick={() => this.setWitnessReportFormVisible(false)}/></CCardHeader>
        <CCardBody>
          <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
            
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="date-input">Date Witnessed</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {witnessedDateValid && <CInput type="date" id="date-input" name="date-input" placeholder="date" value={newWitnessedDate} onChange={this.onNewWitnessedDateChange.bind(this)} />}
                {!witnessedDateValid && <CInput invalid type="date" id="date-input" name="date-input" placeholder="date" value={newWitnessedDate} onChange={this.onNewWitnessedDateChange.bind(this)} />}
                <CInvalidFeedback>Date provided is blank</CInvalidFeedback>
                <CFormText>Date of the report</CFormText>
              </CCol>
            </CFormGroup>
            
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="time-text-input">Time (HH:MM:SS)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {witnessedTimeValid && <CInput required id="time-text-input" name="time-text-input" placeholder="HH:MM:SS" onChange={this.onNewWitnessedTimeChange.bind(this)} value={newWitnessedTime}/>}
                {!witnessedTimeValid && <CInput required invalid id="time-text-input" name="time-text-input" placeholder="HH:MM:SS" onChange={this.onNewWitnessedTimeChange.bind(this)} value={newWitnessedTime}/>}
                <CInvalidFeedback>Time provided is blank or format is not recognized</CInvalidFeedback>
                <CFormText>Time of the disaster in hours, minutes, and optional seconds format</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="people-affected-text-input">Number Of People Affected</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {witnessedNumPeopleValid && <CInput id="people-affected-text-input" name="people-affected-text-input" placeholder="0" onChange={this.onNewWitnessedNumPeopleChange.bind(this)} value={this.state.newWitnessedNumPeople}/>}
                {!witnessedNumPeopleValid && <CInput invalid id="people-affected-text-input" name="people-affected-text-input" placeholder="0" onChange={this.onNewWitnessedNumPeopleChange.bind(this)} value={this.state.newWitnessedNumPeople}/>}
                <CInvalidFeedback>Number of people affected is blank or format is not recognized</CInvalidFeedback>
                <CFormText>Estimate of number of people affected</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="latitude-text-input">Location Latitude</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {witnessedLatitudeValid && <CInput id="latitude-text-input" name="latitude-text-input" placeholder="0.00" onChange={this.onNewWitnessedLatitudeChange.bind(this)} value={this.state.newWitnessedLatitude} />}
                {!witnessedLatitudeValid && <CInput invalid id="latitude-text-input" name="latitude-text-input" placeholder="0.00" onChange={this.onNewWitnessedLatitudeChange.bind(this)} value={this.state.newWitnessedLatitude} />}
                <CInvalidFeedback>Location latitude is blank or format is not recognized</CInvalidFeedback>
                <CFormText>Signed latitude of disaster</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="longitude-text-input">Location Longitude</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {witnessedLongitudeValid && <CInput id="longitude-text-input" name="longitude-text-input" placeholder="0.00" onChange={this.onNewWitnessedLongitudeChange.bind(this)} value={this.state.newWitnessedLongitude}/>}
                {!witnessedLongitudeValid && <CInput invalid id="longitude-text-input" name="longitude-text-input" placeholder="0.00" onChange={this.onNewWitnessedLongitudeChange.bind(this)} value={this.state.newWitnessedLongitude}/>}
                <CInvalidFeedback>Location longitude is blank or format is not recognized</CInvalidFeedback>
                <CFormText>Signed longitude of disaster</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="severity-text-input">Severity (optional)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {witnessedSeverityValid && <CInput id="severity-text-input" name="severity-text-input" placeholder="0" onChange={this.onNewWitnessedSeverityChange.bind(this)} value={this.state.newWitnessedSeverity}/>}
                {!witnessedSeverityValid && <CInput invalid id="severity-text-input" name="severity-text-input" placeholder="0" onChange={this.onNewWitnessedSeverityChange.bind(this)} value={this.state.newWitnessedSeverity}/>}
                <CInvalidFeedback>Format of severity is not recognized or out of range</CInvalidFeedback>
                <CFormText>Severity of disaster on a scale of 0 to 10, integral values only</CFormText>
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="image-url-text-input">Image URL (optional)</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                {witnessedImageURLValid && <CInput id="image-url-text-input" name="image-url-text-input" placeholder="Text" onChange={this.onNewWitnessedImageURLChange.bind(this)} value={this.state.newWitnessedImageURL}/>}
                {!witnessedImageURLValid && <CInput invalid id="image-url-text-input" name="image-url-text-input" placeholder="Text" onChange={this.onNewWitnessedImageURLChange.bind(this)} value={this.state.newWitnessedImageURL}/>}
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
                  onChange={this.onNewWitnesseedCommentChange.bind(this)}
                  value={this.state.newWitnessedComment}
                />
              </CCol>
            </CFormGroup>            
            
          </CForm>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary" onClick={this.onNewWitnessReportSubmit.bind(this)}><CIcon name="cil-scrubber" /> Submit</CButton>
          <CButton type="reset" size="sm" color="danger" onClick={this.clearWitnessReportForm.bind(this)}><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>
    );
  }

  render() {
    const {average_severity, disaster_type, first_observance, last_observance, is_ongoing, location, num_reports, people_affected, witnessReportFormVisible} = this.state;
    const disasterDisplayData = [
      { disasterField: "Average Severity", disasterValue: displayDisasterDataLine(average_severity) },
      { disasterField: "Disaster Type", disasterValue: disaster_type ? disaster_type.charAt(0).toUpperCase() + disaster_type.slice(1) : DEFAULT_DISASTER_FIELD_TEXT },
      { disasterField: "First Observance", disasterValue: displayDisasterDataLine(first_observance) },
      { disasterField: "Last Observance", disasterValue: displayDisasterDataLine(last_observance) },
      { disasterField: "Location", disasterValue: location ? formatLatitudeLongitude(location) : DEFAULT_DISASTER_FIELD_TEXT },
      { disasterField: "Number Of Reports", disasterValue: num_reports },
      { disasterField: "People Affected", disasterValue: displayDisasterDataLine(people_affected) },
    ];

    return (
      <>
        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader className="disaster-header">
                <CListGroup>
                  <div className="card-header-actions">
                    <CBadge className="mr-1 float-right" color={`${is_ongoing ? "danger" : "success"}`}>{`${is_ongoing ? "On-Going" : "Not On-Going"}`}</CBadge>
                  </div>
                  <CListGroupItem action active>
                    <div className="individual-disaster-header-block">
                      <h2>{this.state.informal_name}</h2>
                      <h2>{this.state.official_name}</h2>
                    </div>
                    <div className="individual-disaster-header-block">
                      <h6>Informal Name</h6>
                      <h6>Official Name</h6>
                    </div>
                  </CListGroupItem>
                </CListGroup>
                
              </CCardHeader>
              <CCardBody>
                {disasterDisplayData.map(data => (
                  <CForm key={data.disasterField}>
                    <CFormGroup row>
                      <CCol md="3" className="disaster-data-text">
                        <CLabel>{data.disasterField}</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <p className="form-control-static disaster-data-text">{data.disasterValue}</p>
                      </CCol>
                    </CFormGroup>
                  </CForm>
                ))}

                <CButton
                  block
                  className="btn btn-primary btn-lg btn-block inner-button"
                  color="primary"
                  onClick={() => this.setWitnessReportFormVisible(!witnessReportFormVisible)}>
                    {witnessReportFormVisible ? "Close Form" : "Add Witness Report"}
                </CButton>
                <CCollapse className="with-top-padding" show={witnessReportFormVisible}>
                  {this.getAddWitnessReportForm()}
                </CCollapse>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {this.state.reports.map((report, index) => {
          return (
            <CRow key={index}>
              <CCol xs="12" sm="12" md="12">
                <CCard>
                  <CCardHeader>
                    {/* <DocsLink name="CCard"/> */}
                    
                    {/* <div className="card-header-actions">
                      <CBadge color="success" className="float-right">Success</CBadge>
                    </div> */}

                    {/* <div className="card-header-actions">
                      <CLink className="card-header-action">
                        <CIcon name="cil-settings" />
                      </CLink>
                      <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                        <CIcon name={collapsed ? 'cil-chevron-bottom':'cil-chevron-top'} />
                      </CLink>
                      <CLink className="card-header-action" onClick={() => setShowCard(false)}>
                        <CIcon name="cil-x-circle" />
                      </CLink>
                    </div> */}

                    {/* <CBadge className="mr-1" color="danger">Danger</CBadge> */}

                  </CCardHeader>
                  {report.image_url && <img className="d-block w-100 set-disaster-max-height" src={report.image_url} alt="slide 1"/>}
                  <CCardBody>

                    <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                      <tbody>
                        <tr>
                          <td className="text-center">
                            <div className="c-avatar">
                              <img src={report.user_photograph_url} className="c-avatar-img" alt={"" + report.username} />
                              <span className="c-avatar-status bg-success"></span>
                            </div>
                          </td>
                          <td>
                            <div>{report.username}</div>
                            <div className="small text-muted">
                              <span>New</span> | Registered: Jan 1, 2015
                            </div>
                          </td>
                          <td className="text-center">
                            <CIcon height={25} name="cif-us" title="us" id="us" />
                          </td>
                          <td>
                            <div className="clearfix">
                              <div className="float-left">
                                <strong>50%</strong>
                              </div>
                              <div className="float-right">
                                <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                              </div>
                            </div>
                            <CProgress className="progress-xs" color="success" value="50" />
                          </td>
                          <td className="text-center">
                            <CIcon height={25} name="cib-cc-mastercard" />
                          </td>
                          <td>
                            <div className="small text-muted">Last login</div>
                            <strong>10 sec ago</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {report.comment && <h5>{`"${report.comment}"`}</h5>}
                    <h6>{`Observer: ${report.username}`}</h6>
                    <h6>{`Severity: ${report.severity}`}</h6>
                    <h6>{`Observance time: ${report.event_datetime}`}</h6>
                    <h6>{`Report id: ${report.id}`}</h6>
                    <h6>{`Location: ${formatLatitudeLongitude(report.location)}`}</h6>
                    <h6>{`People affected: ${report.people_affected}`}</h6>

                    {/* <div className="auth0-box">
                      <a className="btn btn-primary" href={`${this.frontEndHost}/#/single-disaster-display?id=${disaster.id}`}>View Witness Reports</a>
                    </div> */}

                    <div className="button-row">
                      <div className="auth0-box">
                        <a className="btn btn-primary" href={`${this.frontEndHost}/#/edit-witness-report?id=${report.id}`}>Edit Witness Report</a>
                      </div>
                      <div className="auth0-box">
                        <a className="btn btn-primary" href={`${this.frontEndHost}/#/edit-disaster-event?id=${report.id}`}>Delete Witness Report</a>
                      </div>
                    </div>

                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )
        })}
      </>
    );
  }
}

export default SingleDisasterDisplay;