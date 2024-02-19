import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { createUser } from '../utils/auth';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
        const token = await createUser(email, password);
        authCtx.authenticate(token)
    } catch (error) {
        Alert.alert("Authentification failed", "Could not log you in. Please, check your credentials")
        setIsAuthenticating(false);
    }
    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;