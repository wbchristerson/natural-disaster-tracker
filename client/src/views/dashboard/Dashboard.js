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
  // CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import { DocsLink } from 'src/reusable'

import MainChartExample from '../charts/MainChartExample.js'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDisasters: 0,
      disasterList: [],
      page: 1,
    };

    if (process.env["NODE_ENV"] == "development") {
      this.back_end_host = "http://localhost:5000";
    } else {
      this.back_end_host = "https://sample-will.herokuapp.com";
    }
  }

  componentDidMount() {
    this.fetchDisasters();
  }

  fetchDisasters() {
    fetch(`${this.back_end_host}/api/disasters?page=${this.state.page}`)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        this.setState({
          totalDisasters: result.totalDisasters,
          disasterList: result.disasters,
        })
    })
    .catch(e => {
        console.log(e);
    });
  }

  getUsers() {
    // fetch(`${this.back_end_host}/api/observers`,
    //       { 'headers': rawHeaders, 'method': 'GET' })
    // .then(response => response.json())
    // .then(result => {
    //   console.log(result);
    // })
  }

  render() {
    const d = new Date();
    const seconds = d.getSeconds();

    console.log("disasterlist: ", this.state.disasterList);

    return (
      <>
        <div className="login-box auth0-box before">
          <img src="https://i.cloudup.com/StzWWrY34s.png" alt="Auth0 login"/>
          <h3>Auth0 Example</h3>
          <p>Zero friction identity infrastructure, built for developers</p>
          {/* <a className="btn btn-primary btn-lg btn-login btn-block" href="https://sample-will.herokuapp.com/my-login">Log In</a> */}
          <a className="btn btn-primary btn-lg btn-login btn-block" href={`${this.back_end_host}/my-login`}>Log In</a>
        </div>

        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" alt="logo"/></h1>
          {/* <img className="avatar" src="{{userinfo['picture']}}" alt="other auth0"/> */}
          {/* <h2>{`Welcome ${userinfo ? userinfo['name'] : 'ABC!'}`}</h2> */}
          {/* <a className="btn btn-primary btn-lg btn-logout btn-block" href="https://sample-will.herokuapp.com/my-logout">Logout</a> */}
          <a className="btn btn-primary btn-lg btn-logout btn-block" href={`${this.back_end_host}/my-logout`}>Logout</a>
          {/* <a className="btn btn-primary btn-lg btn-logout btn-block" href="/my-logout">Logout</a> */}
        </div>

        <CButton block color="primary" onClick={this.getUsers}>Primary</CButton>

        <div className="logged-in-box auth0-box logged-in">
          {/* <a className="btn btn-primary btn-lg btn-logout btn-block" href="https://sample-will.herokuapp.com/my-logout">Logout</a> */}
          
          {/* <a className="btn btn-primary btn-lg btn-logout btn-block" href={`${this.front_end_host}/base/forms`}>Add Disaster Event</a> */}
          <a className="btn btn-primary btn-lg btn-logout btn-block" href={`http://localhost:3000/#/add-disaster-event`}>Add Disaster Event</a>

          {/* <a className="btn btn-primary btn-lg btn-logout btn-block" href="/my-logout">Logout</a> */}
        </div>

        <div className={`my-test ${seconds % 3 === 0 ? "main-image-1" : seconds % 3 === 1 ? "main-image-2" : "main-image-3"}`}>
          <div className="card-overlay">
            <h1 className="display-3 main-top-text">Disaster Reporter</h1>
            <p className="main-bottom-text">See And Write Reports About Natural Disasters In Your Area</p>
          </div>
        </div>

        

        {this.state.disasterList.map((disaster, index) => {
          return (
            <CRow key={index}>
              <CCol xs="12" sm="12" md="12">
                <CCard>
                  <CCardHeader>
                    {`${disaster.informal_name} - Official Name: ${disaster.official_name}`}
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

                    <div className="card-header-actions">
                      <CBadge className="mr-1 float-right" color={`${disaster.is_ongoing ? "danger" : "success"}`}>{`${disaster.is_ongoing ? "On-Going" : "Not On-Going"}`}</CBadge>
                    </div>
                    {/* <CBadge className="mr-1" color="danger">Danger</CBadge> */}

                  </CCardHeader>
                  {disaster.random_observer_url && <img className="d-block w-100 set-disaster-max-height" src={disaster.random_witness_image} alt="slide 1"/>}
                  <CCardBody>

                    {disaster.random_observer &&
                      <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                        <tbody>
                          <tr>
                            <td className="text-center">
                              <div className="c-avatar">
                                <img src={disaster.random_observer_url} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                                <span className="c-avatar-status bg-success"></span>
                              </div>
                            </td>
                            <td>
                              <div>{disaster.random_observer}</div>
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
                    }

                    {disaster.random_comment && <h5>{`"${disaster.random_comment}"`}</h5>}
                    {disaster.random_observer && <h6>{`Observer: ${disaster.random_observer}`}</h6>}

                    {disaster.average_severity && <h6>{`Average severity: ${disaster.average_severity}`}</h6>}
                    {disaster.disaster_type && <h6>{`Disaster type: ${disaster.disaster_type}`}</h6>}
                    {disaster.first_observance && <h6>{`First observance: ${disaster.first_observance}`}</h6>}
                    {disaster.last_observance && <h6>{`Last observance: ${disaster.last_observance}`}</h6>}
                    {<h6>{`id: ${disaster.id}`}</h6>}
                    {<h6>{`Location: (${disaster.location[0]}, ${disaster.location[1]})`}</h6>}
                    {<h6>{`Number Of Reports: ${disaster.num_reports}`}</h6>}
                    {disaster.people_affected && <h6>{`People affected: ${disaster.people_affected}`}</h6>}
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )
        })}

        <WidgetsDropdown />
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">Traffic</h4>
                <div className="small text-muted">November 2017</div>
              </CCol>
              <CCol sm="7" className="d-none d-md-block">
                <CButton color="primary" className="float-right">
                  <CIcon name="cil-cloud-download"/>
                </CButton>
                <CButtonGroup className="float-right mr-3">
                  {
                    ['Day', 'Month', 'Year'].map(value => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Month'}
                      >
                        {value}
                      </CButton>
                    ))
                  }
                </CButtonGroup>
              </CCol>
            </CRow>
            <MainChartExample style={{height: '300px', marginTop: '40px'}}/>
          </CCardBody>
          <CCardFooter>
            <CRow className="text-center">
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Visits</div>
                <strong>29.703 Users (40%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="success"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Unique</div>
                <strong>24.093 Users (20%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="info"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">Pageviews</div>
                <strong>78.706 Views (60%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="warning"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0">
                <div className="text-muted">New Users</div>
                <strong>22.123 Users (80%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  color="danger"
                  value={40}
                />
              </CCol>
              <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
                <div className="text-muted">Bounce Rate</div>
                <strong>Average Rate (40.15%)</strong>
                <CProgress
                  className="progress-xs mt-2"
                  precision={1}
                  value={40}
                />
              </CCol>
            </CRow>
          </CCardFooter>
        </CCard>

        <WidgetsBrand withCharts/>

        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                Traffic {' & '} Sales
              </CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12" md="6" xl="6">

                    <CRow>
                      <CCol sm="6">
                        <CCallout color="info">
                          <small className="text-muted">New Clients</small>
                          <br />
                          <strong className="h4">9,123</strong>
                        </CCallout>
                      </CCol>
                      <CCol sm="6">
                        <CCallout color="danger">
                          <small className="text-muted">Recurring Clients</small>
                          <br />
                          <strong className="h4">22,643</strong>
                        </CCallout>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />

                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                          Monday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="34" />
                        <CProgress className="progress-xs" color="danger" value="78" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Tuesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="56" />
                        <CProgress className="progress-xs" color="danger" value="94" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Wednesday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="12" />
                        <CProgress className="progress-xs" color="danger" value="67" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Thursday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="43" />
                        <CProgress className="progress-xs" color="danger" value="91" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Friday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="22" />
                        <CProgress className="progress-xs" color="danger" value="73" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Saturday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="53" />
                        <CProgress className="progress-xs" color="danger" value="82" />
                      </div>
                    </div>
                    <div className="progress-group mb-4">
                      <div className="progress-group-prepend">
                        <span className="progress-group-text">
                        Sunday
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="info" value="9" />
                        <CProgress className="progress-xs" color="danger" value="69" />
                      </div>
                    </div>
                    <div className="legend text-center">
                      <small>
                        <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                        New clients
                        &nbsp;
                        <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                        Recurring clients
                      </small>
                    </div>
                  </CCol>

                  <CCol xs="12" md="6" xl="6">

                    <CRow>
                      <CCol sm="6">
                        <CCallout color="warning">
                          <small className="text-muted">Pageviews</small>
                          <br />
                          <strong className="h4">78,623</strong>
                        </CCallout>
                      </CCol>
                      <CCol sm="6">
                        <CCallout color="success">
                          <small className="text-muted">Organic</small>
                          <br />
                          <strong className="h4">49,123</strong>
                        </CCallout>
                      </CCol>
                    </CRow>

                    <hr className="mt-0" />

                    <div className="progress-group mb-4">
                      <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-user" />
                        <span className="title">Male</span>
                        <span className="ml-auto font-weight-bold">43%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="warning" value="43" />
                      </div>
                    </div>
                    <div className="progress-group mb-5">
                      <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-user-female" />
                        <span className="title">Female</span>
                        <span className="ml-auto font-weight-bold">37%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="warning" value="37" />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon className="progress-group-icon" name="cil-globe-alt" />
                        <span className="title">Organic Search</span>
                        <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="56" />
                      </div>
                    </div>


                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon name="cib-facebook" className="progress-group-icon" />
                        <span className="title">Facebook</span>
                        <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="15" />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon name="cib-twitter" className="progress-group-icon" />
                        <span className="title">Twitter</span>
                        <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="11" />
                      </div>
                    </div>
                    <div className="progress-group">
                      <div className="progress-group-header">
                        <CIcon name="cib-linkedin" className="progress-group-icon" />
                        <span className="title">LinkedIn</span>
                        <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress className="progress-xs" color="success" value="8" />
                      </div>
                    </div>
                    <div className="divider text-center">
                      <CButton color="link" size="sm" className="text-muted">
                        <CIcon name="cil-options" />
                      </CButton>
                    </div>

                  </CCol>
                </CRow>

                <br />

                <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center"><CIcon name="cil-people" /></th>
                      <th>User</th>
                      <th className="text-center">Country</th>
                      <th>Usage</th>
                      <th className="text-center">Payment Method</th>
                      <th>Activity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Yiorgos Avraamu</div>
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
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/2.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Avram Tarasios</div>
                        <div className="small text-muted">

                          <span>Recurring</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-br" title="br" id="br" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>10%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="info" value="10" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-cc-visa" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>5 minutes ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/3.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-warning"></span>
                        </div>
                      </td>
                      <td>
                        <div>Quintin Ed</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-in" title="in" id="in" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>74%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="warning" value="74" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-stripe" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>1 hour ago</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/4.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-secondary"></span>
                        </div>
                      </td>
                      <td>
                        <div>Enéas Kwadwo</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>98%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="danger" value="98" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-paypal" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last month</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/5.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-success"></span>
                        </div>
                      </td>
                      <td>
                        <div>Agapetus Tadeáš</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-es" title="es" id="es" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>22%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="info" value="22" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-google-pay"/>
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Last week</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-center">
                        <div className="c-avatar">
                          <img src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                          <span className="c-avatar-status bg-danger"></span>
                        </div>
                      </td>
                      <td>
                        <div>Friderik Dávid</div>
                        <div className="small text-muted">
                          <span>New</span> | Registered: Jan 1, 2015
                        </div>
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-left">
                            <strong>43%</strong>
                          </div>
                          <div className="float-right">
                            <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                          </div>
                        </div>
                        <CProgress className="progress-xs" color="success" value="43" />
                      </td>
                      <td className="text-center">
                        <CIcon height={25} name="cib-cc-amex" />
                      </td>
                      <td>
                        <div className="small text-muted">Last login</div>
                        <strong>Yesterday</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    )
  }
}

export default Dashboard
