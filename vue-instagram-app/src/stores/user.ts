import { ref } from 'vue';
import { defineStore } from 'pinia';

import { supabase } from '../supabase';

const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const useUserStore = defineStore('user', () => {
  const user = ref<null | { id: string; email: string; username: string }>(
    null
  );
  const errorMessage = ref('');
  const loading = ref(false);
  const loadingUser = ref(false);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    const { email, password } = credentials;

    if (!validateEmail(email)) {
      return (errorMessage.value = 'Email is invalid');
    }

    if (!password.length) {
      return (errorMessage.value = 'Password cannot be empty');
    }

    loading.value = true;

    const { error } = await supabase.auth.signIn({ email, password });

    if (error) {
      loading.value = false;
      return (errorMessage.value = error.message);
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    user.value = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
    };

    loading.value = true;
    errorMessage.value = '';
  };

  const handleSignup = async (credentials: {
    email: string;
    password: string;
    username: string;
  }) => {
    const { email, password, username } = credentials;

    if (password.length < 6) {
      return (errorMessage.value = 'Password length is too short');
    }

    if (username.length < 4) {
      return (errorMessage.value = 'Username length is too short');
    }

    if (!validateEmail(email)) {
      return (errorMessage.value = 'Email is invalid');
    }

    loading.value = true;

    const { data: supabaseUser } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single();

    if (supabaseUser !== null) {
      loading.value = false;
      errorMessage.value = 'User already exists ';

      return;
    }

    errorMessage.value = '';

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      loading.value = false;
      errorMessage.value = error.message;

      return;
    }

    await supabase.from('users').insert({ username, email });

    const { data: newUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };

    loading.value = false;
    errorMessage.value = '';
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    user.value = null;
  };

  const getUser = async () => {
    loadingUser.value = true;

    const response = await supabase.auth.user();

    if (!response?.email) {
      loadingUser.value = false;
      return (user.value = null);
    }

    const { data: currentUser } = await supabase
      .from('users')
      .select()
      .eq('email', response?.email)
      .single();

    user.value = {
      id: currentUser.id,
      email: currentUser.email,
      username: currentUser.username,
    };

    loadingUser.value = false;
  };

  const clearErrorMessage = () => (errorMessage.value = '');

  return {
    user,
    errorMessage,
    loading,
    loadingUser,
    handleLogin,
    handleSignup,
    handleLogout,
    getUser,
    clearErrorMessage,
  };
});
