export default function Clients() {
  const clients = ['pepsi.PNG', 'kfc.PNG', 'bk.PNG', 'harvard.PNG']

  return (
    <section className="py-20 bg-white text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p className="text-slate-600 mb-12">Partnering with global brands to deliver excellence</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clients.map((logo, i) => (
            <div key={i} className="flex justify-center">
              <img src={`/img/${logo}`} alt={logo.replace('.PNG', '')} className="h-16 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
