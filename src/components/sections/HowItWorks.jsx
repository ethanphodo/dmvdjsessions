const steps = [
  {
    number: '01',
    title: 'Apply',
    description: 'Submit your application with your mixes, bio, and social links. We review every submission.',
  },
  {
    number: '02',
    title: 'Selected',
    description: 'If selected, we\'ll reach out to schedule your session at one of our studio locations.',
  },
  {
    number: '03',
    title: 'Record',
    description: 'Show up, plug in, and play a 60-minute set. We handle all the production.',
  },
  {
    number: '04',
    title: 'Release',
    description: 'Your session is edited and released on YouTube and our social channels.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#050505] grid-bg">
      <div className="syber-divider" />
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="font-mono text-xs uppercase tracking-tight text-[#888] mb-8">
          [ 06 ] PROCESS
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-white italic">
              How It
              <br />
              Works
            </h2>
          </div>
          <div className="flex items-center">
            <p className="text-sm text-[#888] leading-relaxed">
              From application to release, here's how we create intimate sessions
              that showcase the DMV's finest selectors.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group border border-[#1A1A1A] bg-[#0A0A0A] hover:border-[#E21D1D] transition-all duration-75"
            >
              {/* Step Header */}
              <div className="border-b border-[#1A1A1A] px-4 py-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-tight text-[#888]">
                  STEP
                </span>
                <span className="text-2xl font-black text-white group-hover:text-[#E21D1D] transition-colors">
                  {step.number}
                </span>
              </div>

              {/* Step Content */}
              <div className="p-6">
                <h3 className="text-lg font-black uppercase tracking-tighter mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-[#888] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2">
                  <span className="text-[#1A1A1A] group-hover:text-[#E21D1D] transition-colors">
                    →
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
