import PageTitle from '../components/layout/PageTitle'
import SEO from '../components/SEO'
import { useFormValidation } from '../hooks/useFormValidation'

const initialValues = {
  djName: '',
  genre: '',
  instagram: '',
  mixLink: '',
  description: '',
}

const validationRules = {
  djName: {
    required: true,
    requiredMessage: 'DJ name is required',
    minLength: 2,
    minLengthMessage: 'DJ name must be at least 2 characters',
  },
  genre: {
    required: true,
    requiredMessage: 'Genre is required',
  },
  instagram: {
    pattern: /^@?[\w.]+$/,
    patternMessage: 'Please enter a valid Instagram handle',
  },
  mixLink: {
    required: true,
    requiredMessage: 'Mix link is required',
    url: true,
    urlMessage: 'Please enter a valid URL',
  },
  description: {
    maxLength: 1000,
    maxLengthMessage: 'Description must be under 1000 characters',
  },
}

export default function ApplyPage() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  } = useFormValidation(initialValues, validationRules)

  const onSubmit = async () => {
    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black pt-28">
        <div className="container-form section-padding text-center">
          <PageTitle title="SUBMITTED" />
          <p className="text-[#6B6865] text-lg animate-fade-in mb-8">
            We'll review your submission and reach out if it's a fit.
          </p>
          <button
            onClick={resetForm}
            className="text-[#C4C0BC] hover:text-[#E8E4E0] transition-colors text-sm uppercase tracking-wide"
          >
            Submit Another
          </button>
        </div>
      </div>
    )
  }

  const getFieldError = (fieldName) => touched[fieldName] && errors[fieldName]

  return (
    <div className="min-h-screen bg-black pt-28">
      <SEO
        title="Submit | DMV DJ Sessions"
        description="Submit your mix to DMV DJ Sessions. We curate emerging DJs across Washington DC, Maryland, and Virginia for high-quality video sessions."
      />
      <div className="container-form text-center">
        <PageTitle title="SUBMIT" />

        <p className="text-[#6B6865] text-lg mb-12 animate-fade-in">
          We curate emerging DJs across the DMV.<br />
          Submit your mix and tell us your sound.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(onSubmit)
          }}
          className="space-y-8 text-left animate-fade-in pb-24"
          style={{ animationDelay: '0.1s' }}
          noValidate
        >
          <div>
            <label
              htmlFor="djName"
              className="block text-sm font-medium uppercase tracking-wide text-[#6B6865] mb-3"
            >
              DJ Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="djName"
              name="djName"
              value={values.djName}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={getFieldError('djName') ? 'true' : 'false'}
              aria-describedby={getFieldError('djName') ? 'djName-error' : undefined}
              className={`w-full px-4 py-4 bg-[#141414] border text-white focus:outline-none transition-colors ${
                getFieldError('djName')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#1C1C1C] focus:border-white'
              }`}
            />
            {getFieldError('djName') && (
              <p id="djName-error" className="mt-2 text-sm text-red-500" role="alert">
                {errors.djName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium uppercase tracking-wide text-[#6B6865] mb-3"
            >
              Genre <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={values.genre}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="House, Afrobeats, Amapiano, Techno..."
              aria-invalid={getFieldError('genre') ? 'true' : 'false'}
              aria-describedby={getFieldError('genre') ? 'genre-error' : undefined}
              className={`w-full px-4 py-4 bg-[#141414] border text-white placeholder:text-[#444] focus:outline-none transition-colors ${
                getFieldError('genre')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#1C1C1C] focus:border-white'
              }`}
            />
            {getFieldError('genre') && (
              <p id="genre-error" className="mt-2 text-sm text-red-500" role="alert">
                {errors.genre}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="instagram"
              className="block text-sm font-medium uppercase tracking-wide text-[#6B6865] mb-3"
            >
              Instagram
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={values.instagram}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="@handle"
              aria-invalid={getFieldError('instagram') ? 'true' : 'false'}
              aria-describedby={getFieldError('instagram') ? 'instagram-error' : undefined}
              className={`w-full px-4 py-4 bg-[#141414] border text-white placeholder:text-[#444] focus:outline-none transition-colors ${
                getFieldError('instagram')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#1C1C1C] focus:border-white'
              }`}
            />
            {getFieldError('instagram') && (
              <p id="instagram-error" className="mt-2 text-sm text-red-500" role="alert">
                {errors.instagram}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="mixLink"
              className="block text-sm font-medium uppercase tracking-wide text-[#6B6865] mb-3"
            >
              SoundCloud / Mix Link <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="mixLink"
              name="mixLink"
              value={values.mixLink}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://"
              aria-invalid={getFieldError('mixLink') ? 'true' : 'false'}
              aria-describedby={getFieldError('mixLink') ? 'mixLink-error' : undefined}
              className={`w-full px-4 py-4 bg-[#141414] border text-white placeholder:text-[#444] focus:outline-none transition-colors ${
                getFieldError('mixLink')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#1C1C1C] focus:border-white'
              }`}
            />
            {getFieldError('mixLink') && (
              <p id="mixLink-error" className="mt-2 text-sm text-red-500" role="alert">
                {errors.mixLink}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium uppercase tracking-wide text-[#6B6865] mb-3"
            >
              Tell Us About Your Sound
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              aria-invalid={getFieldError('description') ? 'true' : 'false'}
              aria-describedby={getFieldError('description') ? 'description-error' : undefined}
              className={`w-full px-4 py-4 bg-[#141414] border text-white focus:outline-none transition-colors resize-none ${
                getFieldError('description')
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#1C1C1C] focus:border-white'
              }`}
            />
            {getFieldError('description') && (
              <p id="description-error" className="mt-2 text-sm text-red-500" role="alert">
                {errors.description}
              </p>
            )}
          </div>

          {errors.submit && (
            <div className="p-4 border border-red-500 bg-red-500/10 text-red-500 text-sm" role="alert">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-hover w-full py-4 bg-[#E8E4E0] text-[#0A0A0A] text-sm font-medium uppercase tracking-wide hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
