import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/common/CustomButton';
import {colors} from '../theme/theme';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing will be available soon');
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality will be available soon');
  };

  const handlePrivacySettings = () => {
    Alert.alert('Privacy Settings', 'Privacy settings will be available soon');
  };

  const handleBackupData = () => {
    Alert.alert(
      'Backup Data',
      'This will backup all your letters and data to the cloud.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Backup',
          onPress: () => {
            Alert.alert('Backup Started', 'Your data is being backed up...');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all your data. This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted');
            navigation.navigate('Welcome');
          },
        },
      ]
    );
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Sign Out',
          onPress: () => navigation.navigate('Welcome'),
        },
      ]
    );
  };

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Support contact will be available soon');
  };

  const handleAbout = () => {
    Alert.alert(
      'About Romantic Diary',
      'Version 1.0.0\n\nA beautiful way to share your love story with your partner.',
      [{text: 'OK'}]
    );
  };

  const renderSettingItem = (
    icon: string,
    title: string,
    subtitle?: string,
    onPress?: () => void,
    rightComponent?: React.ReactNode,
  ) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}>
      <View style={styles.settingLeft}>
        <View style={styles.settingIcon}>
          <Icon name={icon} size={24} color={colors.primary} />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || (
        onPress && <Icon name="chevron-right" size={24} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Icon name="camera-alt" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
            <CustomButton
              title="Edit Profile"
              onPress={handleEditProfile}
              variant="outline"
              size="small"
              style={styles.editProfileButton}
            />
          </View>

          {/* Settings Sections */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            {renderSettingItem(
              'person',
              'Edit Profile',
              'Update your personal information',
              handleEditProfile,
            )}
            {renderSettingItem(
              'lock',
              'Change Password',
              'Update your password',
              handleChangePassword,
            )}
            {renderSettingItem(
              'privacy-tip',
              'Privacy Settings',
              'Manage your privacy preferences',
              handlePrivacySettings,
            )}
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            {renderSettingItem(
              'notifications',
              'Push Notifications',
              'Receive notifications for new letters',
              undefined,
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{false: colors.border, true: colors.primary}}
                thumbColor={notificationsEnabled ? '#FFFFFF' : colors.textSecondary}
              />,
            )}
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Appearance</Text>
            {renderSettingItem(
              'dark-mode',
              'Dark Mode',
              'Switch to dark theme',
              undefined,
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{false: colors.border, true: colors.primary}}
                thumbColor={darkModeEnabled ? '#FFFFFF' : colors.textSecondary}
              />,
            )}
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Data & Storage</Text>
            {renderSettingItem(
              'cloud-upload',
              'Backup Data',
              'Backup your letters to the cloud',
              handleBackupData,
            )}
            {renderSettingItem(
              'storage',
              'Storage Usage',
              '2.3 MB used',
              undefined,
            )}
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Support</Text>
            {renderSettingItem(
              'help',
              'Help & Support',
              'Get help and contact support',
              handleContactSupport,
            )}
            {renderSettingItem(
              'info',
              'About',
              'App version and information',
              handleAbout,
            )}
          </View>

          {/* Danger Zone */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Danger Zone</Text>
            {renderSettingItem(
              'delete',
              'Delete Account',
              'Permanently delete your account',
              handleDeleteAccount,
            )}
          </View>

          {/* Sign Out Button */}
          <CustomButton
            title="Sign Out"
            onPress={handleSignOut}
            variant="outline"
            size="large"
            style={styles.signOutButton}
          />
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.secondary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editProfileButton: {
    paddingHorizontal: 24,
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  signOutButton: {
    marginTop: 16,
    borderColor: colors.error,
  },
});

export default ProfileScreen;
