import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
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
import { heart, mail, lock, person, arrowBack } from 'ionicons/icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useHistory } from 'react-router-dom';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Save user profile
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        createdAt: new Date()
      });

      history.push('/tabs');
    } catch (error: any) {
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Email already in use';
      case 'auth/weak-password':
        return 'Password is too weak';
      case 'auth/invalid-email':
        return 'Invalid email address';
      default:
        return 'Signup failed. Please try again.';
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
              Join Our Love Story
            </h1>
            <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>
              Create your romantic account 💕
            </p>
          </div>

          {/* Signup Form */}
          <IonCard style={{ 
            width: '100%', 
            maxWidth: '400px', 
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <IonCardContent style={{ padding: '40px 30px' }}>
              <IonItem style={{ marginBottom: '20px', borderRadius: '12px' }}>
                <IonIcon icon={person} slot="start" color="primary" />
                <IonLabel position="stacked">Full Name</IonLabel>
                <IonInput
                  type="text"
                  value={name}
                  onIonInput={(e) => setName(e.detail.value!)}
                  placeholder="Your full name"
                />
              </IonItem>

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
                  placeholder="Create password (min 6 characters)"
                />
              </IonItem>

              <IonButton
                expand="block"
                onClick={handleSignup}
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
                    Create Account
                  </>
                )}
              </IonButton>

              <div style={{ textAlign: 'center' }}>
                <IonText color="medium">
                  Already have an account?{' '}
                  <IonButton
                    fill="clear"
                    size="small"
                    onClick={() => history.push('/login')}
                    style={{ 
                      color: 'var(--ion-color-primary)',
                      textDecoration: 'underline',
                      margin: 0,
                      padding: 0
                    }}
                  >
                    <IonIcon icon={arrowBack} slot="start" />
                    Sign in
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
          header="Signup Error"
          message={error}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Signup;
