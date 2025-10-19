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
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonSpinner
} from '@ionic/react';
import { paperPlane, time, person, checkmark } from 'ionicons/icons';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { useHistory } from 'react-router-dom';

interface Letter {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  content: string;
  category: string;
  sentAt: any;
  read: boolean;
}

const Sent: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'letters'),
      where('senderId', '==', auth.currentUser.uid),
      orderBy('sentAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lettersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Letter[];

      setLetters(lettersData);
      setLoading(false);
    }, (error) => {
      console.error('Error loading sent letters:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRefresh = async (event: CustomEvent) => {
    // Refresh is handled by the real-time listener
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  const openLetter = (letter: Letter) => {
    history.push(`/letter/${letter.id}`);
  };

  const formatDate = (date: any) => {
    if (!date) return 'Recently';
    
    const now = new Date();
    const letterDate = date.toDate ? date.toDate() : new Date(date);
    const diffTime = Math.abs(now.getTime() - letterDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return letterDate.toLocaleDateString();
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      daily: 'primary',
      memory: 'secondary',
      future: 'success',
      appreciation: 'warning',
      surprise: 'danger'
    };
    return colors[category] || 'medium';
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="love-gradient">
            <IonTitle>📤 Sent Letters</IonTitle>
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
              <p>Loading your sent letters...</p>
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
          <IonTitle>📤 Sent Letters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="love-gradient">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {letters.length === 0 ? (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '60vh',
            color: 'white',
            textAlign: 'center',
            padding: '20px'
          }}>
            <IonIcon icon={paperPlane} style={{ fontSize: '4rem', marginBottom: '20px' }} />
            <h2 style={{ margin: '0 0 10px 0' }}>No letters sent yet</h2>
            <p style={{ opacity: 0.8, margin: 0 }}>
              Your sent love letters will appear here
            </p>
          </div>
        ) : (
          <div style={{ padding: '16px' }}>
            {letters.map((letter) => (
              <IonCard 
                key={letter.id} 
                className="letter-card"
                onClick={() => openLetter(letter)}
                style={{ 
                  cursor: 'pointer',
                  borderLeft: '4px solid var(--ion-color-primary)'
                }}
              >
                <IonCardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <IonText>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>
                        {letter.subject}
                      </h3>
                    </IonText>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {letter.read && (
                        <IonBadge color="success" style={{ fontSize: '0.7rem' }}>
                          <IonIcon icon={checkmark} size="small" />
                          Read
                        </IonBadge>
                      )}
                      <IonText color="medium" style={{ fontSize: '0.9rem' }}>
                        {formatDate(letter.sentAt)}
                      </IonText>
                    </div>
                  </div>

                  <IonText color="medium" style={{ marginBottom: '10px', display: 'block' }}>
                    {letter.content.substring(0, 100)}
                    {letter.content.length > 100 && '...'}
                  </IonText>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <IonIcon icon={person} size="small" color="primary" />
                      <IonText style={{ fontSize: '0.9rem' }}>
                        To: <strong>{letter.recipientName || letter.recipientEmail}</strong>
                      </IonText>
                    </div>
                    <IonBadge 
                      color={getCategoryColor(letter.category)}
                      className="category-badge"
                    >
                      {letter.category}
                    </IonBadge>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Sent;
