'use client';

import { useI18n } from './i18n';
import Link from 'next/link';

export default function Footer() {
  const { t } = useI18n();

  const footerLinks = [
    { href: '/privacy', label: t('footer.privacy') },
    { href: '/terms', label: t('footer.terms') },
    { href: '/contact', label: t('footer.contact') },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg transform rotate-45"></div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('header.title')}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} {t('header.title')}. {t('footer.rights')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Note */}
          <div className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-right">
            <p>{t('home.soulsetDesc')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}