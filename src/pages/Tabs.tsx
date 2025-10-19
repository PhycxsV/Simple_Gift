import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/react';
import { mail, create, paperPlane, person } from 'ionicons/icons';
import { Route, Redirect } from 'react-router-dom';
import Inbox from './Inbox';
import Compose from './Compose';
import Sent from './Sent';
import Profile from './Profile';

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom" style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)'
      }}>
        <IonTabButton tab="inbox" href="/tabs/inbox">
          <IonIcon icon={mail} />
          <IonLabel>Inbox</IonLabel>
          <IonBadge color="danger" id="inbox-badge" style={{ display: 'none' }}>0</IonBadge>
        </IonTabButton>

        <IonTabButton tab="compose" href="/tabs/compose">
          <IonIcon icon={create} />
          <IonLabel>Write</IonLabel>
        </IonTabButton>

        <IonTabButton tab="sent" href="/tabs/sent">
          <IonIcon icon={paperPlane} />
          <IonLabel>Sent</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <Route exact path="/tabs">
        <Redirect to="/tabs/inbox" />
      </Route>
      <Route exact path="/tabs/inbox" component={Inbox} />
      <Route exact path="/tabs/compose" component={Compose} />
      <Route exact path="/tabs/sent" component={Sent} />
      <Route exact path="/tabs/profile" component={Profile} />
    </IonTabs>
  );
};

export default Tabs;
