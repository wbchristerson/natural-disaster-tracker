import React from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CInput,
  CPagination,
  CListGroup,
  CListGroupItem,
  CLabel,
} from '@coreui/react'
import { getBackEndHost, getDisasterDisplayDataList, getFrontEndHost, PAGE_SIZE } from '../../Utilities'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const d = new Date();
    this.state = {
      totalDisasters: 0,
      disasterList: [],
      page: 1,
      recordedSeconds: d.getSeconds(),

      searchString: "",
    };

    this.backEndHost = getBackEndHost();
    this.frontEndHost = getFrontEndHost();
  }

  componentDidMount() {
    this.fetchDisasters(1);
  }

  fetchDisasters(page) {
    fetch(`${this.backEndHost}/api/disasters?page=${page}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then(response => response.json())
    .then(result => {
        this.setState({
          totalDisasters: result.total_disasters,
          disasterList: result.disasters,
        })
    })
    .catch(e => {
        console.log(e);
    });
  }

  onSearchStringChange(evt) {
    this.setState({
      searchString: evt.target.value,
    })
  }

  onSearchClick() {
    const {searchString} = this.state;
    if (searchString === "") {
      this.fetchDisasters(1);
      this.setState({
        page: 1,
      });
    } else {
      this.fetchDisastersWithSearch(searchString, 1);
    }
  }

  fetchDisastersWithSearch(searchString, page) {
    fetch(`${this.backEndHost}/api/disasters?page=${page}&query=${searchString}`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    .then(response => response.json())
    .then(result => {
        this.setState({
          totalDisasters: result.total_disasters,
          disasterList: result.disasters,
          page: page,
        });
    })
    .catch(e => {
        console.log(e);
    });
  }

  onSetCurrentPage(evt) {
    const newPage = Math.max(1, evt);
    this.setState({
      page: newPage,
    });
    const {searchString} = this.state;
    if (searchString === "") {
      this.fetchDisasters(newPage);
    } else {
      this.fetchDisastersWithSearch(searchString, newPage);
    }
  }

  render() {
    const {recordedSeconds, searchString, disasterList, page, totalDisasters} = this.state;
    return (
      <>
        <div className={`my-test ${recordedSeconds % 3 === 0 ? "main-image-1" : recordedSeconds % 3 === 1 ? "main-image-2" : "main-image-3"}`}>
          <div className="card-overlay">
            <h1 className="display-3 main-top-text">Disaster Reporter</h1>
            <p className="main-bottom-text">See And Write Reports About Natural Disasters In Your Area</p>
          </div>
        </div>
        <div className="dashboard-centered-entity single-disaster-card">
          <div className="dashboard-search-container">
            <CInput
              className="top-search-field"
              placeholder="Search"
              size="lg"
              value={searchString}
              onChange={this.onSearchStringChange.bind(this)}
            />
            <CButton color="primary" onClick={() => this.onSearchClick(1)} className="btn btn-primary btn-block top-search-button" type="submit">Search</CButton>
          </div>
          <div className="logged-in-box auth0-box logged-in add-disaster-button single-disaster-card">
            <a className="btn btn-primary btn-lg btn-logout btn-block" href={`${this.frontEndHost}/#/add-disaster-event`}>Add Disaster Event</a>
          </div>
        </div>

        {disasterList.length === 0 && <h3 className="no-search-match-text">No matching disasters</h3>}

        {disasterList.map((disaster, index) => {
          const disasterDisplayData = getDisasterDisplayDataList(disaster);
          return (
            <CRow key={index} className="single-disaster-container">
              <CCol xs="12" className="single-disaster-card">
                <CCard>
                  <CCardHeader className="disaster-header">
                    <CListGroup>
                      <div className="card-header-actions">
                        <CBadge className="mr-1 float-right" color={`${disaster.is_ongoing ? "danger" : "success"}`}>{`${disaster.is_ongoing ? "On-Going" : "Not On-Going"}`}</CBadge>
                      </div>
                      <CListGroupItem action active>
                        <div className="individual-disaster-header-block">
                          <h2>{disaster.informal_name}</h2>
                          <h2>{disaster.official_name}</h2>
                        </div>
                        <div className="individual-disaster-header-block">
                          <h6>Informal Name</h6>
                          <h6>Official Name</h6>
                        </div>
                      </CListGroupItem>
                    </CListGroup>
                    
                  </CCardHeader>
                  <CCardBody className="disaster-card-body">
                    {disaster.random_observer_url && <img className="d-block w-100 set-disaster-max-height" src={disaster.random_witness_image} alt="slide 1"/>}
                    {disaster.random_comment && <h3 className="witness-quote-statement">{`"${disaster.random_comment}"`}</h3>}
                    {disaster.random_comment && 
                      <div className="witness-quote-author">
                        <div className="c-avatar">
                          <img src={disaster.random_observer_url} className="c-avatar-img" alt={""} />
                        </div>
                        {disaster.random_comment && <h5 className="disaster-author-text">{disaster.random_observer}</h5>}
                      </div>
                    }
                    <CForm className="disaster-details-block">
                      {disasterDisplayData.map((display, subIndex) => (
                        <div key={subIndex} className="disaster-display">
                          <CCol md="3" className="disaster-data-text">
                            <CLabel>{display[0]}</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <p className="disaster-data-text">{display[1]}</p>
                          </CCol>
                        </div>
                      ))}
                    </CForm>

                    <div className="button-row disaster-button-block">
                      <div className="auth0-box">
                        <a className="btn btn-primary" href={`${this.frontEndHost}/#/single-disaster-display?id=${disaster.id}`}>View Witness Reports</a>
                      </div>
                      <div className="auth0-box">
                        <a className="btn btn-primary" href={`${this.frontEndHost}/#/edit-disaster-event?id=${disaster.id}`}>Edit Disaster</a>
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )
        })}

        <CPagination
          align="center"
          activePage={page}
          pages={Math.ceil(totalDisasters / PAGE_SIZE)}
          onActivePageChange={this.onSetCurrentPage.bind(this)}
        />
      </>
    )
  }
}

export default Dashboard
