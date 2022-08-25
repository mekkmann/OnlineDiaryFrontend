import React from 'react';

import Loading from '../components/loading';

import { useAuth0, withAuthenticationRequired} from '@auth0/auth0-react';

const Profile = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  return (
    <div>
      <h1>TBD: To remove this or to style?</h1>
      <h2>Does this page serve ANY purpose since the account is connected via Auth0?</h2>
      <ul>
          <li>Name: {name}</li>
          <li><img src={picture} alt='Profile'/></li>
          <li>Gmail: {email}</li>
      </ul>
      <pre>
          {JSON.stringify(user, null, 2)}
      </pre>
    </div>
    
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
