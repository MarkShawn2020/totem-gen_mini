import type { FormErrors } from "@/types"

export const validateForm = (
  name: string,
  birthYear: string,
  gender: string,
  introduction: string,
): { isValid: boolean; errors: FormErrors; firstErrorField: string } => {
  const errors = {
    name: "",
    birthYear: "",
    gender: "",
    introduction: "",
  }
  let isValid = true
  let firstErrorField = ""

  if (!name.trim()) {
    errors.name = "请输入姓名"
    isValid = false
    firstErrorField = firstErrorField || "name"
  }
  if (!birthYear) {
    errors.birthYear = "请选择生辰年份"
    isValid = false
    firstErrorField = firstErrorField || "birthYear"
  }
  if (!gender) {
    errors.gender = "请选择性别倾向"
    isValid = false
    firstErrorField = firstErrorField || "gender"
  }
  if (!introduction.trim()) {
    errors.introduction = "请输入个人简介"
    isValid = false
    firstErrorField = firstErrorField || "intro"
  }

  return { isValid, errors, firstErrorField }
}
