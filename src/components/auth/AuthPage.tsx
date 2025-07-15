import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthPageProps {
  onSuccess?: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="min-h-screen bg-gradient-to-br bg-[#121212] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {isLogin ? (
          <LoginForm
            onSuccess={onSuccess}
            onSwitchToSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onSuccess={onSuccess}
            onSwitchToLogin={() => setIsLogin(true)}
          />
        )}
      </div>
    </section>
  );
};

export default AuthPage;