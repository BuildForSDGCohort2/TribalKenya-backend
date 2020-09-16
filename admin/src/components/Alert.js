import React, { useContext, useEffect } from 'react';
import { AuthContext } from './admin-login/Auth.context';
import animateCSS from './animate';

export default function Alert() {
  const { message, success, dispatch } = useContext(AuthContext);
  useEffect(() => {
    if (message.length > 0) {
      animateCSS('.alert', 'bounceInDown');
      setTimeout(() => {
        animateCSS('.alert', 'bounceOutUp', () => dispatch({ type: 'message', message: '' }));
      }, 3000);
    }
  });
  return (
        <>
        {message.length > 0 ? (
            <div className="alert-wrapper mt-3">
                <div className={`alert alert-${success ? 'success' : 'danger'}`} role="alert">
                    {message}
                </div>
            </div>
        ) : null }
        </>
  );
}
