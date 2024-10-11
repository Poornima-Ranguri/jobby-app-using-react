import './index.css'

const SalaryFilter = props => {
  const renderEmploymentTypesList = () => {
    const {salaryRangesList} = props

    return (
      <ul className="employe-container">
        {salaryRangesList.map(eachEmploymentType => {
          const onSelectEmployeeType = event => {
            const {onSalaryChange} = props
            console.log(event.target.value)

            onSalaryChange(eachEmploymentType.salaryRangeId)
          }

          return (
            <li
              key={eachEmploymentType.salaryRangeId}
              className="employee-item-container"
            >
              <input
                type="radio"
                id={eachEmploymentType.salaryRangeId}
                name="salary"
                className="checkox-item"
                onClick={onSelectEmployeeType}
                value={eachEmploymentType.salaryRangeId}
              />
              <label htmlFor={eachEmploymentType.salaryRangeId}>
                {eachEmploymentType.label}
              </label>
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className="filter-group-container">{renderEmploymentTypesList()}</div>
  )
}

export default SalaryFilter
