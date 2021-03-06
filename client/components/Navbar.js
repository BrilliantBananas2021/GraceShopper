import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, isAdmin, userId, cart}) => (
  <div className="frontPageText">
    <h1 id="brandName">VIRTUAL REALTY</h1>
    <nav>
      <Link to="/home">Home</Link>
      <Link to="/properties">Properties</Link>
      <Link to={`/cart/${userId}`}>
        Cart (
        {isLoggedIn
          ? cart.filter(property => property.status !== 'sold').length
          : 0}
        )
      </Link>
      <Link to={`/cart/${userId}/pastorders`}>
        Portfolio (
        {isLoggedIn
          ? cart.filter(property => property.status === 'sold').length
          : 0}
        )
      </Link>

      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="#" onClick={handleClick}>
            Logout
          </Link>
        </div>
      ) : (
        <>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}

      {isAdmin ? (
        <div>
          {/* The navbar will show this link if you are logged in as an administrator*/}
          {<Link to="/admin">Admin</Link>}
        </div>
      ) : (
        <></>
      )}
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!(state.user.email === 'admin'),
    userId: state.user.id,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
