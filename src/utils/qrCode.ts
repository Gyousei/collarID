import QRCode from 'qrcode';

export async function generateQrDataUrl(text: string, size = 320): Promise<string> {
  try {
    const url = await QRCode.toDataURL(text, {
      width: size,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#ffffff'
      },
      errorCorrectionLevel: 'M'
    });
    return url;
  } catch (err) {
    console.error('QR code generation error:', err);
    return '';
  }
}
