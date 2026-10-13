export type Language = "en" | "ja"

type TranslationKeys = {
  searchWorkflows: string
  searchPlaceholder: string
  closeButton: string
  noResults: string
  errorMessage: string
  loading: string
}

const translations: Record<Language, TranslationKeys> = {
  en: {
    searchWorkflows: "Search Workflows",
    searchPlaceholder: "Enter search keywords",
    closeButton: "Close",
    noResults: "No results found.",
    errorMessage: "Error: Something went wrong.",
    loading: "Loading workflows...",
  },
  ja: {
    searchWorkflows: "ワークフローを検索",
    searchPlaceholder: "検索キーワードを入力",
    closeButton: "閉じる",
    noResults: "結果が見つかりません",
    errorMessage: "エラー: 問題が発生しました。",
    loading: "ワークフローを読み込み中...",
  },
}

export const detectLanguage = (): Language => {
  // Check if browser language is Japanese
  const browserLang = navigator.language
  if (browserLang.startsWith("ja")) {
    return "ja"
  }
  return "en"
}

export const getTranslation = (
  key: keyof TranslationKeys,
  lang: Language
): string => {
  return translations[lang][key]
}
