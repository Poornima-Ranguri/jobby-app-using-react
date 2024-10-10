import {Component} from 'react'
import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <Header />
        <div className="heading-home-container">
          <h1 className="heading">Find The Job That Fits Your Life</h1>

          <p className="para-text">
            Millions of people are searching for jobs, salary <br />
            information, company reviews. Find the job that fits your <br />
            abilities and potential
          </p>

          <Link to="/jobs" className="jobs-find-text">
            <button type="button" className="find-jobs-button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
