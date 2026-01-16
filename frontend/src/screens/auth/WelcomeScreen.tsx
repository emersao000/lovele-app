import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop, G, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Logo Lovele - Letra "L" estilizada com coração integrado
const LoveleLogo = ({ size = 120 }) => (
  <Svg width={size} height={size} viewBox="0 0 200 200">
    <Defs>
      <SvgGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="1" />
        <Stop offset="50%" stopColor="#C44569" stopOpacity="1" />
        <Stop offset="100%" stopColor="#8B2E5C" stopOpacity="1" />
      </SvgGradient>
    </Defs>
    
    {/* Letra L estilizada */}
    <Path
      d="M 60,40 L 80,40 L 80,140 L 140,140 L 140,160 L 60,160 Z"
      fill="url(#logoGrad)"
    />
    
    {/* Coração integrado no topo do L */}
    <Path
      d="M 100,50 C 100,50 90,40 80,40 C 70,40 65,48 65,55 C 65,70 100,95 100,95 C 100,95 135,70 135,55 C 135,48 130,40 120,40 C 110,40 100,50 100,50 Z"
      fill="url(#logoGrad)"
    />
    
    {/* Círculo decorativo */}
    <Circle cx="155" cy="65" r="8" fill="#FF6B9D" opacity="0.6" />
    <Circle cx="145" cy="85" r="5" fill="#C44569" opacity="0.4" />
  </Svg>
);

// Ilustração de Rede Social - Pessoas conectadas minimalista
const SocialNetworkIllustration = () => (
  <Svg width={width * 0.9} height="320" viewBox="0 0 400 320">
    <Defs>
      <SvgGradient id="connect1" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FF6B9D" stopOpacity="0.8" />
        <Stop offset="100%" stopColor="#C44569" stopOpacity="0.6" />
      </SvgGradient>
      <SvgGradient id="connect2" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#FEA47F" stopOpacity="0.8" />
        <Stop offset="100%" stopColor="#F97F51" stopOpacity="0.6" />
      </SvgGradient>
      <SvgGradient id="connect3" x1="0%" y1="0%" x2="100%" y2="100%">
        <Stop offset="0%" stopColor="#25CCF7" stopOpacity="0.8" />
        <Stop offset="100%" stopColor="#1B9CFC" stopOpacity="0.6" />
      </SvgGradient>
    </Defs>
    
    {/* Linhas de conexão suaves */}
    <Path d="M 80,100 Q 200,140 320,100" stroke="url(#connect1)" strokeWidth="2" fill="none" opacity="0.3" />
    <Path d="M 80,100 Q 140,200 200,240" stroke="url(#connect2)" strokeWidth="2" fill="none" opacity="0.3" />
    <Path d="M 320,100 Q 260,200 200,240" stroke="url(#connect3)" strokeWidth="2" fill="none" opacity="0.3" />
    
    {/* Avatar 1 - Topo Esquerdo */}
    <G>
      <Circle cx="80" cy="100" r="35" fill="url(#connect1)" />
      <Circle cx="80" cy="100" r="30" fill="#FFFFFF" />
      <Circle cx="80" cy="90" r="12" fill="url(#connect1)" />
      <Path d="M 60,110 Q 80,105 100,110 Q 100,125 80,130 Q 60,125 60,110" fill="url(#connect1)" />
    </G>
    
    {/* Avatar 2 - Topo Direito */}
    <G>
      <Circle cx="320" cy="100" r="35" fill="url(#connect2)" />
      <Circle cx="320" cy="100" r="30" fill="#FFFFFF" />
      <Circle cx="320" cy="90" r="12" fill="url(#connect2)" />
      <Path d="M 300,110 Q 320,105 340,110 Q 340,125 320,130 Q 300,125 300,110" fill="url(#connect2)" />
    </G>
    
    {/* Avatar 3 - Centro Inferior */}
    <G>
      <Circle cx="200" cy="240" r="35" fill="url(#connect3)" />
      <Circle cx="200" cy="240" r="30" fill="#FFFFFF" />
      <Circle cx="200" cy="230" r="12" fill="url(#connect3)" />
      <Path d="M 180,250 Q 200,245 220,250 Q 220,265 200,270 Q 180,265 180,250" fill="url(#connect3)" />
    </G>
    
    {/* Ícones flutuantes - Curtidas */}
    <G opacity="0.7">
      <Path d="M 150,60 C 150,60 145,55 140,55 C 135,55 133,58 133,61 C 133,68 150,80 150,80 C 150,80 167,68 167,61 C 167,58 165,55 160,55 C 155,55 150,60 150,60 Z" fill="#FF6B9D" />
    </G>
    
    <G opacity="0.7">
      <Path d="M 250,180 C 250,180 245,175 240,175 C 235,175 233,178 233,181 C 233,188 250,200 250,200 C 250,200 267,188 267,181 C 267,178 265,175 260,175 C 255,175 250,180 250,180 Z" fill="#FEA47F" />
    </G>
    
    {/* Bolhas decorativas */}
    <Circle cx="350" cy="200" r="6" fill="#25CCF7" opacity="0.4" />
    <Circle cx="50" cy="180" r="8" fill="#FF6B9D" opacity="0.3" />
    <Circle cx="200" cy="50" r="5" fill="#FEA47F" opacity="0.5" />
  </Svg>
);

export const WelcomeScreen = ({ navigation }: any) => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFF5F8', '#FFFFFF']}
      style={styles.container}
    >
      <StatusBar style="dark" />

      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <LoveleLogo size={140} />
          <Text style={styles.appName}>Lovele</Text>
          <Text style={styles.tagline}>Sua rede social, suas conexões</Text>
        </View>

        {/* Ilustração */}
        <View style={styles.illustrationSection}>
          <SocialNetworkIllustration />
        </View>

        {/* Botões */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#FF6B9D', '#C44569']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <Text style={styles.loginButtonText}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  appName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#2D3436',
    marginTop: 20,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 16,
    color: '#636E72',
    marginTop: 8,
    fontWeight: '400',
  },
  illustrationSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  buttonsSection: {
    width: '100%',
    gap: 16,
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    shadowColor: '#C44569',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  registerButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#C44569',
  },
  registerButtonText: {
    color: '#C44569',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});