export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      {/* <div className="max-w-lg md:max-w-4xl lg:max-w-6xl text-center justify-center"> */}
      {children}
      {/* </div> */}
    </section>
  )
}
