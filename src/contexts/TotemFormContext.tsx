import { createContext, useContext } from "react"
import { useTotemForm } from "@/hooks/useTotemForm"

type TotemFormContextType = ReturnType<typeof useTotemForm>

export const TotemFormContext = createContext<TotemFormContextType | null>(null)

export const TotemFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const formState = useTotemForm()

  return (
    <TotemFormContext.Provider value={formState}>
      {children}
    </TotemFormContext.Provider>
  )
}

export const useTotemFormContext = () => {
  const context = useContext(TotemFormContext)
  if (!context) {
    throw new Error("useTotemFormContext must be used within a TotemFormProvider")
  }
  return context
}
