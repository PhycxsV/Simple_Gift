import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/common/CustomButton';
import {colors} from '../theme/theme';

interface Letter {
  id: string;
  title: string;
  content: string;
  sender: string;
  senderId: string;
  time: string;
  isRead: boolean;
  category: string;
  attachments?: string[];
}

interface LetterDetailScreenProps {
  navigation: any;
  route: any;
}

const LetterDetailScreen: React.FC<LetterDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const {letter}: {letter: Letter} = route.params;
  const [isRead, setIsRead] = useState(letter.isRead);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'love':
        return 'favorite';
      case 'daily':
        return 'today';
      case 'memory':
        return 'history';
      case 'special':
        return 'star';
      default:
        return 'mail';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'love':
        return colors.secondary;
      case 'daily':
        return colors.info;
      case 'memory':
        return colors.warning;
      case 'special':
        return colors.primary;
      default:
        return colors.textSecondary;
    }
  };

  const handleReply = () => {
    navigation.navigate('Compose', {
      replyTo: letter,
      replyTitle: `Re: ${letter.title}`,
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${letter.title}\n\n${letter.content}`,
        title: letter.title,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share letter');
    }
  };

  const handleArchive = () => {
    Alert.alert(
      'Archive Letter',
      'Are you sure you want to archive this letter?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Archive',
          onPress: () => {
            // TODO: Implement archive functionality
            Alert.alert('Archived', 'Letter has been archived');
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Letter',
      'Are you sure you want to delete this letter? This action cannot be undone.',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete functionality
            Alert.alert('Deleted', 'Letter has been deleted');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleMarkAsRead = () => {
    if (!isRead) {
      setIsRead(true);
      // TODO: Update read status in Firebase
    }
  };

  // Mark as read when component mounts
  React.useEffect(() => {
    if (!isRead) {
      handleMarkAsRead();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Letter Header */}
          <View style={styles.letterHeader}>
            <View style={styles.titleContainer}>
              <Text style={styles.letterTitle}>{letter.title}</Text>
              <View style={styles.categoryBadge}>
                <Icon
                  name={getCategoryIcon(letter.category)}
                  size={16}
                  color={getCategoryColor(letter.category)}
                />
                <Text
                  style={[
                    styles.categoryText,
                    {color: getCategoryColor(letter.category)},
                  ]}>
                  {letter.category.charAt(0).toUpperCase() + letter.category.slice(1)}
                </Text>
              </View>
            </View>
            
            <View style={styles.metaInfo}>
              <View style={styles.senderInfo}>
                <Icon
                  name={letter.senderId === 'user2' ? 'person' : 'person-outline'}
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.senderName}>{letter.sender}</Text>
              </View>
              <Text style={styles.letterTime}>{letter.time}</Text>
            </View>
          </View>

          {/* Letter Content */}
          <View style={styles.letterContent}>
            <Text style={styles.contentText}>{letter.content}</Text>
          </View>

          {/* Attachments */}
          {letter.attachments && letter.attachments.length > 0 && (
            <View style={styles.attachmentsSection}>
              <Text style={styles.attachmentsTitle}>Attachments</Text>
              <View style={styles.attachmentsList}>
                {letter.attachments.map((attachment, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.attachmentItem}>
                    <Icon name="attach-file" size={20} color={colors.primary} />
                    <Text style={styles.attachmentText}>{attachment}</Text>
                    <Icon name="download" size={20} color={colors.textSecondary} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <CustomButton
              title="Reply"
              onPress={handleReply}
              variant="primary"
              size="medium"
              style={styles.actionButton}
            />
            <CustomButton
              title="Share"
              onPress={handleShare}
              variant="outline"
              size="medium"
              style={styles.actionButton}
            />
          </View>

          {/* Additional Actions */}
          <View style={styles.additionalActions}>
            <TouchableOpacity
              style={styles.additionalAction}
              onPress={handleArchive}>
              <Icon name="archive" size={20} color={colors.textSecondary} />
              <Text style={styles.additionalActionText}>Archive</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.additionalAction}
              onPress={handleDelete}>
              <Icon name="delete" size={20} color={colors.error} />
              <Text style={[styles.additionalActionText, {color: colors.error}]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
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
  letterHeader: {
    marginBottom: 24,
  },
  titleContainer: {
    marginBottom: 16,
  },
  letterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    lineHeight: 32,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    gap: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  senderName: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  letterTime: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  letterContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  contentText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  attachmentsSection: {
    marginBottom: 24,
  },
  attachmentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  attachmentsList: {
    gap: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  attachmentText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
  },
  additionalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  additionalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  additionalActionText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

export default LetterDetailScreen;
