import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../components/common/CustomButton';
import CustomInput from '../components/common/CustomInput';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {colors} from '../theme/theme';

interface ComposeScreenProps {
  navigation: any;
}

const ComposeScreen: React.FC<ComposeScreenProps> = ({navigation}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'love',
  });
  const [loading, setLoading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);

  const categories = [
    {key: 'love', label: 'Love Letter', icon: 'favorite', color: colors.secondary},
    {key: 'daily', label: 'Daily Update', icon: 'today', color: colors.info},
    {key: 'memory', label: 'Memory', icon: 'history', color: colors.warning},
    {key: 'special', label: 'Special', icon: 'star', color: colors.primary},
  ];

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSendLetter = async () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title for your letter');
      return;
    }

    if (!formData.content.trim()) {
      Alert.alert('Error', 'Please write your letter content');
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement Firebase letter sending
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Letter Sent!',
        'Your letter has been sent successfully.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send letter. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = () => {
    if (!formData.title.trim() && !formData.content.trim()) {
      Alert.alert('Error', 'Nothing to save');
      return;
    }

    Alert.alert(
      'Draft Saved',
      'Your letter has been saved as a draft.',
      [{text: 'OK'}]
    );
  };

  const handleAddAttachment = () => {
    Alert.alert(
      'Add Attachment',
      'Choose attachment type:',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Photo',
          onPress: () => {
            // TODO: Implement photo picker
            Alert.alert('Coming Soon', 'Photo attachment will be available soon');
          },
        },
        {
          text: 'Voice Message',
          onPress: () => {
            // TODO: Implement voice recorder
            Alert.alert('Coming Soon', 'Voice messages will be available soon');
          },
        },
      ]
    );
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return <LoadingSpinner text="Sending your letter..." overlay />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Write Letter</Text>
            <Text style={styles.subtitle}>
              Share your thoughts with your loved one
            </Text>
          </View>

          {/* Letter Form */}
          <View style={styles.form}>
            {/* Title */}
            <CustomInput
              label="Letter Title"
              placeholder="Give your letter a title..."
              value={formData.title}
              onChangeText={value => updateFormData('title', value)}
              leftIcon="title"
            />

            {/* Category Selection */}
            <View style={styles.categorySection}>
              <Text style={styles.categoryLabel}>Category</Text>
              <View style={styles.categoryGrid}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryCard,
                      formData.category === category.key && styles.selectedCategory,
                    ]}
                    onPress={() => updateFormData('category', category.key)}>
                    <Icon
                      name={category.icon}
                      size={24}
                      color={
                        formData.category === category.key
                          ? '#FFFFFF'
                          : category.color
                      }
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        formData.category === category.key &&
                          styles.selectedCategoryText,
                      ]}>
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Content */}
            <View style={styles.contentSection}>
              <Text style={styles.contentLabel}>Letter Content</Text>
              <View style={styles.contentContainer}>
                <TextInput
                  style={styles.contentInput}
                  placeholder="Write your letter here..."
                  placeholderTextColor={colors.placeholder}
                  value={formData.content}
                  onChangeText={value => updateFormData('content', value)}
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>

            {/* Attachments */}
            <View style={styles.attachmentsSection}>
              <View style={styles.attachmentsHeader}>
                <Text style={styles.attachmentsLabel}>Attachments</Text>
                <TouchableOpacity
                  style={styles.addAttachmentButton}
                  onPress={handleAddAttachment}>
                  <Icon name="add" size={20} color={colors.primary} />
                  <Text style={styles.addAttachmentText}>Add</Text>
                </TouchableOpacity>
              </View>

              {attachments.length > 0 && (
                <View style={styles.attachmentsList}>
                  {attachments.map((attachment, index) => (
                    <View key={index} style={styles.attachmentItem}>
                      <Icon name="attach-file" size={20} color={colors.textSecondary} />
                      <Text style={styles.attachmentText}>{attachment}</Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveAttachment(index)}>
                        <Icon name="close" size={20} color={colors.error} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <CustomButton
              title="Save Draft"
              onPress={handleSaveDraft}
              variant="outline"
              size="medium"
              style={styles.actionButton}
            />
            <CustomButton
              title="Send Letter"
              onPress={handleSendLetter}
              variant="primary"
              size="medium"
              style={styles.actionButton}
            />
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
  header: {
    marginBottom: 24,
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
  },
  form: {
    flex: 1,
    marginBottom: 24,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedCategory: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  contentSection: {
    marginBottom: 24,
  },
  contentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  contentContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    minHeight: 200,
  },
  contentInput: {
    fontSize: 16,
    color: colors.text,
    padding: 16,
    minHeight: 200,
    textAlignVertical: 'top',
  },
  attachmentsSection: {
    marginBottom: 24,
  },
  attachmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  attachmentsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  addAttachmentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  addAttachmentText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  attachmentsList: {
    gap: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
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
  },
  actionButton: {
    flex: 1,
  },
});

export default ComposeScreen;
