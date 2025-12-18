export type Language = 'fr' | 'en' | 'ar';

export interface Translations {
  [key: string]: {
    fr: string;
    en: string;
    ar: string;
  };
}

export const translations: Translations = {
  // Header
  'header.title': {
    fr: 'Soulset / Duality',
    en: 'Soulset / Duality',
    ar: 'سولسيت / ديواليتي'
  },
  'nav.home': {
    fr: 'Accueil',
    en: 'Home',
    ar: 'الرئيسية'
  },
  'nav.soulset': {
    fr: 'Soulset',
    en: 'Soulset',
    ar: 'سولسيت'
  },
  'nav.duality': {
    fr: 'Duality',
    en: 'Duality',
    ar: 'ديواليتي'
  },
  'nav.auth': {
    fr: 'Connexion',
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'nav.profile': {
    fr: 'Profil',
    en: 'Profile',
    ar: 'الملف الشخصي'
  },
  'nav.logout': {
    fr: 'Déconnexion',
    en: 'Logout',
    ar: 'تسجيل الخروج'
  },
  'theme.light': {
    fr: 'Clair',
    en: 'Light',
    ar: 'فاتح'
  },
  'theme.dark': {
    fr: 'Sombre',
    en: 'Dark',
    ar: 'داكن'
  },

  // Home Page
  'home.title': {
    fr: 'Bienvenue dans Soulset',
    en: 'Welcome to Soulset',
    ar: 'مرحبا بكم في سولسيت'
  },
  'home.subtitle': {
    fr: 'Explorer ton futur et ton état intérieur',
    en: 'Explore your future and inner state',
    ar: 'استكشف مستقبلك وحالتك الداخلية'
  },
  'home.getStarted': {
    fr: 'Commencer',
    en: 'Get Started',
    ar: 'ابدأ الآن'
  },
  'home.learnMore': {
    fr: 'En savoir plus',
    en: 'Learn More',
    ar: 'اعرف المزيد'
  },
  'home.soulsetTitle': {
    fr: 'Soulset',
    en: 'Soulset',
    ar: 'سولسيت'
  },
  'home.soulsetDesc': {
    fr: 'Analyse approfondie de votre état émotionnel et mental',
    en: 'Deep analysis of your emotional and mental state',
    ar: 'تحليل عميق لحالتك العاطفية والعقلية'
  },
  'home.dualityTitle': {
    fr: 'Duality',
    en: 'Duality',
    ar: 'ديواليتي'
  },
  'home.dualityDesc': {
    fr: 'Découvrez vos contradictions intérieures',
    en: 'Discover your inner contradictions',
    ar: 'اكتشف تناقضاتك الداخلية'
  },
  'home.featuresTitle': {
    fr: 'Caractéristiques',
    en: 'Features',
    ar: 'المميزات'
  },
  'home.feature1': {
    fr: 'Analyse émotionnelle',
    en: 'Emotional analysis',
    ar: 'تحليل عاطفي'
  },
  'home.feature2': {
    fr: 'Tests cognitifs',
    en: 'Cognitive tests',
    ar: 'اختبارات معرفية'
  },
  'home.feature3': {
    fr: 'Graphiques détaillés',
    en: 'Detailed charts',
    ar: 'رسوم بيانية مفصلة'
  },
  'home.feature4': {
    fr: 'Conseils personnalisés',
    en: 'Personalized advice',
    ar: 'نصائح مخصصة'
  },

  // Auth Page
  'auth.title': {
    fr: 'Connexion',
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'auth.email': {
    fr: 'Email',
    en: 'Email',
    ar: 'البريد الإلكتروني'
  },
  'auth.password': {
    fr: 'Mot de passe',
    en: 'Password',
    ar: 'كلمة المرور'
  },
  'auth.login': {
    fr: 'Se connecter',
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'auth.register': {
    fr: "S'inscrire",
    en: 'Register',
    ar: 'تسجيل حساب جديد'
  },
  'auth.noAccount': {
    fr: "Pas de compte ? S'inscrire",
    en: "No account? Register",
    ar: 'ليس لديك حساب؟ سجل الآن'
  },
  'auth.hasAccount': {
    fr: 'Déjà un compte ? Se connecter',
    en: 'Already have an account? Login',
    ar: 'لديك حساب بالفعل؟ سجل الدخول'
  },
  'auth.emailRequired': {
    fr: 'Email requis',
    en: 'Email is required',
    ar: 'البريد الإلكتروني مطلوب'
  },
  'auth.emailInvalid': {
    fr: 'Email invalide',
    en: 'Invalid email',
    ar: 'بريد إلكتروني غير صالح'
  },
  'auth.passwordRequired': {
    fr: 'Mot de passe requis',
    en: 'Password is required',
    ar: 'كلمة المرور مطلوبة'
  },
  'auth.passwordMinLength': {
    fr: 'Minimum 6 caractères',
    en: 'Minimum 6 characters',
    ar: '6 أحرف على الأقل'
  },

  // Soulset Page
  'soulset.title': {
    fr: 'Soulset - Analyse de votre état intérieur',
    en: 'Soulset - Inner State Analysis',
    ar: 'سولسيت - تحليل حالتك الداخلية'
  },
  'soulset.description': {
    fr: 'Répondez à ces questions pour analyser votre état émotionnel et mental actuel',
    en: 'Answer these questions to analyze your current emotional and mental state',
    ar: 'أجب على هذه الأسئلة لتحليل حالتك العاطفية والعقلية الحالية'
  },
  'soulset.question1': {
    fr: 'Comment vous sentez-vous en ce moment ?',
    en: 'How are you feeling right now?',
    ar: 'كيف تشعر الآن؟'
  },
  'soulset.question2': {
    fr: 'Quel est votre niveau de stress ?',
    en: 'What is your stress level?',
    ar: 'ما هو مستوى التوتر لديك؟'
  },
  'soulset.question3': {
    fr: 'Êtes-vous satisfait de vos relations ?',
    en: 'Are you satisfied with your relationships?',
    ar: 'هل أنت راض عن علاقاتك؟'
  },
  'soulset.optionVeryGood': {
    fr: 'Très bien',
    en: 'Very good',
    ar: 'جيد جدا'
  },
  'soulset.optionGood': {
    fr: 'Bien',
    en: 'Good',
    ar: 'جيد'
  },
  'soulset.optionNeutral': {
    fr: 'Neutre',
    en: 'Neutral',
    ar: 'محايد'
  },
  'soulset.optionBad': {
    fr: 'Mauvais',
    en: 'Bad',
    ar: 'سيئ'
  },
  'soulset.optionVeryBad': {
    fr: 'Très mauvais',
    en: 'Very bad',
    ar: 'سيئ جدا'
  },
  'soulset.submit': {
    fr: 'Analyser mon état',
    en: 'Analyze my state',
    ar: 'تحليل حالتي'
  },
  'soulset.results': {
    fr: 'Résultats de votre analyse',
    en: 'Your analysis results',
    ar: 'نتائج تحليلك'
  },
  'soulset.save': {
    fr: 'Sauvegarder les résultats',
    en: 'Save results',
    ar: 'حفظ النتائج'
  },
  'soulset.retry': {
    fr: 'Refaire le test',
    en: 'Retake test',
    ar: 'إعادة الاختبار'
  },

  // Duality Page
  'duality.title': {
    fr: 'Duality - Vos contradictions intérieures',
    en: 'Duality - Your Inner Contradictions',
    ar: 'ديواليتي - تناقضاتك الداخلية'
  },
  'duality.description': {
    fr: 'Découvrez les tensions entre ce que vous montrez et ce que vous ressentez réellement',
    en: 'Discover the tensions between what you show and what you really feel',
    ar: 'اكتشف التوترات بين ما تظهره وما تشعر به حقًا'
  },
  'duality.external': {
    fr: 'Vous montrez',
    en: 'You show',
    ar: 'أنت تظهر'
  },
  'duality.internal': {
    fr: 'Vous ressentez',
    en: 'You feel',
    ar: 'أنت تشعر'
  },
  'duality.conflict': {
    fr: 'Tension détectée',
    en: 'Tension detected',
    ar: 'تم اكتشاف توتر'
  },
  'duality.advice': {
    fr: 'Conseils personnalisés',
    en: 'Personalized advice',
    ar: 'نصائح مخصصة'
  },
  'duality.startAnalysis': {
    fr: 'Commencer l\'analyse',
    en: 'Start analysis',
    ar: 'بدء التحليل'
  },

  // Footer
  'footer.rights': {
    fr: 'Tous droits réservés',
    en: 'All rights reserved',
    ar: 'جميع الحقوق محفوظة'
  },
  'footer.privacy': {
    fr: 'Confidentialité',
    en: 'Privacy',
    ar: 'الخصوصية'
  },
  'footer.terms': {
    fr: 'Conditions',
    en: 'Terms',
    ar: 'الشروط'
  },
  'footer.contact': {
    fr: 'Contact',
    en: 'Contact',
    ar: 'اتصل بنا'
  },

  // Common
  'common.loading': {
    fr: 'Chargement...',
    en: 'Loading...',
    ar: 'جاري التحميل...'
  },
  'common.error': {
    fr: 'Une erreur est survenue',
    en: 'An error occurred',
    ar: 'حدث خطأ'
  },
  'common.success': {
    fr: 'Succès',
    en: 'Success',
    ar: 'نجاح'
  },
  'common.save': {
    fr: 'Sauvegarder',
    en: 'Save',
    ar: 'حفظ'
  },
  'common.cancel': {
    fr: 'Annuler',
    en: 'Cancel',
    ar: 'إلغاء'
  },
  'common.next': {
    fr: 'Suivant',
    en: 'Next',
    ar: 'التالي'
  },
  'common.back': {
    fr: 'Retour',
    en: 'Back',
    ar: 'رجوع'
  },
  'language.fr': {
    fr: 'Français',
    en: 'French',
    ar: 'الفرنسية'
  },
  'language.en': {
    fr: 'Anglais',
    en: 'English',
    ar: 'الإنجليزية'
  },
  'language.ar': {
    fr: 'Arabe',
    en: 'Arabic',
    ar: 'العربية'
  }
};

export function t(key: string, lang: Language = 'fr'): string {
  return translations[key]?.[lang] || key;
}