import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import JobItem from '../JobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jobConstants = {
  initial: 'INITIAL',
  success: 'SUCCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobStatus: jobConstants.initial,
    profileDetails: {},
    searchjobsInput: '',
    employmentType: [],
    minimumPackage: '',
    jobsData: [],
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({jobStatus: jobConstants.inProgress})
    const {searchjobsInput, employmentType, minimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchjobsInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      console.log(updatedData)

      this.setState({jobsData: updatedData, jobStatus: jobConstants.success})
    } else {
      this.setState({jobStatus: jobConstants.failure})
    }
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const profileDetails = data.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        profileDetails: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onGetSearchInput = () => {
    this.getJobs()
  }

  onChangeSearchInput = event => {
    this.setState({searchjobsInput: event.target.value})
  }

  renderProfileDetails = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-container">
        <div className="profile-card-container">
          <img src={profileImageUrl} alt="profile" className="profile-image" />
          <h1 className="profile-head-text">{name}</h1>
          <p className="bio-text">{shortBio}</p>
        </div>
        <hr className="hr-line" />
        <div className="employment-types-container">
          <h1 className="text">Type of Employment</h1>
        </div>
        <hr className="hr-line" />
        <div className="employment-types-container">
          <h1 className="text">Salary Range</h1>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsLoader = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileFailureView = () => {
    const onClickRetry = () => {
      this.getProfile()
    }

    return (
      <div className="retry-container">
        <button type="button" className="retry-button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  profileStatus = () => {
    const {apiStatus} = this.state
    console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileDetails()
      case apiStatusConstants.failure:
        return this.profileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderJobsFailure = () => {
    const onClickRetry = () => {
      this.getJobs()
    }
    return (
      <div className="failure-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-paragraph">
          we cannot seem to find the page you are looking for
        </p>
        <div className="jobs-failure-button-container">
          <button
            className="failure-button"
            type="button"
            onClick={onClickRetry}
          >
            retry
          </button>
        </div>
      </div>
    )
  }

  renderJobStatus = () => {
    const {jobStatus} = this.state

    switch (jobStatus) {
      case jobConstants.success:
        return this.renderJobStatusSuccess()
      case jobConstants.inProgress:
        return this.renderJobsLoader()
      case jobConstants.failure:
        return this.renderJobsFailure()
      default:
        return null
    }
  }

  renderJobStatusSuccess = () => {
    const {jobsData, searchjobsInput} = this.state
    const noJobs = jobsData.length === 0

    return (
      <>
        <div className="search-input-container">
          <input
            type="search"
            id="searchInput"
            className="input-search"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterSearchInput}
            value={searchjobsInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
            onClick={this.onGetSearchInput}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>

        {noJobs ? (
          <div className="no-jobs-container">
            <img
              className="no-jobs-img"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1 className="no-jobs-text">No jobs found</h1>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        ) : (
          <ul className="jobs-list-container">
            {jobsData.map(eachJob => (
              <JobItem key={eachJob.id} jobDetails={eachJob} />
            ))}
          </ul>
        )}
      </>
    )
  }

  render() {
    return (
      <div className="jobs-container">
        {this.profileStatus()}
        <div className="jobs-search-and-display-container">
          {this.renderJobStatus()}
        </div>
      </div>
    )
  }
}

export default Jobs
