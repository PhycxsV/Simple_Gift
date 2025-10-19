import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/common/CustomButton';
import {colors} from '../theme/theme';

interface RoomDashboardScreenProps {
  navigation: any;
  route: any;
}

const RoomDashboardScreen: React.FC<RoomDashboardScreenProps> = ({
  navigation,
  route,
}) => {
  const {roomName, roomCode, isOwner} = route.params;
  const [recentLetters, setRecentLetters] = useState([
    {
      id: '1',
      title: 'Good Morning Love 💕',
      preview: 'Hope you have an amazing day ahead...',
      sender: 'You',
      time: '2 hours ago',
      isRead: true,
    },
    {
      id: '2',
      title: 'Thank you for yesterday',
      preview: 'That was such a wonderful evening...',
      sender: 'Partner',
      time: '1 day ago',
      isRead: false,
    },
  ]);

  const handleComposeLetter = () => {
    navigation.navigate('Compose');
  };

  const handleViewInbox = () => {
    navigation.navigate('Inbox');
  };

  const handleShareRoomCode = () => {
    Alert.alert(
      'Room Code',
      `Room Code: ${roomCode}\n\nShare this code with your partner so they can join your room.`,
      [
        {text: 'OK'},
        {
          text: 'Copy Code',
          onPress: () => {
            // TODO: Implement clipboard functionality
            Alert.alert('Copied!', 'Room code copied to clipboard');
          },
        },
      ]
    );
  };

  const handleLeaveRoom = () => {
    Alert.alert(
      'Leave Room',
      'Are you sure you want to leave this room? You will need the room code to join again.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Leave',
          style: 'destructive',
          onPress: () => navigation.navigate('RoomSelection'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Room Header */}
          <View style={styles.roomHeader}>
            <View style={styles.roomInfo}>
              <Text style={styles.roomName}>{roomName}</Text>
              <View style={styles.roomCodeContainer}>
                <Text style={styles.roomCodeLabel}>Room Code:</Text>
                <Text style={styles.roomCode}>{roomCode}</Text>
                <TouchableOpacity
                  style={styles.shareButton}
                  onPress={handleShareRoomCode}>
                  <Icon name="share" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => navigation.navigate('Profile')}>
              <Icon name="settings" size={24} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <CustomButton
              title="Write Letter"
              onPress={handleComposeLetter}
              variant="primary"
              size="large"
              style={styles.actionButton}
            />
            <CustomButton
              title="View Inbox"
              onPress={handleViewInbox}
              variant="secondary"
              size="large"
              style={styles.actionButton}
            />
          </View>

          {/* Recent Letters */}
          <View style={styles.recentSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Letters</Text>
              <TouchableOpacity onPress={handleViewInbox}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {recentLetters.length > 0 ? (
              <View style={styles.lettersList}>
                {recentLetters.map(letter => (
                  <TouchableOpacity
                    key={letter.id}
                    style={[
                      styles.letterCard,
                      !letter.isRead && styles.unreadLetter,
                    ]}
                    onPress={() =>
                      navigation.navigate('LetterDetail', {letter})
                    }>
                    <View style={styles.letterHeader}>
                      <Text
                        style={[
                          styles.letterTitle,
                          !letter.isRead && styles.unreadTitle,
                        ]}>
                        {letter.title}
                      </Text>
                      <Text style={styles.letterTime}>{letter.time}</Text>
                    </View>
                    <Text style={styles.letterPreview}>{letter.preview}</Text>
                    <View style={styles.letterFooter}>
                      <Text style={styles.letterSender}>{letter.sender}</Text>
                      {!letter.isRead && (
                        <View style={styles.unreadDot} />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Icon name="mail-outline" size={48} color={colors.placeholder} />
                <Text style={styles.emptyStateText}>
                  No letters yet. Start your love story!
                </Text>
              </View>
            )}
          </View>

          {/* Room Stats */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <Icon name="mail" size={24} color={colors.primary} />
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Letters Sent</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="favorite" size={24} color={colors.secondary} />
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Days Together</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="photo" size={24} color={colors.info} />
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Photos Shared</Text>
            </View>
          </View>

          {/* Leave Room Button */}
          <TouchableOpacity
            style={styles.leaveRoomButton}
            onPress={handleLeaveRoom}>
            <Icon name="exit-to-app" size={20} color={colors.error} />
            <Text style={styles.leaveRoomText}>Leave Room</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  roomInfo: {
    flex: 1,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  roomCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roomCodeLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  roomCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  shareButton: {
    padding: 4,
  },
  settingsButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
  },
  recentSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  lettersList: {
    gap: 12,
  },
  letterCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadLetter: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  letterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  letterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  letterTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  letterPreview: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  letterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  letterSender: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  statsSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  leaveRoomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  leaveRoomText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '500',
  },
});

export default RoomDashboardScreen;
