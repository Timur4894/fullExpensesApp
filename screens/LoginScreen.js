import AuthContent from '../components/auth/AuthContent';
import { useState } from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { login } from '../utils/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';
import { useContext } from 'react';

 

function LoginScreen() {
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContext)

    async function loginHandler({ email, password }) {
        setIsAuthenticating(true);
        try{ 
            const token = await login(email, password);
            authCtx.authenticate(token)
        } catch (error) {
            Alert.alert("Authentification failed", "Could not log you in. Please, check your credentials")
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message="Logging you in..." />;
    }

    return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;