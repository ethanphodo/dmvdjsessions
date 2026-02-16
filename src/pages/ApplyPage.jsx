import TalentForm from '../components/forms/TalentForm'

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-black pt-20 md:pt-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="pt-8 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Join Season 1
          </h1>
          <p className="text-lg text-[#888] max-w-lg mx-auto">
            Submit your mix and become part of the DMV DJ Sessions roster.
          </p>
        </div>

        {/* Form */}
        <div className="pb-24">
          <TalentForm />
        </div>
      </div>
    </div>
  )
}
