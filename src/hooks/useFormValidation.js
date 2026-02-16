import { useState, useCallback } from 'react'
import { isValidEmail, isValidUrl } from '../utils/helpers'

export function useFormValidation(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validate = useCallback((fieldValues = values) => {
    const newErrors = {}

    for (const [field, rules] of Object.entries(validationRules)) {
      const value = fieldValues[field]

      // Required check
      if (rules.required && (!value || value.trim() === '')) {
        newErrors[field] = rules.requiredMessage || `${field} is required`
        continue
      }

      // Skip other validations if field is empty and not required
      if (!value || value.trim() === '') continue

      // Email validation
      if (rules.email && !isValidEmail(value)) {
        newErrors[field] = rules.emailMessage || 'Invalid email address'
        continue
      }

      // URL validation
      if (rules.url && !isValidUrl(value)) {
        newErrors[field] = rules.urlMessage || 'Invalid URL'
        continue
      }

      // Min length validation
      if (rules.minLength && value.length < rules.minLength) {
        newErrors[field] = rules.minLengthMessage || `Must be at least ${rules.minLength} characters`
        continue
      }

      // Max length validation
      if (rules.maxLength && value.length > rules.maxLength) {
        newErrors[field] = rules.maxLengthMessage || `Must be no more than ${rules.maxLength} characters`
        continue
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        newErrors[field] = rules.patternMessage || 'Invalid format'
        continue
      }

      // Custom validation
      if (rules.custom) {
        const customError = rules.custom(value, fieldValues)
        if (customError) {
          newErrors[field] = customError
        }
      }
    }

    return newErrors
  }, [values, validationRules])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setValues((prev) => ({ ...prev, [name]: newValue }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate single field on blur
    const fieldErrors = validate({ ...values, [name]: values[name] })
    if (fieldErrors[name]) {
      setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }))
    }
  }

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true)

    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
    setTouched(allTouched)

    // Validate all fields
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmit(values)
        setIsSubmitted(true)
      } catch (err) {
        setErrors({ submit: err.message || 'Submission failed' })
      }
    }

    setIsSubmitting(false)
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
    setIsSubmitted(false)
  }

  const getFieldProps = (name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] ? errors[name] : undefined,
  })

  const isValid = Object.keys(validate()).length === 0

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldProps,
    setValues,
    setErrors,
  }
}
