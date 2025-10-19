import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {colors} from '../theme/theme';

interface RoomSelectionScreenProps {
  navigation: any;
}

const RoomSelectionScreen: React.FC<RoomSelectionScreenProps> = ({
  navigation,
}) => {
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Firebase room creation
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      Alert.alert(
        'Room Created!',
        `Your room "${roomName}" has been created.\n\nRoom Code: ${generatedCode}\n\nShare this code with your partner to join the room.`,
        [
          {
            text: 'OK',
            onPress: () => {
              setShowCreateModal(false);
              setRoomName('');
              navigation.navigate('RoomDashboard', {
                roomName,
                roomCode: generatedCode,
                isOwner: true,
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to create room. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async () => {
    if (!roomCode.trim()) {
      Alert.alert('Error', 'Please enter a room code');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Firebase room joining
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Room Joined!',
        'You have successfully joined the room.',
        [
          {
            text: 'OK',
            onPress: () => {
              setShowJoinModal(false);
              setRoomCode('');
              navigation.navigate('RoomDashboard', {
                roomName: 'Love Room',
                roomCode,
                isOwner: false,
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Invalid room code or room not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => navigation.navigate('Welcome'),
        },
      ]
    );
  };

  if (loading) {
    return <LoadingSpinner text="Processing..." overlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Your Room</Text>
            <Text style={styles.subtitle}>
              Create a new room or join an existing one
            </Text>
          </View>

          {/* Room Options */}
          <View style={styles.optionsContainer}>
            {/* Create Room Card */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => setShowCreateModal(true)}
              activeOpacity={0.8}>
              <View style={styles.cardIcon}>
                <Icon name="add-circle" size={40} color={colors.primary} />
              </View>
              <Text style={styles.cardTitle}>Create New Room</Text>
              <Text style={styles.cardDescription}>
                Start a new private space for you and your partner
              </Text>
            </TouchableOpacity>

            {/* Join Room Card */}
            <TouchableOpacity
              style={styles.optionCard}
              onPress={() => setShowJoinModal(true)}
              activeOpacity={0.8}>
              <View style={styles.cardIcon}>
                <Icon name="login" size={40} color={colors.secondary} />
              </View>
              <Text style={styles.cardTitle}>Join Existing Room</Text>
              <Text style={styles.cardDescription}>
                Enter a room code to join your partner's room
              </Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color={colors.textSecondary} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Create Room Modal */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCreateModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Room</Text>
            <Text style={styles.modalSubtitle}>
              Give your room a special name
            </Text>

            <CustomInput
              label="Room Name"
              placeholder="e.g., Our Love Story"
              value={roomName}
              onChangeText={setRoomName}
              leftIcon="home"
            />

            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancel"
                onPress={() => setShowCreateModal(false)}
                variant="outline"
                size="medium"
                style={styles.modalButton}
              />
              <CustomButton
                title="Create Room"
                onPress={handleCreateRoom}
                variant="primary"
                size="medium"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Join Room Modal */}
      <Modal
        visible={showJoinModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowJoinModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Join Room</Text>
            <Text style={styles.modalSubtitle}>
              Enter the room code shared by your partner
            </Text>

            <CustomInput
              label="Room Code"
              placeholder="Enter 6-digit code"
              value={roomCode}
              onChangeText={setRoomCode}
              leftIcon="vpn-key"
              keyboardType="default"
            />

            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancel"
                onPress={() => setShowJoinModal(false)}
                variant="outline"
                size="medium"
                style={styles.modalButton}
              />
              <CustomButton
                title="Join Room"
                onPress={handleJoinRoom}
                variant="primary"
                size="medium"
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  optionCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalButton: {
    flex: 1,
  },
});

export default RoomSelectionScreen;
