import {DefaultTheme} from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6B46C1',
    accent: '#EC4899',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    text: '#1F2937',
    placeholder: '#9CA3AF',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
};

export const colors = {
  primary: '#6B46C1',
  secondary: '#EC4899',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  placeholder: '#9CA3AF',
  border: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  gradient: {
    primary: ['#6B46C1', '#EC4899'],
    secondary: ['#EC4899', '#F97316'],
    background: ['#F8FAFC', '#E2E8F0'],
  },
};
