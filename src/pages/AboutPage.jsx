const IMG = "https://images.unsplash.com/photo-";

const team = [
  { name: "Elena Marchetti", role: "CEO & Co-founder", img: "https://i.pinimg.com/736x/70/ed/fd/70edfdc24e5b9a6b6a541a7362e493d8.jpg" },
  { name: "James Park", role: "Head of Operations", img: "https://i.pinimg.com/736x/b4/bc/fc/b4bcfcab46927c61803f7baa45c7e3d7.jpg" },
  { name: "Amara Osei", role: "Head Chef & Curation", img: "https://i.pinimg.com/736x/a5/84/f0/a584f0fe396c1b5b5ca2566ad0fae328.jpg" },
  { name: "Chloe Brennan", role: "Head of Design", img: "https://i.pinimg.com/1200x/e0/d1/7b/e0d17b563748132056032c9dc42e0287.jpg" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={`${IMG}1504674900247-0877df9cc836?w=1600&h=600&fit=crop&auto=format`} alt="About Foodi" className="w-full h-full object-cover bg-muted" />
          <div data-aos="fade-up" className="absolute inset-0 bg-charcoal/70 flex items-center justify-center text-center px-4">
          <div>
            <p className="text-primary font-700 text-sm uppercase tracking-widest mb-2">Our Story</p>
            <h1 className="font-display text-4xl sm:text-5xl text-white">About Foodi</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Intro */}
        <div data-aos="fade-up" className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-primary font-700 text-sm uppercase tracking-widest mb-2">Who we are</p>
            <h2 className="font-display text-3xl text-charcoal mb-4">We started hungry, and built something delicious</h2>
            <p className="text-stone leading-relaxed mb-4">
              Foodi began in 2021 with a simple mission: connect people with exceptional food, delivered with care. Our founders were tired of mediocre delivery apps that prioritized speed over quality.
            </p>
            <p className="text-muted-fg leading-relaxed">
              Today, we partner with over 600 restaurants and home kitchens across 12 cities, serving hundreds of thousands of meals every month — each one tracked, quality-checked, and guaranteed fresh.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden">
            <img src={`${IMG}1414235077428-338989a2e8c0?w=600&h=450&fit=crop&auto=format`} alt="Our kitchen" className="w-full object-cover bg-muted" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div data-aos="fade-up" className="grid sm:grid-cols-2 gap-5 mb-16">
          {[
            { label: "Our Mission", text: "To make extraordinary food accessible to everyone, without compromise on quality, speed, or experience." },
            { label: "Our Vision", text: "A world where the best meal of your life is always just minutes away, wherever you are." },
          ].map((item) => (
            <div key={item.label} className="bg-card border border-border-custom rounded-2xl p-7">
              <span className="text-3xl mb-3 block">{item.emoji}</span>
              <h3 className="font-display text-xl text-charcoal mb-2">{item.label}</h3>
              <p className="text-stone text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div data-aos="fade-up" className="bg-primary rounded-2xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white mb-16">
          {[["600+", "Partner restaurants"], ["12", "Cities covered"], ["2M+", "Meals delivered"], ["4.9★", "Average rating"]].map(([num, label]) => (
            <div key={label}>
              <p className="font-display text-4xl mb-1">{num}</p>
              <p className="text-white/70 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div data-aos="fade-up" className="mb-16">
          <div className="text-center mb-8">
            <p className="text-primary font-700 text-sm uppercase tracking-widest mb-1">The people</p>
            <h2 className="font-display text-3xl text-charcoal">Meet the team</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.img.startsWith("http") ? member.img : `${IMG}${member.img}?w=200&h=200&fit=crop&auto=format`}
                  alt={member.name}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto mb-3 bg-muted"
                />
                <p className="font-800 text-charcoal text-sm">{member.name}</p>
                <p className="text-xs text-muted-fg">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
