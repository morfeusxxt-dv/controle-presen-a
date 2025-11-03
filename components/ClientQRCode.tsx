'use client';

import React from 'react';
import QRCode from 'qrcode.react';

interface ClientQRCodeProps {
  value: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
  fgColor?: string;
  bgColor?: string;
  imageSettings?: {
    src: string;
    height: number;
    width: number;
    excavate: boolean;
  };
}

const ClientQRCode: React.FC<ClientQRCodeProps> = ({
  value,
  size = 180,
  level = 'H',
  includeMargin = false,
  fgColor = '#1e40af',
  bgColor = '#ffffff',
  imageSettings = {
    src: '/favicon.ico',
    height: 30,
    width: 30,
    excavate: true,
  },
}) => {
  return (
    <QRCode
      value={value}
      size={size}
      level={level}
      includeMargin={includeMargin}
      fgColor={fgColor}
      bgColor={bgColor}
      imageSettings={imageSettings}
    />
  );
};

export default ClientQRCode;