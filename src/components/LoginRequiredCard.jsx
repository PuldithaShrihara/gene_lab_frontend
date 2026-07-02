import React from 'react';

export default function LoginRequiredCard({ children }) {
  // Temporary bypass: render the form directly without requiring login
  return <>{children}</>;
}
