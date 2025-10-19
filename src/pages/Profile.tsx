import React, { useState, useEffect } from 'react';
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
  IonText,
  IonIcon,
  IonButton,
  IonAvatar,
  IonAlert,
  IonSpinner
} from '@ionic/react';
import { person, mail, calendar, logOut, heart } from 'ionicons/icons';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { useHistory } from 'react-router-dom';

interface UserData {
  name: string;
  email: string;
  createdAt: any;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const history = useHistory();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    if (!auth.currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString();
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="love-gradient">
            <IonTitle>👤 Profile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="love-gradient">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh',
            color: 'white'
          }}>
            <div style={{ textAlign: 'center' }}>
              <IonSpinner name="crescent" style={{ marginBottom: '20px' }} />
              <p>Loading profile...</p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="love-gradient">
          <IonTitle>👤 Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="love-gradient">
        <div style={{ padding: '16px' }}>
          {/* Profile Card */}
          <IonCard style={{ borderRadius: '16px', marginBottom: '20px' }}>
            <IonCardContent style={{ padding: '30px 20px', textAlign: 'center' }}>
              <IonAvatar style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 20px',
                background: 'linear-gradient(135deg, #ff6b9d, #c44569)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IonIcon icon={person} style={{ fontSize: '2.5rem', color: 'white' }} />
              </IonAvatar>
              
              <h2 style={{ margin: '0 0 10px 0', color: 'var(--ion-color-primary)' }}>
                {userData?.name || 'User'}
              </h2>
              
              <IonText color="medium">
                <p style={{ margin: 0, fontSize: '1rem' }}>
                  {userData?.email || auth.currentUser?.email}
                </p>
              </IonText>
            </IonCardContent>
          </IonCard>

          {/* Account Info */}
          <IonCard style={{ borderRadius: '16px', marginBottom: '20px' }}>
            <IonCardContent style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 20px 0', color: 'var(--ion-color-primary)' }}>
                Account Information
              </h3>
              
              <IonItem lines="none" style={{ marginBottom: '10px' }}>
                <IonIcon icon={person} slot="start" color="primary" />
                <IonLabel>
                  <h4>Full Name</h4>
                  <p>{userData?.name || 'Not provided'}</p>
                </IonLabel>
              </IonItem>

              <IonItem lines="none" style={{ marginBottom: '10px' }}>
                <IonIcon icon={mail} slot="start" color="primary" />
                <IonLabel>
                  <h4>Email Address</h4>
                  <p>{userData?.email || auth.currentUser?.email}</p>
                </IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={calendar} slot="start" color="primary" />
                <IonLabel>
                  <h4>Member Since</h4>
                  <p>{formatDate(userData?.createdAt)}</p>
                </IonLabel>
              </IonItem>
            </IonCardContent>
          </IonCard>

          {/* App Info */}
          <IonCard style={{ borderRadius: '16px', marginBottom: '20px' }}>
            <IonCardContent style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 20px 0', color: 'var(--ion-color-primary)' }}>
                About Love Diary
              </h3>
              
              <div style={{ textAlign: 'center', color: 'var(--ion-color-medium)' }}>
                <IonIcon icon={heart} style={{ fontSize: '2rem', marginBottom: '10px', color: 'var(--ion-color-secondary)' }} />
                <p style={{ margin: '0 0 10px 0' }}>
                  Digital Love Diary v1.0
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                  A beautiful way to send love letters to your special someone 💕
                </p>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Logout Button */}
          <IonButton
            expand="block"
            fill="outline"
            color="danger"
            onClick={() => setShowLogoutAlert(true)}
            style={{ 
              height: '50px',
              borderRadius: '12px',
              marginTop: '20px'
            }}
          >
            <IonIcon icon={logOut} slot="start" />
            Sign Out
          </IonButton>
        </div>

        <IonAlert
          isOpen={showLogoutAlert}
          onDidDismiss={() => setShowLogoutAlert(false)}
          header="Sign Out"
          message="Are you sure you want to sign out?"
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Sign Out',
              handler: handleLogout
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Profile;
