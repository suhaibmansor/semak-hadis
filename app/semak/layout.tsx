interface SemakLayoutProps {
  children: React.ReactNode
}

export default async function SemakLayout({ children }: SemakLayoutProps) {
  return (
    <div className='border-b'>
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        {children}
      </div>
    </div>
  )
}
