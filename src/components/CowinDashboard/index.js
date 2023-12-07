// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiConstants = {
  success: 'SUCCESS',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    last7VaccinationDays: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstants.inprogress})
    const apiUrl = ' https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const formattedData = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))
      this.setState({
        last7VaccinationDays: formattedData,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
        apiStatus: apiConstants.success,
      })
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      last7VaccinationDays,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage vaccinationDetails={last7VaccinationDays} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  inProgressView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderCowinDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()

      case apiConstants.inprogress:
        return this.inProgressView()

      default:
        return null
    }
  }

  render() {
    const {
      apiStatus,
      last7VaccinationDays,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    console.log(apiStatus)
    console.log(last7VaccinationDays)
    console.log(vaccinationByAge)
    console.log(vaccinationByGender)
    return (
      <div className="cowin-container">
        <div className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <h1 className="heading">Co-WIN</h1>
        </div>
        <h1 className="title">CoWIN Vaccination in India</h1>
        {this.renderCowinDetails()}
      </div>
    )
  }
}

export default CowinDashboard
