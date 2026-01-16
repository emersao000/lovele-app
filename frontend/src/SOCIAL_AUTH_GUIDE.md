# Guia de Autenticação Social - Lovele

## 📱 Visão Geral

Este guia descreve a implementação da autenticação social (Social Login) na plataforma Lovele. Os usuários agora podem fazer login e criar contas usando suas contas sociais.

## 🎯 Funcionalidades Implementadas

### 1. **Componente SocialAuthButtons** (`components/auth/SocialAuthButtons.tsx`)

Componente React Native reutilizável que exibe botões de autenticação social com as seguintes características:

- **Provedores Suportados:**
  - Google
  - Facebook
  - Instagram
  - Apple

- **Recursos:**
  - Layout responsivo com grid de botões
  - Indicador de carregamento durante autenticação
  - Separador visual com texto "Ou continue com"
  - Ícones via @expo/vector-icons (FontAwesome5)
  - Estados de loading para cada provedor

### 2. **Tela de Login Atualizada** (`screens/auth/LoginScreen.tsx`)

- Integração do componente SocialAuthButtons
- Funções handler para cada provedor social
- Suporte a ScrollView para melhor UX com teclado
- Placeholders de cor para futuras integrações OAuth

### 3. **Tela de Registro Atualizada** (`screens/auth/RegisterScreen.tsx`)

- Integração do componente SocialAuthButtons
- Fluxo de cadastro via redes sociais
- Melhor organização com ScrollView
- Handlers específicos para sign-up

### 4. **Tela de Boas-vindas Melhorada** (`screens/auth/WelcomeScreen.tsx`)

- Design mais atrativo com emojis e features
- Três itens destacando as funcionalidades principais:
  - 💬 Mensagens em tempo real
  - 📸 Compartilhe momentos
  - 💕 Conecte-se com amigos
- Melhor visual com ScrollView e shadow effects

## 🔧 Próximos Passos para Integração Real

Para implementar a autenticação social real, você precisa:

### Google OAuth
```bash
npm install @react-native-google-signin/google-signin
```

Adicione o handler:
```javascript
const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // Enviar userInfo para seu backend
    await login(userInfo.user.email, userInfo.user.id);
  } catch (error) {
    Alert.alert('Erro', 'Falha no login com Google');
  }
};
```

### Facebook OAuth
```bash
npm install react-native-fbsdk-next expo-facebook
```

### Instagram Login
Instagram usa OAuth via Facebook SDK. Configure seguindo a documentação do Facebook.

### Apple Sign-In
```bash
npx expo install expo-apple-authentication
```

Adicione o handler:
```javascript
const handleAppleLogin = async () => {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });
  // Use credential para fazer login
};
```

## 📋 Estrutura de Arquivos

```
frontend/src/
├── components/
│   └── auth/
│       └── SocialAuthButtons.tsx (NOVO)
├── screens/
│   └── auth/
│       ├── LoginScreen.tsx (ATUALIZADO)
│       ├── RegisterScreen.tsx (ATUALIZADO)
│       └── WelcomeScreen.tsx (ATUALIZADO)
```

## 🎨 Estilos e Cores

- **Cor Primária:** #FF6B6B (Rosa/Vermelho)
- **Cor de Fundo:** #FFFFFF
- **Cor de Texto Secundário:** #666666
- **Cor de Borda:** #E5E5E5

Cores dos ícones sociais:
- Google: #EA4335 (Vermelho)
- Facebook: #1877F2 (Azul)
- Instagram: #E4405F (Rosa/Roxo)
- Apple: #000000 (Preto)

## 🛡️ Segurança

- Sempre use HTTPS para comunicação com servidores de OAuth
- Nunca exponha secrets de aplicação no frontend
- Valide tokens no backend antes de criar sessões
- Implemente rate limiting para prevenção de brute force

## 📚 Textos em Português

Todos os textos foram implementados em português:
- "Bem-vindo de volta! 👋"
- "Entre para continuar"
- "Crie sua conta 🎉"
- "Comece a se conectar agora"
- "Ou continue com"
- "Conecte-se com quem você ama"

## ⚙️ Configuração de Ambiente

Adicione as seguintes variáveis de ambiente ao seu arquivo `.env` ou configure no EAS Build:

```env
GOOGLE_CLIENT_ID=seu_google_client_id
FACEBOOK_APP_ID=seu_facebook_app_id
FACEBOOK_APP_SECRET=seu_facebook_app_secret
APPLE_TEAM_ID=seu_apple_team_id
```

## 🧪 Testando

No estado atual, clicar nos botões sociais exibe um Alert com mensagem de desenvolvimento. Após implementar os serviços reais, o fluxo será:

1. Usuário clica no botão social
2. Redirecionado para login do provedor
3. Após autenticação, recebe token
4. Token é enviado ao backend
5. Backend valida e cria/atualiza usuário
6. Sessão é criada

## 📞 Suporte

Para dúvidas sobre implementação, consulte:
- Google Sign-In: https://developers.google.com/identity
- Facebook Login: https://developers.facebook.com/docs/facebook-login
- Apple Sign-In: https://developer.apple.com/sign-in-with-apple
