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

    // this.back_end_host = "http://127.0.0.1:5000";
    // this.back_end_host = "https://sample-will.herokuapp.com";

    // this.front_end_host = "http://127.0.0.1:3000";
    // this.front_end_host = "https://sample-will.herokuapp.com";
  }

  componentDidMount() {
    this.fetchDisasters();
  }

  fetchDisasters() {
    // const back_end_host = "http://127.0.0.1:5000";
    // const back_end_host = "https://sample-will.herokuapp.com";

    // const front_end_host = "http://127.0.0.1:3000";
    // const front_end_host = "https://sample-will.herokuapp.com";

    // fetch(`http://127.0.0.1:5000/api/disasters?page=${this.state.page}`)

    // fetch(`https://sample-will.herokuapp.com/api/disasters?page=${this.state.page}`)
    fetch(`http://localhost:5000/api/disasters?page=${this.state.page}`)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        this.setState({
          totalDisasters: result.totalDisasters,
          disasterList: result.disasters,
        })
        // this.setState({users: result, isFetching: false})
    })
    .catch(e => {
        console.log(e);
        // this.setState({...this.state, isFetching: false});
    });
  }

  getUsers() {
    const myHeaders = new Headers({
      // 'Authorization': 'Bearer z2gTLUmzMaAeZ7QpjC1didkRVWMOOv-_',
      // 'authorization': 'Bearer z2gTLUmzMaAeZ7QpjC1didkRVWMOOv-_',


      // 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJuaWNrbmFtZSI6IndiY2hyaXN0ZXJzb24iLCJuYW1lIjoid2JjaHJpc3RlcnNvbkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNDZhMjI0MDk4OTEwMjgxYWRmNDcxZTE1MzcwMTRkOTQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ3Yi5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0xM1QxMzozMTowOS40NjNaIiwiZW1haWwiOiJ3YmNocmlzdGVyc29uQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtOXhvNWdkZmMudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVmN2ZhN2JmNmJjNzkyMDA2ODI3ZjMzYSIsImF1ZCI6IlJHdVNiOGhyYTg5VXlkVWhWY2p2SkF3M25aSHRCRGRYIiwiaWF0IjoxNjEzMjIzMDY5LCJleHAiOjE2MTMyNTkwNjksIm5vbmNlIjoiRjFOd0M4eUlJbUI4czVtZ3d1SmsifQ.lyfesMdVv3jlxBH8NcNZmjBYi4zyvMRpHYYMDBYPKowDzRXrcaMCQEW0W5ceUSRIr11-8MUCdSJPc3celfVK4M0EmyHlASKz2PhdBtPu83iUi7zcdxjgd8WOvVHCx_grCuhVmDTqAVjC2ojD4_4935nk6tQw0mwLvFh8R79Er5xw2b2ErQXZ0yXxKNArSqgdM2hxU951IaRIhw9ORgKkMsdlXuE75Ge5_ITd4mIS_YLdaNhlgPwon_8wATlT4_nz5OLu3z0yXCsIaRyQS0tIE_rYVu1gPdjLq4NeHVZVGoTKAO1YQQdOHD8fb2GUH_jtSIqoQPO7wZguIFsLxo_cGg',
      // 'authorization': 'Bearer hmjtWhBJjWBkLpgfgWRKqEKIS7erT4B0'
      // 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MTMyMjQxMjMsImV4cCI6MTYxMzMxMDUyMywiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6ImdldDpvYnNlcnZlcnMiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6d2l0bmVzc3JlcG9ydHMiLCJnZXQ6b2JzZXJ2ZXJzIiwicGF0Y2g6ZGlzYXN0ZXJzIiwicGF0Y2g6d2l0bmVzc3JlcG9ydHMiLCJwb3N0OmRpc2FzdGVycyIsInBvc3Q6d2l0bmVzc3JlcG9ydHMiXX0.WyRRd_CdoY3CGD3zQfhrCVB8hBlsNwY5TbFSXEsUCv5FQ44vCAGsUNf6QEhhO7sYbqfS5ZRIHCU1u6g-ifXCyULljCq-VRwi9pMYMnqIeh1HCE5lUPA7M5Dw23o1BVDcKiiaN1hoXqI7Fc9BzQw0ycAg2kAGamEKUSt60i8WzhoLE9G95ArjoWXsUa2zC17YsA57E2xDqdpug9Ko2iGs296Zj0YGjAVZn_E505VfPJi6tAN1yJjW-xxwxvUXTDw8JT2a2WK905vx4kEr99_g6oOeuj4ejfHJAYp6WfgeKz1RKRyKOUy3PzIK95cXIbfBU5DePw96TiPbW7tp86G8nw',
      // 'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MTMyMjQ0MDMsImV4cCI6MTYxMzMxMDgwMywiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6ImdldDpvYnNlcnZlcnMiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6d2l0bmVzc3JlcG9ydHMiLCJnZXQ6b2JzZXJ2ZXJzIiwicGF0Y2g6ZGlzYXN0ZXJzIiwicGF0Y2g6d2l0bmVzc3JlcG9ydHMiLCJwb3N0OmRpc2FzdGVycyIsInBvc3Q6d2l0bmVzc3JlcG9ydHMiXX0.Z6PicqklY5Gybf-hcnPRqPnCuV-4DZhiaTQ-Hwag3fv3el0GaA9A36ooR0DuhZtzuyegdsATr_paqc6IbADTP4VYNiFrA066Ib7lGoHqhwmfBLR1kCLibxq5SSIzvFWfT7iRigrFJERlzc076a5zr-6zyfgPC7AQtTG7Itm7180HYi0zFNsYyppcDLS8_grSmxrOxmCxlBCwCprfhpPt1SoemVY6M2T6HQENpjoYvbMSyCDnBVHe7usu11vPAFt_bvD0a42z5mx5SH2DwmTx9j501e_OxF9A7XJu3uj5NhCwP475hK7sss77K2CQ_vdtEMUjqXn_09y590L2IaLPQw',
      'authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MTMyMzIwNzQsImV4cCI6MTYxMzMxODQ3NCwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6ImdldDpvYnNlcnZlcnMiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6d2l0bmVzc3JlcG9ydHMiLCJnZXQ6b2JzZXJ2ZXJzIiwicGF0Y2g6ZGlzYXN0ZXJzIiwicGF0Y2g6d2l0bmVzc3JlcG9ydHMiLCJwb3N0OmRpc2FzdGVycyIsInBvc3Q6d2l0bmVzc3JlcG9ydHMiXX0.1ziog9QLnQ6KWJIM1cZvmpb5p_CC8LNDgCWFwg6KgbaQTfXxPiMeC39bS-_4hpF-C7fW1xD7MxhWW8ljTvddbfJzsfO78U8JLdm_svI3vgUOQdT-OcBm8tQUPJXSIaeIM6DjadzfSK70b7kMt45jfkXXsDD0ctYO7utcTICxZjK7-nKJ9fp-vD72OD1Zn2n-x1X-q-hHk2DeHtzyIQDT8zN-A4JNDh2vY9sFI-c8Bomc2GKw2givMf99ketzFDJJpbmwcTwZcO-Rwpg4lDc-dA5anpk_coUPPqpa0heyBSfPEV282fG1XU7CseBGhXmwGCZKu9gJqryDJwUvV7i5yA&scope=get%3Aobservers',


      // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJuaWNrbmFtZSI6IndiY2hyaXN0ZXJzb24iLCJuYW1lIjoid2JjaHJpc3RlcnNvbkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNDZhMjI0MDk4OTEwMjgxYWRmNDcxZTE1MzcwMTRkOTQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ3Yi5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0wNlQyMDowOToyNi44NTZaIiwiZW1haWwiOiJ3YmNocmlzdGVyc29uQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtOXhvNWdkZmMudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVmN2ZhN2JmNmJjNzkyMDA2ODI3ZjMzYSIsImF1ZCI6IlJHdVNiOGhyYTg5VXlkVWhWY2p2SkF3M25aSHRCRGRYIiwiaWF0IjoxNjEyNjQyMTY3LCJleHAiOjE2MTI2NzgxNjcsIm5vbmNlIjoiNG9aWjU1Q1RGUVlwV1l5NkdFZkgifQ.uFUpViiTnrwrZSLrFzeqKT4cjF8cmDBrCO1WErfTabwNpwAXbh2WSQxUvf1quQTSCtDFJJJW1DEiNl2D84g_Rz2YjKu6XG_OOfBJ74S_D1ilz5DNTERsvl4fFxNepuV4RvAWyO8Nw_naZNmNmdBZTqRzdCDRUYA--GkU05-EjFMSzGybZWP3IaQ6GJJvfBBr0GgV6igK2LKUe_TQLBd5PTpq2VOTPAiCzQ3fYj8Ha_KeaR9HV_fK91_BhSEA-CNko8qFJ9aH-opGV3BNhJjK2ffgVDEy6i_E39J6dRHjsxhIWxpEpn3r4PIKXStZ70hst7FiavUPKRLiGXzJTfvpDw',
    })

    const rawHeaders = {
      // 'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MTMyMjQ0MDMsImV4cCI6MTYxMzMxMDgwMywiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6ImdldDpvYnNlcnZlcnMiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6d2l0bmVzc3JlcG9ydHMiLCJnZXQ6b2JzZXJ2ZXJzIiwicGF0Y2g6ZGlzYXN0ZXJzIiwicGF0Y2g6d2l0bmVzc3JlcG9ydHMiLCJwb3N0OmRpc2FzdGVycyIsInBvc3Q6d2l0bmVzc3JlcG9ydHMiXX0.Z6PicqklY5Gybf-hcnPRqPnCuV-4DZhiaTQ-Hwag3fv3el0GaA9A36ooR0DuhZtzuyegdsATr_paqc6IbADTP4VYNiFrA066Ib7lGoHqhwmfBLR1kCLibxq5SSIzvFWfT7iRigrFJERlzc076a5zr-6zyfgPC7AQtTG7Itm7180HYi0zFNsYyppcDLS8_grSmxrOxmCxlBCwCprfhpPt1SoemVY6M2T6HQENpjoYvbMSyCDnBVHe7usu11vPAFt_bvD0a42z5mx5SH2DwmTx9j501e_OxF9A7XJu3uj5NhCwP475hK7sss77K2CQ_vdtEMUjqXn_09y590L2IaLPQw',
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJpc3MiOiJodHRwczovL2Rldi05eG81Z2RmYy51cy5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWY3ZmE3YmY2YmM3OTIwMDY4MjdmMzNhIiwiYXVkIjoiZGlzYXN0ZXJhcGkiLCJpYXQiOjE2MTMyMzIwNzQsImV4cCI6MTYxMzMxODQ3NCwiYXpwIjoiUkd1U2I4aHJhODlVeWRVaFZjanZKQXczblpIdEJEZFgiLCJzY29wZSI6ImdldDpvYnNlcnZlcnMiLCJwZXJtaXNzaW9ucyI6WyJkZWxldGU6d2l0bmVzc3JlcG9ydHMiLCJnZXQ6b2JzZXJ2ZXJzIiwicGF0Y2g6ZGlzYXN0ZXJzIiwicGF0Y2g6d2l0bmVzc3JlcG9ydHMiLCJwb3N0OmRpc2FzdGVycyIsInBvc3Q6d2l0bmVzc3JlcG9ydHMiXX0.1ziog9QLnQ6KWJIM1cZvmpb5p_CC8LNDgCWFwg6KgbaQTfXxPiMeC39bS-_4hpF-C7fW1xD7MxhWW8ljTvddbfJzsfO78U8JLdm_svI3vgUOQdT-OcBm8tQUPJXSIaeIM6DjadzfSK70b7kMt45jfkXXsDD0ctYO7utcTICxZjK7-nKJ9fp-vD72OD1Zn2n-x1X-q-hHk2DeHtzyIQDT8zN-A4JNDh2vY9sFI-c8Bomc2GKw2givMf99ketzFDJJpbmwcTwZcO-Rwpg4lDc-dA5anpk_coUPPqpa0heyBSfPEV282fG1XU7CseBGhXmwGCZKu9gJqryDJwUvV7i5yA&scope=get%3Aobservers',
    }

    // fetch("https://sample-will.herokuapp.com/api/observers",
    fetch("http://localhost:5000/api/observers",
          { 'headers': rawHeaders, 'method': 'GET' })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
  }

  proceedWithLogin() {
    // fetch("http://localhost:5000/my-login")
    // .then(response => {
    //   console.log("\n\n\n\n\n\n\n");
    //   console.log(response);
    //   console.log("\n\n\n\n\n\n\n");
    // })

    const formattedHeaders = new Headers({
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
    });

    // fetch("https://dev-9xo5gdfc.us.auth0.com/authorize?audience=disasterapi&scope=get%3Aobservers&response_type=token&client_id=RGuSb8hra89UydUhVcjvJAw3nZHtBDdX&redirect_uri=http://localhost:5000/callback&state=xyz123ABC",
    fetch('http://localhost:5000/my-login',
      { 'headers': { 'Access-Control-Allow-Origin': 'http://localhost:3000/' } }
    )
    .then(response => {
      console.log("\n\n\n\n\n\n\n");
      console.log("response:", response)
      console.log("\n\n\n\n\n\n\n");
    })
  }


  extractToken() {
    fetch('http://localhost:5000/extract-token', { 'headers': { 'Access-Control-Allow-Origin': 'http://localhost:3000/#/dashboard' } })
    .then(response => {
      console.log("\n\n\n\n\n\n\n");
      console.log("response: ", response);
      console.log("\n\n\n\n\n\n\n")
    })
  }


  render() {
    const d = new Date();
    const seconds = d.getSeconds();
    // console.log(seconds);

    console.log("disasterlist: ", this.state.disasterList);

    // <div className={`banner ${active ? "active" : ""}`}>{children}</div>

    return (
      <>
        <CButton block color="primary" onClick={this.proceedWithLogin}>Log--------------in</CButton>

        <CButton block color="primary" onClick={this.extractToken}>Test Authorization (Please Open Console)</CButton>

        <div className="login-box auth0-box before">
          <img src="https://i.cloudup.com/StzWWrY34s.png" alt="Auth0 login"/>
          <h3>Auth0 Example</h3>
          <p>Zero friction identity infrastructure, built for developers</p>
          {/* <a className="btn btn-primary btn-lg btn-login btn-block" href="https://sample-will.herokuapp.com/my-login">Log In</a> */}
          <a className="btn btn-primary btn-lg btn-login btn-block" href="http://localhost:5000/my-login">Log In</a>
          {/* <a className="btn btn-primary btn-lg btn-login btn-block" href="/my-login">Log In</a> */}
        </div>

        <div className="logged-in-box auth0-box logged-in">
          <h1 id="logo"><img src="//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png" alt="logo"/></h1>
          {/* <img className="avatar" src="{{userinfo['picture']}}" alt="other auth0"/> */}
          {/* <h2>{`Welcome ${userinfo ? userinfo['name'] : 'ABC!'}`}</h2> */}
          {/* <pre>{`${userinfo_pretty || "XYZ!"}`}</pre> */}
          {/* <a className="btn btn-primary btn-lg btn-logout btn-block" href="https://sample-will.herokuapp.com/my-logout">Logout</a> */}
          <a className="btn btn-primary btn-lg btn-logout btn-block" href="http://localhost:5000/my-logout">Logout</a>
          {/* <a className="btn btn-primary btn-lg btn-logout btn-block" href="/my-logout">Logout</a> */}
        </div>

        <CButton block color="primary" onClick={this.getUsers}>Primary</CButton>

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

// const Dashboard = () => {
  
// }

export default Dashboard
