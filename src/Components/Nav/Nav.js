import React, { Component } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, logoutUser } from '../../redux/reducer';
import './Nav.css';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    console.log('checking log')
    axios.get('/api/auth/me')
      .then(res => {
        console.log(res.data)
        const { username, profilePicture } = res.data;
        this.props.updateUser({ username, profilePicture })
      })
      .catch(err => console.log(err))
  }

  logout() {
    axios.post('/api/auth/logout')
      .then(res => this.props.logoutUser())
  }

  render() {
    // console.log(this.props)

    return this.props.location.pathname !== '/' &&
      <div className='nav'>
        <div className='nav-profile-container'>
          <div style={{ backgroundImage: `url(${this.props.profilePicture})` }} className='nav-profile-pic'></div>
          <p>{this.props.username}</p>
        </div>
        <div className='nav-links'>
          <Link to='/dash' ><img className='nav-img' src={homeLogo} alt='home' /></Link>
          <Link to='/form' ><img className='nav-img' src={newLogo} alt='new post' /></Link>
        </div>
        <Link to='/' ><img className='nav-img logout' src={logoutLogo} alt='logout' /></Link>
        {/* <button onClick={this.getUser}>getUser</button> */}
      </div>
  }
}

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps, { updateUser, logoutUser })(Nav));