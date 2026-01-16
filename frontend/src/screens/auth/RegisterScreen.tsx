import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path, Circle } from 'react-native-svg';

// Ícone de Calendário SVG
const CalendarIcon = ({ color = "#636E72", size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M16 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8 2V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 10H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Ícone de Seta
const ArrowIcon = ({ direction = "right", color = "#FFFFFF", size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d={direction === "right" ? "M5 12H19M19 12L12 5M19 12L12 19" : "M19 12H5M5 12L12 19M5 12L12 5"}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Ícone de Check
const CheckIcon = ({ color = "#FFFFFF", size = 20 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 6L9 17L4 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const RegisterScreen = ({ navigation }: any) => {
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Step 1
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  // Step 2
  const [email, setEmail] = useState('');

  // Step 3
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');

  // Step 4
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');

  const genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'feminino', label: 'Feminino' },
    { value: 'nao-binario', label: 'Não-binário' },
    { value: 'outro', label: 'Outro' },
    { value: 'prefiro-nao-dizer', label: 'Prefiro não dizer' },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!name.trim() || !surname.trim()) {
        Alert.alert('Atenção', 'Preencha seu nome e sobrenome');
        return;
      }
    }

    if (currentStep === 2) {
      if (!email.trim()) {
        Alert.alert('Atenção', 'Preencha seu email');
        return;
      }
      if (!email.includes('@')) {
        Alert.alert('Atenção', 'Digite um email válido');
        return;
      }
    }

    if (currentStep === 3) {
      if (!gender) {
        Alert.alert('Atenção', 'Selecione seu gênero');
        return;
      }
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleRegister = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha todos os campos de senha');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (!acceptTerms) {
      Alert.alert('Erro', 'Você precisa aceitar os termos de uso');
      return;
    }

    setLoading(true);
    try {
      const fullName = `${name} ${surname}`;
      await register(fullName, email, password);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a conta');
    } finally {
      setLoading(false);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Como você se chama?';
      case 2: return 'Qual seu email?';
      case 3: return 'Conte mais sobre você';
      case 4: return 'Crie sua senha';
      default: return '';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return 'Vamos começar com o básico';
      case 2: return 'Usaremos para sua conta';
      case 3: return 'Data de nascimento e gênero';
      case 4: return 'Mantenha sua conta segura';
      default: return '';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowIcon direction="left" color="#C44569" size={24} />
          </TouchableOpacity>
          <View style={styles.stepsIndicator}>
            {[...Array(totalSteps)].map((_, index) => (
              <View
                key={index}
                style={[
                  styles.stepDot,
                  index + 1 <= currentStep && styles.stepDotActive
                ]}
              />
            ))}
          </View>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Título da Etapa */}
          <View style={styles.titleSection}>
            <Text style={styles.stepNumber}>Etapa {currentStep} de {totalSteps}</Text>
            <Text style={styles.title}>{getStepTitle()}</Text>
            <Text style={styles.subtitle}>{getStepSubtitle()}</Text>
          </View>

          {/* Formulário por Etapa */}
          <View style={styles.formContainer}>
            {/* ETAPA 1: Nome e Sobrenome */}
            {currentStep === 1 && (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Nome</Text>
                  <View style={[
                    styles.inputContainer,
                    focusedInput === 'name' && styles.inputContainerFocused
                  ]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Seu primeiro nome"
                      value={name}
                      onChangeText={setName}
                      placeholderTextColor="#B2BEC3"
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput('')}
                      autoFocus
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Sobrenome</Text>
                  <View style={[
                    styles.inputContainer,
                    focusedInput === 'surname' && styles.inputContainerFocused
                  ]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Seu sobrenome"
                      value={surname}
                      onChangeText={setSurname}
                      placeholderTextColor="#B2BEC3"
                      onFocus={() => setFocusedInput('surname')}
                      onBlur={() => setFocusedInput('')}
                    />
                  </View>
                </View>
              </>
            )}

            {/* ETAPA 2: Email */}
            {currentStep === 2 && (
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email</Text>
                <View style={[
                  styles.inputContainer,
                  focusedInput === 'email' && styles.inputContainerFocused
                ]}>
                  <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#B2BEC3"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput('')}
                    autoFocus
                  />
                </View>
              </View>
            )}

            {/* ETAPA 3: Data de Nascimento e Gênero */}
            {currentStep === 3 && (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Data de nascimento</Text>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <View style={styles.datePickerButton}>
                      <Text style={styles.dateText}>{formatDate(birthDate)}</Text>
                      <CalendarIcon color="#C44569" size={22} />
                    </View>
                  </TouchableOpacity>
                </View>

                {showDatePicker && (
                  <DateTimePicker
                    value={birthDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={onDateChange}
                    maximumDate={new Date()}
                    minimumDate={new Date(1900, 0, 1)}
                  />
                )}

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Gênero</Text>
                  <View style={styles.genderContainer}>
                    {genderOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={[
                          styles.genderOption,
                          gender === option.value && styles.genderOptionSelected
                        ]}
                        onPress={() => setGender(option.value)}
                      >
                        <Text style={[
                          styles.genderLabel,
                          gender === option.value && styles.genderLabelSelected
                        ]}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            )}

            {/* ETAPA 4: Senha e Termos */}
            {currentStep === 4 && (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Senha</Text>
                  <View style={[
                    styles.inputContainer,
                    focusedInput === 'password' && styles.inputContainerFocused
                  ]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      placeholderTextColor="#B2BEC3"
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput('')}
                      autoFocus
                    />
                  </View>
                </View>

                <View style={styles.inputWrapper}>
                  <Text style={styles.label}>Confirmar senha</Text>
                  <View style={[
                    styles.inputContainer,
                    focusedInput === 'confirmPassword' && styles.inputContainerFocused
                  ]}>
                    <TextInput
                      style={styles.input}
                      placeholder="Digite a senha novamente"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      secureTextEntry
                      placeholderTextColor="#B2BEC3"
                      onFocus={() => setFocusedInput('confirmPassword')}
                      onBlur={() => setFocusedInput('')}
                    />
                  </View>
                </View>

                {/* Checkbox Termos */}
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setAcceptTerms(!acceptTerms)}
                  activeOpacity={0.7}
                >
                  <View style={[
                    styles.checkbox,
                    acceptTerms && styles.checkboxChecked
                  ]}>
                    {acceptTerms && <CheckIcon color="#FFFFFF" size={16} />}
                  </View>
                  <Text style={styles.checkboxText}>
                    Eu aceito os{' '}
                    <Text style={styles.checkboxLink}>Termos de Uso</Text>
                    {' '}e{' '}
                    <Text style={styles.checkboxLink}>Política de Privacidade</Text>
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>

        {/* Botão de Ação */}
        <View style={styles.footer}>
          {currentStep < totalSteps ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
              activeOpacity={0.9}
            >
              <Text style={styles.nextButtonText}>Continuar</Text>
              <ArrowIcon direction="right" color="#FFFFFF" size={20} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.registerButton, loading && styles.registerButtonDisabled]}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.9}
            >
              <Text style={styles.registerButtonText}>
                {loading ? 'Criando conta...' : 'Criar minha conta'}
              </Text>
            </TouchableOpacity>
          )}

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Entre agora</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepsIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  stepDotActive: {
    backgroundColor: '#FF6B9D',
    width: 24,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
  },
  titleSection: {
    marginBottom: 40,
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B9D',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3436',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
  },
  formContainer: {
    gap: 24,
  },
  inputWrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D3436',
    marginLeft: 4,
  },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  inputContainerFocused: {
    borderColor: '#FF6B9D',
    backgroundColor: '#FFFFFF',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    color: '#2D3436',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dateText: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
  genderContainer: {
    gap: 12,
  },
  genderOption: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  genderOptionSelected: {
    backgroundColor: '#FFF5F8',
    borderColor: '#FF6B9D',
  },
  genderLabel: {
    fontSize: 16,
    color: '#636E72',
    fontWeight: '500',
    textAlign: 'center',
  },
  genderLabelSelected: {
    color: '#C44569',
    fontWeight: '700',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B9D',
    borderColor: '#FF6B9D',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#636E72',
    lineHeight: 20,
  },
  checkboxLink: {
    color: '#C44569',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    paddingHorizontal: 30,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
  },
  nextButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#C44569',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  registerButton: {
    backgroundColor: '#FF6B9D',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#C44569',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButtonDisabled: {
    backgroundColor: '#B2BEC3',
    shadowOpacity: 0.1,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 15,
    color: '#636E72',
  },
  loginLink: {
    fontSize: 15,
    color: '#C44569',
    fontWeight: '700',
  },
});