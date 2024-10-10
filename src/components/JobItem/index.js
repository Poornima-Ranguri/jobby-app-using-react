import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
    location,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-item-route">
      <li className="job-item-container">
        <div className="company-heading-logo-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="company-heading-container">
            <h1 className="company-heading-text">{title}</h1>
            <div className="rating-container">
              <BsStarFill className="rating-icon" />
              <p className="rating-text">{rating}</p>
            </div>
          </div>
        </div>
        <div className="icons-text-container">
          <div className="location-job-container">
            <div className="location-container">
              <MdLocationOn className="location-icon" />
              <p className="location-text">{location}</p>
            </div>
            <div className="internship-container">
              <BsFillBriefcaseFill className="location-icon" />
              <p className="location-text">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h3 className="heading-description">Description</h3>
        <p className="parag">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
