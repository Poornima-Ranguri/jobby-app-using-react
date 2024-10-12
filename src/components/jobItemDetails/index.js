import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    skillsList: [],
    lifeAtCompany: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      console.log(data)

      const updatedJobDetails = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        companyWebsiteUrl: data.job_details.company_website_url,
      }

      console.log('jobDetails', updatedJobDetails)

      const updatedLifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      console.log('life At Company', updatedLifeAtCompany)

      const updatedSkills = data.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))

      console.log('Skills', updatedSkills)

      const updatedSimilarJobs = data.similar_jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      console.log('similarJobs', updatedSimilarJobs)

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        skillsList: updatedSkills,
        lifeAtCompany: updatedLifeAtCompany,
        similarJobs: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetData = () => {
    this.getJobDetails()
  }

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    return (
      <div className="job-item-error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="job-item-failure-img"
        />
        <h1 className="job-item-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="job-item-failure-description">
          We cannot seem to find the page you are looking for
        </p>

        <button
          type="button"
          id="button"
          className="job-item-failure-button"
          onClick={this.onGetData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="job-item-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderLifeAtCompany = () => {
    const {lifeAtCompany} = this.state
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="life-at-company">
        <h3 className="life-text">Life At Company</h3>
        <div className="life-at-company-container">
          <p className="life-parag">{description}</p>
          <img src={imageUrl} alt="life at company" className="life-image" />
        </div>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobDetails, skillsList} = this.state
    const {
      title,
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      rating,
      location,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="job-item-container-Details">
        <div className="company-heading-logo-container-Details">
          <img
            src={companyLogoUrl}
            className="company-logo-Details"
            alt="job details company logo"
          />
          <div className="company-heading-container-Details">
            <h1 className="company-heading-text-Details">{title}</h1>
            <div className="rating-container-Details">
              <BsStarFill className="rating-icon-Details" />
              <p className="rating-text-Details">{rating}</p>
            </div>
          </div>
        </div>
        <div className="icons-text-container-Details">
          <div className="location-job-container-Details">
            <div className="location-container-Details">
              <MdLocationOn className="location-icon-Details" />
              <p className="location-text-Details">{location}</p>
            </div>
            <div className="internship-container-Details">
              <BsFillBriefcaseFill className="location-icon-Details" />
              <p className="location-text-Details">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line-Details" />
        <div className="description-container">
          <h3 className="heading-description-Details">Description</h3>
          <div className="visit-container">
            <a href={companyWebsiteUrl} className="visit-heading">
              Visit
            </a>
            <BiLinkExternal className="visit-icon" />
          </div>
        </div>
        <p className="parag-Details">{jobDescription}</p>
        <h3 className="heading-skills">Skills</h3>
        <ul className="skills-container">
          {skillsList.map(eachSkill => (
            <li key={eachSkill.name} className="skill-item">
              <img
                src={eachSkill.imageUrl}
                alt={eachSkill.name}
                className="skill-logo"
              />
              <p className="skill-text">{eachSkill.name}</p>
            </li>
          ))}
        </ul>
        {this.renderLifeAtCompany()}
      </div>
    )
  }

  renderSuccessJobDetails = () => {
    const {similarJobs} = this.state

    return (
      <div className="job-details-home-container">
        <Header />
        {this.renderJobDetails()}
        <div className="similar-jobs-container">
          <h1>Similar Jobs</h1>
          <ul className="similar-jobs-card-container">
            {similarJobs.map(eachJob => (
              <li key={eachJob.id} className="job-item-container-similar-jobs">
                <div className="company-heading-logo-container-similar-jobs">
                  <img
                    src={eachJob.companyLogoUrl}
                    className="company-logo"
                    alt="similar job company logo"
                  />
                  <div className="company-heading-container-similar-jobs">
                    <h1 className="company-heading-text-similar-jobs">
                      {eachJob.title}
                    </h1>
                    <div className="rating-container-similar-jobs">
                      <BsStarFill className="rating-icon-similar-jobs" />
                      <p className="rating-text-similar-jobs">
                        {eachJob.rating}
                      </p>
                    </div>
                  </div>
                </div>

                <hr className="line" />
                <h3 className="heading-description">Description</h3>
                <p className="parag">{eachJob.jobDescription}</p>
                <div className="icons-text-container-similar-jobs">
                  <div className="location-job-container-similar-jobs">
                    <div className="location-container">
                      <MdLocationOn className="location-icon" />
                      <p className="location-text">{eachJob.location}</p>
                    </div>
                    <div className="internship-container">
                      <BsFillBriefcaseFill className="location-icon" />
                      <p className="location-text">{eachJob.employmentType}</p>
                    </div>
                  </div>
                  <p>{eachJob.packagePerAnnum}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="job-item-details-container ">
        {this.renderJobDetailsView()}
      </div>
    )
  }
}

export default JobItemDetails
