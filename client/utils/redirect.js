import store from '../store';
import addFlashMessage from '../actions/actionCreators/flashMessage';

const redirect = props => {
  const redirectPath = props.history.location.pathname;
  store.dispatch(addFlashMessage({
    type: 'failed',
    text: 'Sorry!!!. Please login to continue'
  }));
  props.history.push(`/signin?redirect=${redirectPath}`);
};

export default redirect;
