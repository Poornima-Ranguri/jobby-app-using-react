import './index.css'

const FilterGroup = props => {
  const renderEmploymentTypesList = () => {
    const {employmentTypesList} = props

    return (
      <ul className="employe-container">
        {employmentTypesList.map(eachEmploymentType => {
          const onSelectEmployeeType = event => {
            const {onUpdateEmployeeType} = props
            console.log(event.target.value)

            onUpdateEmployeeType(event.target.value)
          }

          return (
            <li
              key={eachEmploymentType.employmentTypeId}
              className="employee-item-container"
            >
              <input
                type="checkbox"
                id={eachEmploymentType.employmentTypeId}
                className="checkox-item"
                onChange={onSelectEmployeeType}
                value={eachEmploymentType.employmentTypeId}
              />
              <label htmlFor={eachEmploymentType.employmentTypeId}>
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

export default FilterGroup
