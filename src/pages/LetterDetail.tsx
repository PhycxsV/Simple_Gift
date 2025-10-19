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
  IonButton,
  IonSpinner,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import { person, time, tag, heart, paperPlane } from 'ionicons/icons';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { useParams, useHistory } from 'react-router-dom';

interface Letter {
  id: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  recipientId: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  content: string;
  category: string;
  sentAt: any;
  read: boolean;
}

const LetterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (id) {
      loadLetter(id);
    }
  }, [id]);

  const loadLetter = async (letterId: string) => {
    try {
      const letterDoc = await getDoc(doc(db, 'letters', letterId));
      if (letterDoc.exists()) {
        const letterData = { id: letterDoc.id, ...letterDoc.data() } as Letter;
        setLetter(letterData);

        // Mark as read if it's an inbox letter and not already read
        if (letterData.recipientId === auth.currentUser?.uid && !letterData.read) {
          await updateDoc(doc(db, 'letters', letterId), {
            read: true
          });
        }
      } else {
        history.push('/tabs');
      }
    } catch (error) {
      console.error('Error loading letter:', error);
      history.push('/tabs');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'Recently';
    
    const letterDate = date.toDate ? date.toDate() : new Date(date);
    return letterDate.toLocaleString();
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

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      daily: '💭',
      memory: '💝',
      future: '✨',
      appreciation: '🙏',
      surprise: '🎁'
    };
    return icons[category] || '💌';
  };

  const isInboxLetter = letter?.recipientId === auth.currentUser?.uid;
  const isSentLetter = letter?.senderId === auth.currentUser?.uid;

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="love-gradient">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs" />
            </IonButtons>
            <IonTitle>Loading...</IonTitle>
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
              <p>Loading letter...</p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!letter) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar className="love-gradient">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tabs" />
            </IonButtons>
            <IonTitle>Letter Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="love-gradient">
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
            <h2 style={{ margin: '0 0 10px 0' }}>Letter not found</h2>
            <p style={{ opacity: 0.8, margin: 0 }}>
              This letter may have been deleted or you don't have permission to view it.
            </p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="love-gradient">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs" />
          </IonButtons>
          <IonTitle>Love Letter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="love-gradient">
        <div style={{ padding: '16px' }}>
          {/* Letter Header */}
          <IonCard style={{ borderRadius: '16px', marginBottom: '20px' }}>
            <IonCardContent style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <IonText>
                  <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '600', color: 'var(--ion-color-primary)' }}>
                    {letter.subject}
                  </h1>
                </IonText>
                <IonBadge 
                  color={getCategoryColor(letter.category)}
                  className="category-badge"
                >
                  {getCategoryIcon(letter.category)} {letter.category}
                </IonBadge>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IonIcon icon={person} size="small" color="primary" />
                  <IonText style={{ fontSize: '0.9rem' }}>
                    {isInboxLetter ? 'From' : 'To'}: <strong>
                      {isInboxLetter ? letter.senderName : (letter.recipientName || letter.recipientEmail)}
                    </strong>
                  </IonText>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IonIcon icon={time} size="small" color="medium" />
                  <IonText color="medium" style={{ fontSize: '0.9rem' }}>
                    Sent: {formatDate(letter.sentAt)}
                  </IonText>
                </div>

                {isSentLetter && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IonIcon icon={letter.read ? 'checkmark-circle' : 'time'} size="small" color={letter.read ? 'success' : 'warning'} />
                    <IonText color={letter.read ? 'success' : 'warning'} style={{ fontSize: '0.9rem' }}>
                      {letter.read ? 'Read' : 'Unread'}
                    </IonText>
                  </div>
                )}
              </div>
            </IonCardContent>
          </IonCard>

          {/* Letter Content */}
          <IonCard style={{ borderRadius: '16px', marginBottom: '20px' }}>
            <IonCardContent style={{ padding: '25px' }}>
              <div style={{ 
                lineHeight: '1.6', 
                fontSize: '1rem',
                color: 'var(--ion-color-dark)',
                whiteSpace: 'pre-wrap',
                fontFamily: 'Georgia, serif'
              }}>
                {letter.content}
              </div>
            </IonCardContent>
          </IonCard>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <IonButton
              expand="block"
              fill="outline"
              onClick={() => history.push('/tabs/compose')}
              style={{ 
                height: '45px',
                borderRadius: '12px'
              }}
            >
              <IonIcon icon={paperPlane} slot="start" />
              Reply
            </IonButton>
            
            <IonButton
              expand="block"
              onClick={() => history.push('/tabs')}
              style={{ 
                height: '45px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ff6b9d, #c44569)'
              }}
            >
              <IonIcon icon={heart} slot="start" />
              Back to Letters
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LetterDetail;
