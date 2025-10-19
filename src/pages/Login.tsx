import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import { heart, mail, lock, personAdd } from 'ionicons/icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useHistory } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push('/tabs');
    } catch (error: any) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email';
      case 'auth/wrong-password':
        return 'Incorrect password';
      case 'auth/invalid-email':
        return 'Invalid email address';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      default:
        return 'Login failed. Please try again.';
    }
  };

  return (
    <IonPage>
      <IonContent className="love-gradient">
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '100vh',
          padding: '20px'
        }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '40px', color: 'white' }}>
            <IonIcon 
              icon={heart} 
              style={{ fontSize: '4rem', marginBottom: '20px' }} 
              className="heart-animation"
            />
            <h1 style={{ 
              fontFamily: 'Dancing Script, cursive', 
              fontSize: '2.5rem', 
              fontWeight: '700',
              margin: '0 0 10px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              Digital Love Diary
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>
              Send your heart's messages 💕
            </p>
          </div>

          {/* Login Form */}
          <IonCard style={{ 
            width: '100%', 
            maxWidth: '400px', 
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <IonCardContent style={{ padding: '40px 30px' }}>
              <IonItem style={{ marginBottom: '20px', borderRadius: '12px' }}>
                <IonIcon icon={mail} slot="start" color="primary" />
                <IonLabel position="stacked">Email Address</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonInput={(e) => setEmail(e.detail.value!)}
                  placeholder="your@email.com"
                />
              </IonItem>

              <IonItem style={{ marginBottom: '30px', borderRadius: '12px' }}>
                <IonIcon icon={lock} slot="start" color="primary" />
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonInput={(e) => setPassword(e.detail.value!)}
                  placeholder="Your password"
                />
              </IonItem>

              <IonButton
                expand="block"
                onClick={handleLogin}
                disabled={loading}
                style={{ 
                  marginBottom: '20px',
                  height: '50px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ff6b9d, #c44569)'
                }}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    <IonIcon icon={heart} slot="start" />
                    Enter Love Diary
                  </>
                )}
              </IonButton>

              <div style={{ textAlign: 'center' }}>
                <IonText color="medium">
                  Don't have an account?{' '}
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={() => history.push('/signup')}
                    style={{ 
                      color: 'var(--ion-color-primary)',
                      textDecoration: 'underline',
                      margin: 0,
                      padding: 0
                    }}
                  >
                    <IonIcon icon={personAdd} slot="start" />
                    Create one
                  </IonButton>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Error Alert */}
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          header="Login Error"
          message={error}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
