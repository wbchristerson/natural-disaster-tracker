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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'
import { DEFAULT_DISASTER_FIELD_TEXT, displayDisasterDataLine, formatLatitudeLongitude, getBackEndHost, getFrontEndHost } from 'src/Utilities';


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
      reports: []
    };
    this.backEndHost = getBackEndHost();
    this.frontEndHost = getFrontEndHost();
  }

  componentDidMount() {
    const disasterId = parseInt(this.props.location.search.substring(4));
    fetch(`${this.backEndHost}/api/disasters/${disasterId}?page=${this.state.page}`)
    .then(response => response.json())
    .then(result => {
        console.log(result);
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
        console.log(e);
    });
  }

  render() {
    const {average_severity, disaster_type, first_observance, last_observance, is_ongoing, location, num_reports, people_affected} = this.state;
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

                <div className="auth0-box inner-button">
                  <a className="btn btn-primary btn-lg btn-block" href={`${this.frontEndHost}/#/add-disaster-event`}>Add Witness Report</a>
                </div>
              </CCardBody>

            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default SingleDisasterDisplay;