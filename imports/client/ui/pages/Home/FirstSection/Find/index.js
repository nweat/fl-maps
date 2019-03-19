import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { FormGroup, Label, InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import getUserPosition, {getCurrentLocation, storeUserLocation} from '/imports/client/utils/location/getUserPosition'
import i18n from '/imports/both/i18n/en'

const { Home } = i18n
let color
let titleColor = {color: color}

class Find extends Component {
 state = {
   error: null,
   isGettingLocation: false,
   userLocation: null,
   search: ''
 }

 componentDidMount () {
   this._isMounted = true
 }

 componentWillUnmount () {
   this._isMounted = false
 }

 render () {
   const {
     error,
     isGettingLocation,
     userLocation,
     search
   } = this.state

   if (userLocation) {
     window.previousStateOfMap = undefined
     return <Redirect to='/map' />
   }

   return (
     <FormGroup className='find-wrapper'>
       <h1 className="display-5 text-center welcome-text" style={
         (window.__mapType === 'gatherings') ? titleColor = {color: 'rgba(255,255,255,1)'} : titleColor = {color: '#ffffff'}}
       >{Home.first_title}</h1>

       <InputGroup>
        <InputGroupAddon addonType="prepend">
          <i class="fas fa-location-arrow" title="Use current location" onClick={this.findByCurrentLocation}></i>
        </InputGroupAddon>
        <Input
           id='find'
           type='text'
           value={search}
           invalid={error}
           placeholder='Find the #PublicHappinessMovement near me'
           onChange={this.handleSearch}
           onFocus={this.removeError}
         />
         <InputGroupAddon addonType='append'>
           <Button onClick={this.findBySearch} disabled={isGettingLocation} className="search-button">
             <i class="fas fa-search" style={{color: '#666666'}}></i>
           </Button>
         </InputGroupAddon>
       </InputGroup>
       {error && <div className='error-msg'>Couldn't find anything..</div> }
       <div className='divider'></div>
       <div className='center'>
         {/*<Button onClick={this.findByCurrentLocation}>*/}
           {/*Use Current Location*/}
         {/*</Button>*/}
       </div>
     </FormGroup>
   )
 }

 findBySearch = () => {
   const { search } = this.state
   if (search.trim().length > 0) {
     NProgress.set(0.4) // set progressbar

     this.setState({ isGettingLocation: true }) // activates loading indicator
     geocodeByAddress(search)
       .then(results => getLatLng(results[0]))
       .then(({ lat, lng }) => {
         NProgress.done()
         storeUserLocation({ lat, lng })
         this.setState({ userLocation: true })
       })
       .catch(() => {
         NProgress.done()
         this.setState({ error: true, isGettingLocation: false })
       })
   } else {
     // If search with empty value
     this.setState({ error: true })
   }
 }

 findByCurrentLocation = () => {
   getCurrentLocation(this) // will update state with latLng/error object
 }

 handleSearch = ({ target }) => {
   this.setState({ search: target.value })
 }

 removeError = () => this.setState({ error: false })
}

export default Find
