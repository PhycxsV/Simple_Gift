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
  IonSpinner,
  IonAlert
} from '@ionic/react';
import { heart, time, person, eye } from 'ionicons/icons';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { useHistory } from 'react-router-dom';

interface Letter {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  content: string;
  category: string;
  sentAt: any;
  read: boolean;
}

const Inbox: React.FC = () => {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'letters'),
      where('recipientId', '==', auth.currentUser.uid),
      orderBy('sentAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lettersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Letter[];

      setLetters(lettersData);
      setLoading(false);
      updateBadge(lettersData);
    }, (error) => {
      console.error('Error loading letters:', error);
      setError('Failed to load letters');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateBadge = (lettersData: Letter[]) => {
    const unreadCount = lettersData.filter(letter => !letter.read).length;
    const badge = document.getElementById('inbox-badge') as HTMLElement;
    if (badge) {
      badge.textContent = unreadCount.toString();
      badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    // Refresh is handled by the real-time listener
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  const openLetter = async (letter: Letter) => {
    // Mark as read if not already read
    if (!letter.read) {
      try {
        await updateDoc(doc(db, 'letters', letter.id), {
          read: true
        });
      } catch (error) {
        console.error('Error marking letter as read:', error);
      }
    }

    // Navigate to letter detail
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
            <IonTitle>💌 Love Letters</IonTitle>
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
              <p>Loading your love letters...</p>
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
          <IonTitle>💌 Love Letters</IonTitle>
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
            <IonIcon icon={heart} style={{ fontSize: '4rem', marginBottom: '20px' }} />
            <h2 style={{ margin: '0 0 10px 0' }}>No love letters yet</h2>
            <p style={{ opacity: 0.8, margin: 0 }}>
              Letters from your special someone will appear here
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
                  opacity: letter.read ? 0.8 : 1,
                  borderLeft: letter.read ? '4px solid #ccc' : '4px solid var(--ion-color-secondary)'
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
                      {!letter.read && (
                        <IonBadge color="danger" style={{ fontSize: '0.7rem' }}>
                          New
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
                        From: <strong>{letter.senderName}</strong>
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

        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          header="Error"
          message={error}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Inbox;
