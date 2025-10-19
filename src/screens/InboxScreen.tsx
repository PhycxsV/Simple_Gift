import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

interface InboxScreenProps {
  navigation: any;
}

const InboxScreen: React.FC<InboxScreenProps> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const [letters] = useState<Letter[]>([
    {
      id: '1',
      title: 'Good Morning Love 💕',
      content: 'Hope you have an amazing day ahead. I was thinking about you all night...',
      sender: 'Sarah',
      senderId: 'user1',
      time: '2 hours ago',
      isRead: true,
      category: 'love',
    },
    {
      id: '2',
      title: 'Thank you for yesterday',
      content: 'That was such a wonderful evening. I really enjoyed our time together...',
      sender: 'You',
      senderId: 'user2',
      time: '1 day ago',
      isRead: false,
      category: 'daily',
    },
    {
      id: '3',
      title: 'Remember our first date?',
      content: 'It was exactly one year ago today. I still remember how nervous I was...',
      sender: 'Sarah',
      senderId: 'user1',
      time: '3 days ago',
      isRead: true,
      category: 'memory',
    },
    {
      id: '4',
      title: 'I miss you',
      content: 'Even though we just saw each other, I already miss your smile...',
      sender: 'You',
      senderId: 'user2',
      time: '1 week ago',
      isRead: true,
      category: 'love',
    },
  ]);

  const filters = [
    {key: 'all', label: 'All', icon: 'mail'},
    {key: 'unread', label: 'Unread', icon: 'mark-email-unread'},
    {key: 'love', label: 'Love', icon: 'favorite'},
    {key: 'daily', label: 'Daily', icon: 'today'},
    {key: 'memory', label: 'Memory', icon: 'history'},
  ];

  const filteredLetters = letters.filter(letter => {
    const matchesSearch = letter.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      letter.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'unread' ? !letter.isRead : letter.category === selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = letters.filter(letter => !letter.isRead).length;

  const renderLetter = ({item}: {item: Letter}) => (
    <TouchableOpacity
      style={[
        styles.letterCard,
        !item.isRead && styles.unreadLetter,
      ]}
      onPress={() => navigation.navigate('LetterDetail', {letter: item})}>
      <View style={styles.letterHeader}>
        <View style={styles.letterTitleContainer}>
          <Text
            style={[
              styles.letterTitle,
              !item.isRead && styles.unreadTitle,
            ]}>
            {item.title}
          </Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.letterTime}>{item.time}</Text>
      </View>
      
      <Text style={styles.letterPreview} numberOfLines={2}>
        {item.content}
      </Text>
      
      <View style={styles.letterFooter}>
        <View style={styles.senderContainer}>
          <Icon
            name={item.senderId === 'user2' ? 'person' : 'person-outline'}
            size={16}
            color={colors.primary}
          />
          <Text style={styles.letterSender}>{item.sender}</Text>
        </View>
        <View style={styles.categoryContainer}>
          <Icon
            name={
              item.category === 'love'
                ? 'favorite'
                : item.category === 'daily'
                ? 'today'
                : 'history'
            }
            size={14}
            color={colors.textSecondary}
          />
          <Text style={styles.categoryText}>
            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFilter = (filter: any) => (
    <TouchableOpacity
      key={filter.key}
      style={[
        styles.filterChip,
        selectedFilter === filter.key && styles.activeFilter,
      ]}
      onPress={() => setSelectedFilter(filter.key)}>
      <Icon
        name={filter.icon}
        size={16}
        color={selectedFilter === filter.key ? '#FFFFFF' : colors.textSecondary}
      />
      <Text
        style={[
          styles.filterText,
          selectedFilter === filter.key && styles.activeFilterText,
        ]}>
        {filter.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>Letters</Text>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.composeButton}
                onPress={() => navigation.navigate('Compose')}>
                <Icon name="edit" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>
              {unreadCount} unread letter{unreadCount !== 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={colors.placeholder} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search letters..."
            placeholderTextColor={colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="clear" size={20} color={colors.placeholder} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <View style={styles.filtersContainer}>
          <FlatList
            data={filters}
            renderItem={({item}) => renderFilter(item)}
            keyExtractor={item => item.key}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersList}
          />
        </View>

        {/* Letters List */}
        <FlatList
          data={filteredLetters}
          renderItem={renderLetter}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lettersList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Icon name="mail-outline" size={64} color={colors.placeholder} />
              <Text style={styles.emptyStateTitle}>
                {searchQuery ? 'No letters found' : 'No letters yet'}
              </Text>
              <Text style={styles.emptyStateText}>
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Start your love story by writing your first letter'}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  composeButton: {
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadCount: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersList: {
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  lettersList: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  letterCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  letterTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  letterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  unreadTitle: {
    fontWeight: 'bold',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  letterTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  letterPreview: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  letterFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  senderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  letterSender: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default InboxScreen;
