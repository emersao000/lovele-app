import React, { createContext, useState, useContext } from 'react';

export type PrivacyLevel = 'publico' | 'amigos' | 'privado';

interface PostPrivacyContextType {
  defaultPrivacy: PrivacyLevel;
  setDefaultPrivacy: (privacy: PrivacyLevel) => void;
}

const PostPrivacyContext = createContext<PostPrivacyContextType | undefined>(undefined);

export const PostPrivacyProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [defaultPrivacy, setDefaultPrivacy] = useState<PrivacyLevel>('publico');

  return (
    <PostPrivacyContext.Provider value={{ defaultPrivacy, setDefaultPrivacy }}>
      {children}
    </PostPrivacyContext.Provider>
  );
};

export const usePostPrivacy = () => {
  const context = useContext(PostPrivacyContext);
  if (!context) {
    throw new Error('usePostPrivacy must be used within PostPrivacyProvider');
  }
  return context;
};
