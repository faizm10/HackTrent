import { CSSProperties } from 'react';

export const container: CSSProperties = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

export const header: CSSProperties = {
  textAlign: 'center' as const,
  marginBottom: '30px',
};

export const gridContainer: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
};

export const chartBox: CSSProperties = {
  padding: '20px',
  backgroundColor: '#f3f3f3',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center' as const,
};
