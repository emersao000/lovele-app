import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

interface SocialAuthButtonsProps {
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
  onInstagramPress?: () => void;
  onApplePress?: () => void;
}

export const SocialAuthButtons: React.FC<SocialAuthButtonsProps> = ({
  onGooglePress,
  onFacebookPress,
  onInstagramPress,
  onApplePress,
}) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSocialAuth = async (provider: string, callback?: () => void) => {
    setLoading(provider);
    try {
      if (callback) {
        await callback();
      } else {
        // Default behavior - just show message
        Alert.alert(
          'Em desenvolvimento',
          `Login com ${provider} será implementado em breve!`,
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      Alert.alert('Erro', `Falha ao fazer login com ${provider}`);
    } finally {
      setLoading(null);
    }
  };

  const SocialButton: React.FC<{
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
    isLoading: boolean;
  }> = ({ icon, label, onPress, isLoading }) => (
    <TouchableOpacity
      style={styles.socialButton}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.7}
    >
      {isLoading ? (
        <ActivityIndicator color="#666" size="small" />
      ) : (
        <>
          <View style={styles.iconContainer}>{icon}</View>
          <Text style={styles.socialButtonText}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Ou continue com</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.buttonsGrid}>
        <SocialButton
          icon={<FontAwesome5 name="google" size={20} color="#EA4335" />}
          label="Google"
          onPress={() => handleSocialAuth('Google', onGooglePress)}
          isLoading={loading === 'Google'}
        />

        <SocialButton
          icon={<FontAwesome5 name="facebook" size={20} color="#1877F2" />}
          label="Facebook"
          onPress={() => handleSocialAuth('Facebook', onFacebookPress)}
          isLoading={loading === 'Facebook'}
        />

        <SocialButton
          icon={<FontAwesome5 name="instagram" size={20} color="#E4405F" />}
          label="Instagram"
          onPress={() => handleSocialAuth('Instagram', onInstagramPress)}
          isLoading={loading === 'Instagram'}
        />

        {/* Apple button - only show on iOS */}
        <SocialButton
          icon={<FontAwesome5 name="apple" size={20} color="#000" />}
          label="Apple"
          onPress={() => handleSocialAuth('Apple', onApplePress)}
          isLoading={loading === 'Apple'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    minWidth: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
    gap: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
