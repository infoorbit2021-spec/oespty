export default function ManagementTeam({ data }: { data: any[] }) {
  return (
    <section className="mb-16">
      <h3 className="text-3xl mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent text-center">
        Management Team
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((member, index) => (
          <div
            key={index}
            className="rounded-[3rem] p-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="h-32 rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-6 overflow-hidden">
              {member.Image ? (
                <img
                  src={`/img/${member.Image}`}
                  alt={member.Name}
                  className="h-full w-full object-cover rounded-[2rem]"
                />
              ) : (
                <span className="text-slate-400">Profile Image</span>
              )}
            </div>
            <h4 className="text-xl mb-2 text-slate-800">{member.Name}</h4>
            <p className="text-slate-600 text-sm">
              <strong>{member.Role}</strong> — {member.Description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
