
import Loading from '../components/loading';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const Home = () => {

  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return (
      <div>
        <h1>PHHomePage</h1>


      </div>
    );
  };

  return (
    <div>
      <h1>PHHomePage</h1>
      <h3>Please log in to continue</h3>
    </div>
  );
}

export default withAuthenticationRequired(Home, {
  onRedirecting: () => <Loading />,
});
