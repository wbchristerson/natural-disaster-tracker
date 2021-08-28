import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CImg,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { getBackEndHost, getCookieWithKey, USER_ACCESS_TOKEN_KEY, USER_NICKNAME_KEY, USER_PICTURE_KEY } from 'src/Utilities'

const TheHeader = () => {
  const isLoggedOut = getCookieWithKey(USER_ACCESS_TOKEN_KEY) === "";

  return (
    <CHeader withSubheader>
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo"/>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <a className="nav-github-link-text" href="https://github.com/wbchristerson/natural-disaster-tracker" target="_blank" rel="noreferrer">GitHub Repository</a>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/core-ui-credits">Credits</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {!isLoggedOut &&
          <div className="top-log-in-greeting">{`Hello, ${getCookieWithKey(USER_NICKNAME_KEY)}!`}</div>
        }
        {isLoggedOut &&
          <div className="login-box auth0-box before">
            <a className="btn btn-primary btn-md btn-login btn-block" href={`${getBackEndHost()}/my-login`}>Log In</a>
          </div>
        }
        {!isLoggedOut &&
          <div className="c-avatar upper-right-avatar-icon">
            <CImg
              src={getCookieWithKey(USER_PICTURE_KEY).slice(1,-1)}
              className="c-avatar-img"
              alt="admin@bootstrapmaster.com"
            />
          </div>
        }
        {!isLoggedOut &&
          <div className="logged-in-box auth0-box logged-in">
            <a className="btn btn-primary btn-md btn-logout btn-block" href={`${getBackEndHost()}/my-logout`}>Logout</a>
          </div>
        }
      </CHeaderNav>
    </CHeader>
  )
}

export default TheHeader
