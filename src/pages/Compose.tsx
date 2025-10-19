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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonIcon,
  IonSpinner,
  IonAlert,
  IonToast
} from '@ionic/react';
import { paperPlane, mail, create, heart, tag } from 'ionicons/icons';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../services/firebase';
import { useHistory } from 'react-router-dom';

const Compose: React.FC = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [category, setCategory] = useState('daily');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const history = useHistory();

  const categories = [
    { value: 'daily', label: 'Daily Thoughts', icon: '💭' },
    { value: 'memory', label: 'Special Memory', icon: '💝' },
    { value: 'future', label: 'Future Dreams', icon: '✨' },
    { value: 'appreciation', label: 'Appreciation', icon: '🙏' },
    { value: 'surprise', label: 'Surprise Message', icon: '🎁' }
  ];

  const handleSendLetter = async () => {
    if (!recipientEmail || !subject || !content) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(recipientEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if recipient exists
      const recipientQuery = query(
        collection(db, 'users'),
        where('email', '==', recipientEmail)
      );
      
      const recipientSnapshot = await getDocs(recipientQuery);
      
      if (recipientSnapshot.empty) {
        setError('Recipient not found. Please check the email address.');
        setLoading(false);
        return;
      }

      const recipientDoc = recipientSnapshot.docs[0];
      const recipientId = recipientDoc.id;
      const recipientData = recipientDoc.data();

      // Create letter document
      const letterData = {
        senderId: auth.currentUser!.uid,
        senderEmail: auth.currentUser!.email,
        senderName: auth.currentUser!.displayName || 'Anonymous',
        recipientId: recipientId,
        recipientEmail: recipientEmail,
        recipientName: recipientData.name,
        category: category,
        subject: subject,
        content: content,
        sentAt: new Date(),
        read: false
      };

      await addDoc(collection(db, 'letters'), letterData);

      // Clear form
      setRecipientEmail('');
      setSubject('');
      setContent('');
      setCategory('daily');

      setSuccess('Love letter sent successfully! 💕');
      
      // Switch to sent tab after a short delay
      setTimeout(() => {
        history.push('/tabs/sent');
      }, 2000);
      
    } catch (error: any) {
      setError('Error sending letter: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="love-gradient">
          <IonTitle>✍️ Write Love Letter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="love-gradient">
        <div style={{ padding: '16px' }}>
          <IonCard style={{ borderRadius: '16px' }}>
            <IonCardContent style={{ padding: '20px' }}>
              <IonItem style={{ marginBottom: '20px', borderRadius: '12px' }}>
                <IonIcon icon={mail} slot="start" color="primary" />
                <IonLabel position="stacked">Recipient's Email</IonLabel>
                <IonInput
                  type="email"
                  value={recipientEmail}
                  onIonInput={(e) => setRecipientEmail(e.detail.value!)}
                  placeholder="their@email.com"
                />
              </IonItem>

              <IonItem style={{ marginBottom: '20px', borderRadius: '12px' }}>
                <IonIcon icon={tag} slot="start" color="primary" />
                <IonLabel position="stacked">Letter Category</IonLabel>
                <IonSelect
                  value={category}
                  onSelectionChange={(e) => setCategory(e.detail.value)}
                  placeholder="Select category"
                >
                  {categories.map((cat) => (
                    <IonSelectOption key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem style={{ marginBottom: '20px', borderRadius: '12px' }}>
                <IonIcon icon={heart} slot="start" color="primary" />
                <IonLabel position="stacked">Subject</IonLabel>
                <IonInput
                  type="text"
                  value={subject}
                  onIonInput={(e) => setSubject(e.detail.value!)}
                  placeholder="Love letter subject"
                />
              </IonItem>

              <IonItem style={{ marginBottom: '30px', borderRadius: '12px' }}>
                <IonIcon icon={create} slot="start" color="primary" />
                <IonLabel position="stacked">Your Love Letter</IonLabel>
                <IonTextarea
                  value={content}
                  onIonInput={(e) => setContent(e.detail.value!)}
                  placeholder="Write your beautiful love letter here..."
                  rows={8}
                  style={{ minHeight: '200px' }}
                />
              </IonItem>

              <IonButton
                expand="block"
                onClick={handleSendLetter}
                disabled={loading}
                style={{ 
                  height: '50px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)'
                }}
              >
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    <IonIcon icon={paperPlane} slot="start" />
                    Send Love Letter
                  </>
                )}
              </IonButton>
            </IonCardContent>
          </IonCard>

          {/* Tips Card */}
          <IonCard style={{ marginTop: '20px', borderRadius: '16px' }}>
            <IonCardContent style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 15px 0', color: 'var(--ion-color-primary)' }}>
                💡 Writing Tips
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--ion-color-medium)' }}>
                <li>Be genuine and speak from your heart</li>
                <li>Share specific memories or moments</li>
                <li>Express what you love about them</li>
                <li>Include your hopes for the future</li>
                <li>Don't worry about perfect grammar - love is messy!</li>
              </ul>
            </IonCardContent>
          </IonCard>
        </div>

        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError('')}
          header="Error"
          message={error}
          buttons={['OK']}
        />

        <IonToast
          isOpen={!!success}
          onDidDismiss={() => setSuccess('')}
          message={success}
          duration={3000}
          color="success"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Compose;
