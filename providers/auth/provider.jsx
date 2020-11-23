import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [accesses, setAccesses] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadAccesses = async () => {
    const db = firebase.firestore();

    const accessesSnapshot = await db.collection('Visits').where('visitTo', '==', user.uid).get();

    const accessetToSet = [];

    accessesSnapshot.forEach((doc) => {
      accessetToSet.push(doc.data());
    });

    setAccesses(accessetToSet);
  };

  useEffect(() => {
    if (user) {
      reloadAccesses();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (auth) => {
      if (auth) {
        const db = firebase.firestore();

        const userSnapshot = await db.collection('Users').where('uid', '==', auth.uid).get();

        let userToSet;

        userSnapshot.forEach((doc) => {
          userToSet = doc.data();
        });

        setUser(userToSet);
      } else {
        setUser();
        setAccesses([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user ?? {},
        isLogged: !!user,
        accesses,
        loading,
        reloadAccesses,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
