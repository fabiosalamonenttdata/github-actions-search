import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type FC,
} from "react"
import { detectLanguage, type Language, getTranslation } from "./i18n"

type TranslationContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: Parameters<typeof getTranslation>[0]) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
)

export const TranslationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => detectLanguage())

  useEffect(() => {
    // Store language preference in localStorage
    localStorage.setItem("ghas-language", language)
  }, [language])

  const t = (key: Parameters<typeof getTranslation>[0]): string => {
    return getTranslation(key, language)
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within TranslationProvider")
  }
  return context
}
