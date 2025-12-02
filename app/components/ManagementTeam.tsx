import { Linkedin } from "lucide-react";

export default function ManagementTeam({ data }: { data: any[] }) {
  return (
    <section className="mb-16 px-6   mx-auto max-w-5xl">
      <h3 className="text-3xl ps-6 my-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent text-start">
       <strong>Management Team</strong> 
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
  {data.map((member, index) => (
    <div
      key={index}
      className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative bg-gradient-to-br from-slate-50 to-slate-200 flex justify-center items-center h-64">
        {member.Image ? (
          <img
            src={`/img/${member.Image}`}
            alt={member.Name}
            className="h-40 w-40 object-cover shadow-md border-4 border-white group-hover:scale-105 transition-transform duration-300"
            style={{height:"200px", width:"200px", borderRadius:"50%"}}
          />
        ) : (
          <img
            src={`/img/profile_placeholder.png`}
            alt={member.Name}
            className="object-cover shadow-md border-4 border-white group-hover:scale-105 transition-transform duration-300"
             style={{height:"200px", width:"200px", borderRadius:"50%"}}
          />
          
        )}
      </div>
      <div className="p-8 pb-2 text-center">
        <h4 className="text-xl font-semibold text-slate-800 mb-1">
          {member.Name}
        </h4>
        <p className="text-slate-500 text-sm font-medium mb-2">
          {member.Role}
        </p>
        <p className="text-slate-600 text-sm leading-relaxed">
          {member.Description}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 pb-5">
        <a
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition"
    >
      <Linkedin className="w-6 h-6" />
      
    </a>
      </div>
    </div>
  ))}
</div>

    </section>
  );
}
