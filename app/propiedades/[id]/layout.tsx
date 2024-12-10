export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <div className="max-w-lg md:max-w-3xl lg:max-w-5xl text-center justify-center">
        {children}
      </div>
    </section>
  )
}
