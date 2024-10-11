import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
      </div>
      <div className="heading-container">
        <ul className="list-heading-container">
          <li>
            <Link to="/" className="heading-text">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="heading-text">
              Jobs
            </Link>
          </li>
        </ul>
      </div>
      <div className="logout-button-container">
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}
export default withRouter(Header)
