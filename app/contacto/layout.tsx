export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center md:py-10">
      <div className="inline-block max-w-lg lg:max-w-5xl text-center justify-center">
        {children}
      </div>
    </section>
  )
}
