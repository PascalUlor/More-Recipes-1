import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from 'react-md-spinner';
import NavBar from './NavBar.jsx';
import MainCover from './homePage/MainCover.jsx';
import PopularRecipes from './homePage/PopularRecipes.jsx';
import Footer from './Footer.jsx';
import fetchPopularRecipesRequest from
'../actions/actionCreators/popularRecipesActions';
import verifyToken from '../utils/verifyToken';


/**
 * @description HOC for all Homepage component
 *
 * @class Homepage
 *
 * @extends Component
 */
class Homepage extends Component {
	/**
   * @description handles token verification and fetching of popular recipes
   * 
   * @method componentDidMount
   *
   * @returns { * } null
    */
	componentDidMount() {
		if (verifyToken()) {
			this.context.router.history.push('/dashboard');
		}
		const { fetchPopularRecipes } = this.props;
    fetchPopularRecipes();
	}
	/**
   * @description renders Home Page
   *
   * @returns { jsx } jsx - renders Home Page components
   */
	render() {
		const { isFetching, fetchedPopularRecipes } = this.props;
		return (
			<div className="bg-faded">
				<div className="main-wrapper mt-0">
					<NavBar/>
					{isFetching ? 
						<div className="text-center">
            	<Spinner size={50} className="mt-5"/>
						</div>
						:
						<div className="content clear-top">
							<MainCover/>
							<PopularRecipes fetchedPopularRecipes={fetchedPopularRecipes}/>
						</div>
					}
				</div>
				<Footer/>
			</div>
		);
	}
}

Homepage.propTypes = {
  fetchedPopularRecipes: PropTypes.array.isRequired,
  fetchPopularRecipes: PropTypes.func.isRequired
};

Homepage.contextTypes = {
  router: PropTypes.shape().isRequired
};

/**
 * @description maps redux state to props
 *
 * @param { object } state - holds Home Page state
 *
 * @return { object } props - returns mapped props from state
 */
const mapStateToProps = state => ({
	fetchedPopularRecipes: state.popularRecipes.fetchedPopularRecipes,
	isFetching: state.popularRecipes.isPopularRecipesFetching
});
/**
 * @description maps action dispatch to props
 *
 * @param { object } dispatch - holds dispatchable actions
 *
 * @return { object } props - returns mapped props from dispatch action
 */
const mapDispatchToProps = dispatch => ({
  fetchPopularRecipes: () => dispatch(fetchPopularRecipesRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
