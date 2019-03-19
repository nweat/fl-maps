import React, { Component } from 'react'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import HowToHelpSection from './HowToHelpSection'
import './styles.scss'

class Home extends Component {
  componentDidMount () {
    window.__setDocumentTitle('Home')
  }

  render () {
    let url
    let opacity
    if (window.__mapType === 'gatherings') {
      url = '/images/btm-bg.jpeg' //use a brighter picture for focallocal like this one
      opacity = 1
    } else {
      url = '/images/btm-bg.jpeg'
    }
    let backgroundImage = {backgroundImage: 'url(' + url + ')', opacity}
    return (
      <main className='home'>
        <div id='hero-bg' style={backgroundImage} />
        <FirstSection />
        <SecondSection button/>
        <HowToHelpSection />
      </main>
    )
  }
}

export default Home
