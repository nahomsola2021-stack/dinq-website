/**
 * WhatsApp deep-link helper for Dinq Tour, Travel & Events
 * Direct line: +251 913 817 153
 */
export const DINQ_WHATSAPP_NUMBER = '251913817153';
export const DINQ_PHONE_DISPLAY = '+251 913 817 153';
export const DINQ_EMAIL = 'info@dinqethiopia.com';
export const DINQ_OFFICE_ADDRESS = 'Bole Sub-City, Namibia Street, Addis Ababa, Ethiopia';

export function waLink(message: string): string {
  const encoded = encodeURIComponent(message || 'Hello Dinq Tour, Travel & Events. I would like to plan an expedition to Ethiopia.');
  return `https://wa.me/${DINQ_WHATSAPP_NUMBER}?text=${encoded}`;
}
