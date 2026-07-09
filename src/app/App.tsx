import { useState } from "react";
import {
  MapPin, Clock, Users, Mail, Phone, Globe, X, Search, ChevronDown,
  Plus, ArrowRight, Heart, Leaf, BookOpen, Palette, Stethoscope,
  Send, CheckCircle, Calendar, LayoutDashboard, ChevronRight, ChevronUp,
  Flame, LogOut, Eye, EyeOff, Award, Star, Gift,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "landing" | "login"
  | "signup-volunteer" | "signup-company"
  | "browse" | "my-hours"
  | "company-dash" | "post-opportunity"
  | "founders" | "nav-wireframe"
  | "founder-muhssina" | "founder-sincere" | "founder-juan";

type AccountType = "volunteer" | "company";

type Category = "All" | "Environment" | "Education" | "Health" | "Arts" | "Community";

interface VolunteerUser {
  type: "volunteer";
  firstName: string;
  lastName: string;
  email: string;
  hoursLog: HourEntry[];
}

interface CompanyUser {
  type: "company";
  companyName: string;
  email: string;
  phone: string;
  website: string;
  description: string;
}

type AppUser = VolunteerUser | CompanyUser;

interface HourEntry {
  id: number;
  title: string;
  org: string;
  date: string;
  hours: number;
}

interface Applicant {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  availability: string;
  motivation: string;
  appliedDate: string;
}

interface CompanyEvent {
  id: number;
  companyEmail: string;
  title: string;
  category: Exclude<Category, "All">;
  location: string;
  commitment: string;
  spots: number;
  posted: string;
  description: string;
  skills: string[];
  image: string;
  applicants: Applicant[];
}

// ── Seed data ────────────────────────────────────────────────────────────────

const CATEGORY_ICONS: Record<Exclude<Category, "All">, React.ReactNode> = {
  Environment: <Leaf size={13} />,
  Education: <BookOpen size={13} />,
  Health: <Stethoscope size={13} />,
  Arts: <Palette size={13} />,
  Community: <Heart size={13} />,
};

const CATEGORY_COLORS: Record<Exclude<Category, "All">, string> = {
  Environment: "bg-emerald-100 text-emerald-800",
  Education: "bg-sky-100 text-sky-800",
  Health: "bg-rose-100 text-rose-800",
  Arts: "bg-violet-100 text-violet-800",
  Community: "bg-amber-100 text-amber-800",
};

// Demo volunteer account
const DEMO_VOLUNTEER: VolunteerUser = {
  type: "volunteer",
  firstName: "Jordan",
  lastName: "Rivera",
  email: "jordan@example.com",
  hoursLog: [
    { id: 1, title: "Urban Reforestation Crew", org: "GreenCity Alliance", date: "June 7, 2026", hours: 4 },
    { id: 2, title: "Adult Literacy Tutor", org: "Open Pages Foundation", date: "June 14, 2026", hours: 2 },
    { id: 3, title: "Adult Literacy Tutor", org: "Open Pages Foundation", date: "June 21, 2026", hours: 2 },
    { id: 4, title: "Neighborhood Clean-Up", org: "Higher Fire", date: "June 28, 2026", hours: 3 },
    { id: 5, title: "Urban Reforestation Crew", org: "GreenCity Alliance", date: "July 5, 2026", hours: 4 },
  ],
};

// Demo company account
const DEMO_COMPANY: CompanyUser = {
  type: "company",
  companyName: "Higher Fire",
  email: "contact@higherfire.org",
  phone: "+1 (718) 440-9920",
  website: "higherfire.org",
  description: "A Brooklyn-based nonprofit empowering youth through leadership programs, arts, and community action.",
};

const ALL_EVENTS: CompanyEvent[] = [
  {
    id: 101,
    companyEmail: "contact@higherfire.org",
    title: "Youth Leadership Workshop Series",
    category: "Education",
    location: "Brooklyn, NY",
    commitment: "Every Friday, 4–7pm",
    spots: 20,
    posted: "June 10, 2026",
    description: "Facilitate weekly leadership and professional-development workshops for high school students. Mentors guide small groups through goal-setting, public speaking, and career exploration.",
    skills: ["Mentorship", "Communication", "Youth work"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop&auto=format",
    applicants: [
      { id: 1, firstName: "Darius", lastName: "Mitchell", email: "d.mitchell@gmail.com", phone: "+1 (718) 334-5521", availability: "Fridays after 3pm", motivation: "I want to give back to the community that raised me.", appliedDate: "June 14, 2026" },
      { id: 2, firstName: "Priya", lastName: "Nair", email: "priya.nair@outlook.com", phone: "+1 (646) 209-7703", availability: "Flexible evenings", motivation: "Mentorship changed my life — I want to pay it forward.", appliedDate: "June 15, 2026" },
      { id: 3, firstName: "Carlos", lastName: "Vega", email: "cvega89@yahoo.com", phone: "+1 (929) 551-0042", availability: "Fridays all day", motivation: "I run youth programs at my church and want to expand my impact.", appliedDate: "June 17, 2026" },
      { id: 4, firstName: "Amara", lastName: "Osei", email: "amara.osei@proton.me", phone: "+1 (347) 882-1167", availability: "Weekday evenings", motivation: "I studied education and want hands-on experience with teens.", appliedDate: "June 20, 2026" },
      { id: 5, firstName: "Jordan", lastName: "Blake", email: "jblake.nyc@gmail.com", phone: "+1 (917) 443-0091", availability: "Fridays and Saturdays", motivation: "Higher Fire's mission aligns with everything I believe in.", appliedDate: "June 21, 2026" },
    ],
  },
  {
    id: 102,
    companyEmail: "contact@higherfire.org",
    title: "Community Tech Skills Bootcamp",
    category: "Education",
    location: "Bronx, NY (Remote OK)",
    commitment: "Tuesdays & Thursdays, 6–8pm",
    spots: 15,
    posted: "June 18, 2026",
    description: "Teach basic digital literacy — email, spreadsheets, job applications, and internet safety — to adults aged 25–60 re-entering the workforce.",
    skills: ["Tech skills", "Teaching", "Patience"],
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop&auto=format",
    applicants: [
      { id: 6, firstName: "Keisha", lastName: "Williams", email: "keisha.w@gmail.com", phone: "+1 (718) 220-3344", availability: "Tue & Thu evenings", motivation: "I work in IT and want to help people left behind by the digital divide.", appliedDate: "June 22, 2026" },
      { id: 7, firstName: "Tomás", lastName: "Reyes", email: "treyes@hotmail.com", phone: "+1 (646) 778-0055", availability: "Evenings, flexible days", motivation: "My parents struggled with technology. I want to make it easier for others.", appliedDate: "June 23, 2026" },
      { id: 8, firstName: "Fatima", lastName: "Hassan", email: "fatimah22@gmail.com", phone: "+1 (929) 103-7780", availability: "Remote only, any evening", motivation: "I am a software engineer and believe digital access is a human right.", appliedDate: "June 25, 2026" },
    ],
  },
  {
    id: 103,
    companyEmail: "contact@higherfire.org",
    title: "Neighborhood Clean-Up & Mural Day",
    category: "Community",
    location: "Harlem, NY",
    commitment: "One Saturday per month",
    spots: 40,
    posted: "June 25, 2026",
    description: "Join our monthly beautification crew to clean public spaces and paint community murals across Harlem blocks. All ages and skill levels welcome — supplies and breakfast provided.",
    skills: ["Physical activity", "Art", "Teamwork"],
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=500&fit=crop&auto=format",
    applicants: [
      { id: 9, firstName: "Marcus", lastName: "Thompson", email: "mthompson.art@gmail.com", phone: "+1 (212) 554-9901", availability: "Most Saturdays", motivation: "I am a muralist and love transforming neglected spaces.", appliedDate: "June 27, 2026" },
      { id: 10, firstName: "Destiny", lastName: "Carter", email: "destiny.c@icloud.com", phone: "+1 (347) 220-6612", availability: "Last Saturday of the month", motivation: "Harlem raised me. Keeping it beautiful is the least I can do.", appliedDate: "June 28, 2026" },
      { id: 11, firstName: "Liam", lastName: "O'Brien", email: "liamob@outlook.com", phone: "+1 (917) 334-0087", availability: "Any Saturday", motivation: "I want to meet my neighbors and contribute something tangible.", appliedDate: "June 29, 2026" },
      { id: 12, firstName: "Zara", lastName: "Ahmed", email: "zara.ahmed92@gmail.com", phone: "+1 (718) 667-4453", availability: "Every other Saturday", motivation: "I have two kids and want to model community service for them.", appliedDate: "July 1, 2026" },
      { id: 13, firstName: "Devon", lastName: "Harris", email: "devon.harris@yahoo.com", phone: "+1 (646) 990-2231", availability: "Flexible Saturdays", motivation: "Volunteer work keeps me grounded. Excited to paint something lasting.", appliedDate: "July 2, 2026" },
      { id: 14, firstName: "Nina", lastName: "Patel", email: "ninapatel.nyc@gmail.com", phone: "+1 (929) 441-8870", availability: "Any Saturday morning", motivation: "I want to learn mural techniques while giving back.", appliedDate: "July 3, 2026" },
    ],
  },
  // Public opportunities (non-Higher Fire)
  {
    id: 1,
    companyEmail: "volunteer@greencityalliance.org",
    title: "Urban Reforestation Crew",
    category: "Environment",
    location: "Portland, OR",
    commitment: "Every Saturday, 8am–12pm",
    spots: 12,
    posted: "June 28, 2026",
    description: "Join our weekend crews planting native trees and shrubs across Portland neighborhoods. No experience required — we supply all tools and training.",
    skills: ["Physical fitness", "Teamwork", "Outdoors"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop&auto=format",
    applicants: [],
  },
  {
    id: 2,
    companyEmail: "tutors@openpagesfoundation.org",
    title: "Adult Literacy Tutor",
    category: "Education",
    location: "Seattle, WA (Remote OK)",
    commitment: "2 hrs/week, flexible",
    spots: 30,
    posted: "June 25, 2026",
    description: "Work one-on-one with adult learners aged 18–65 to develop reading and writing skills. Training and curriculum materials provided.",
    skills: ["Communication", "Patience", "Teaching"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=500&fit=crop&auto=format",
    applicants: [],
  },
  {
    id: 3,
    companyEmail: "outreach@wellbridgeclinics.org",
    title: "Community Health Screener",
    category: "Health",
    location: "San Francisco, CA",
    commitment: "One weekend/month",
    spots: 8,
    posted: "June 22, 2026",
    description: "Support our mobile health unit by checking in patients, recording vitals, and guiding visitors through free screening stations.",
    skills: ["Healthcare interest", "Organization", "Bilingual a plus"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop&auto=format",
    applicants: [],
  },
];

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [user, setUser] = useState<AppUser | null>(null);
  const [signupType, setSignupType] = useState<AccountType>("volunteer");

  // Browse state
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [detailEvent, setDetailEvent] = useState<CompanyEvent | null>(null);
  const [applyEvent, setApplyEvent] = useState<CompanyEvent | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyForm, setApplyForm] = useState({ firstName: "", lastName: "", email: "", phone: "", availability: "", motivation: "" });

  // Company dash state
  const [activeEvent, setActiveEvent] = useState<CompanyEvent>(ALL_EVENTS[0]);
  const [expandedApplicant, setExpandedApplicant] = useState<number | null>(null);

  // Post form
  const [postForm, setPostForm] = useState({ title: "", category: "Community" as Exclude<Category,"All">, location: "", commitment: "", spots: "", description: "", skills: "" });
  const [postSuccess, setPostSuccess] = useState(false);

  const publicEvents = ALL_EVENTS;
  const companyEvents = user?.type === "company"
    ? ALL_EVENTS.filter(e => e.companyEmail === (user as CompanyUser).email)
    : [];

  const filteredEvents = publicEvents.filter((o) => {
    const matchCat = selectedCategory === "All" || o.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    return matchCat && (!q || o.title.toLowerCase().includes(q) || o.location.toLowerCase().includes(q));
  });

  const totalHours = user?.type === "volunteer"
    ? (user as VolunteerUser).hoursLog.reduce((s, e) => s + e.hours, 0)
    : 0;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => { setApplySuccess(false); setApplyEvent(null); setApplyForm({ firstName: "", lastName: "", email: "", phone: "", availability: "", motivation: "" }); }, 3000);
  };

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    setPostSuccess(true);
    setTimeout(() => { setPostSuccess(false); setScreen("company-dash"); }, 2500);
  };

  const logout = () => { setUser(null); setScreen("landing"); };

  // ── Screens ────────────────────────────────────────────────────────────────

  // Landing — public, shows all events; apply requires sign-up
  if (screen === "landing") return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border px-6 py-3 flex items-center justify-between gap-4">
        <Logo onClick={() => setScreen("landing")} />
        <div className="flex items-center gap-1 flex-1 justify-center">
          <NavBtn active={screen === "landing"} onClick={() => setScreen("landing")}>Gively</NavBtn>
          <NavBtn active={screen === "founder-muhssina"} onClick={() => setScreen("founder-muhssina")}>Muhssina Traore</NavBtn>
          <NavBtn active={screen === "founder-sincere"} onClick={() => setScreen("founder-sincere")}>Sincere Shakur</NavBtn>
          <NavBtn active={screen === "founder-juan"} onClick={() => setScreen("founder-juan")}>Juan Ortiz</NavBtn>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={() => setScreen("login")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition px-4 py-2 rounded-full hover:bg-secondary">
            Sign in
          </button>
          <button onClick={() => setScreen("signup-volunteer")} className="text-sm font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">
            Sign up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-accent mb-5">Community volunteering platform</p>
        <h1 className="font-[Playfair_Display,serif] text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6 max-w-2xl mx-auto">
          Give your time<br /><span className="italic text-primary">where it matters.</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Browse open volunteer opportunities below. Sign up to apply.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <AccountTypeCard
            icon={<Heart size={20} className="text-primary" />}
            title="Join as Volunteer"
            desc="Apply to opportunities and track your hours."
            onClick={() => setScreen("signup-volunteer")}
          />
          <AccountTypeCard
            icon={<Flame size={20} className="text-accent" />}
            title="Join as Organization"
            desc="Post opportunities and manage applicants."
            onClick={() => setScreen("signup-company")}
          />
        </div>
      </div>

      {/* Public event browser */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search opportunities…"
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition" />
          </div>
          <div className="flex flex-wrap gap-2">
            {(["All","Environment","Education","Health","Arts","Community"] as Category[]).map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedCategory === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(opp => (
            <article key={opp.id} className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <div className="relative h-44 overflow-hidden bg-muted">
                <img src={opp.image} alt={opp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${CATEGORY_COLORS[opp.category]}`}>
                  {CATEGORY_ICONS[opp.category]} {opp.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="text-xs text-muted-foreground mb-1">{opp.companyEmail.split("@")[1].split(".")[0]}</p>
                <h2 className="font-[Playfair_Display,serif] font-semibold text-foreground mb-3 leading-tight">{opp.title}</h2>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{opp.description}</p>
                <div className="flex flex-col gap-1 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin size={11} className="text-accent" />{opp.location}</span>
                  <span className="flex items-center gap-1.5"><Clock size={11} className="text-accent" />{opp.commitment}</span>
                  <span className="flex items-center gap-1.5"><Users size={11} className="text-accent" />{opp.spots} spots open</span>
                </div>
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => setScreen("signup-volunteer")}
                    className="w-full py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition flex items-center justify-center gap-1.5"
                  >
                    <Send size={13} /> Sign up to apply
                  </button>
                  <button onClick={() => setDetailEvent(opp)} className="w-full py-2 text-sm font-medium rounded-full bg-secondary text-foreground hover:bg-muted transition">
                    View details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detail modal (read-only on landing) */}
      {detailEvent && (
        <ModalOverlay onClose={() => setDetailEvent(null)}>
          <div className="bg-card w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="relative h-52 bg-muted">
              <img src={detailEvent.image} alt={detailEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button onClick={() => setDetailEvent(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"><X size={15} /></button>
              <span className={`absolute bottom-4 left-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[detailEvent.category]}`}>
                {CATEGORY_ICONS[detailEvent.category]} {detailEvent.category}
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-[Playfair_Display,serif] font-bold text-xl text-foreground mb-4">{detailEvent.title}</h2>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[["📍","Location",detailEvent.location],["🕐","Commitment",detailEvent.commitment],["👥","Spots",`${detailEvent.spots} open`]].map(([ic,l,v]) => (
                  <div key={l} className="bg-secondary rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">{ic} {l}</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{detailEvent.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {detailEvent.skills.map(s => <span key={s} className="px-3 py-1 bg-secondary rounded-full text-xs">{s}</span>)}
              </div>
              <button onClick={() => { setDetailEvent(null); setScreen("signup-volunteer"); }}
                className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                <Send size={14} /> Sign up to apply
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      <Footer onFounders={() => setScreen("founders")} onNavWireframe={() => setScreen("nav-wireframe")} />
    </div>
  );

  // Login
  if (screen === "login") return (
    <AuthLayout title="Sign in" subtitle="Welcome back to Gively" onHome={() => setScreen("landing")}>
      <LoginForm
        onVolunteer={() => { setUser(DEMO_VOLUNTEER); setScreen("browse"); }}
        onCompany={() => { setUser(DEMO_COMPANY); setScreen("company-dash"); setActiveEvent(ALL_EVENTS[0]); }}
        onBack={() => setScreen("landing")}
      />
    </AuthLayout>
  );

  // Volunteer signup
  if (screen === "signup-volunteer") return (
    <AuthLayout title="Create a volunteer account" subtitle="Start making a difference today" onHome={() => setScreen("landing")}>
      <VolunteerSignupForm
        onSubmit={(u) => { setUser(u); setScreen("browse"); }}
        onBack={() => setScreen("landing")}
      />
    </AuthLayout>
  );

  // Company signup
  if (screen === "signup-company") return (
    <AuthLayout title="Create an organization account" subtitle="Post opportunities and find your volunteers" onHome={() => setScreen("landing")}>
      <CompanySignupForm
        onSubmit={(u) => { setUser(u); setScreen("company-dash"); setActiveEvent(ALL_EVENTS[0]); }}
        onBack={() => setScreen("landing")}
      />
    </AuthLayout>
  );

  // Individual founder pages (accessible before and after login)
  const founderScreenMap: Record<string, string> = {
    "founder-muhssina": "Muhssina Traore",
    "founder-sincere": "Sincere Shakur",
    "founder-juan": "Juan Ortiz",
  };
  if (screen in founderScreenMap) {
    const founderName = founderScreenMap[screen];
    const founder = FOUNDERS.find(f => f.name === founderName)!;
    const isMuhssina = screen === "founder-muhssina";
    const isSincere  = screen === "founder-sincere";
    const isJuan     = screen === "founder-juan";
    const goBack = () => user ? setScreen("browse") : setScreen("landing");

    // ── Per-founder theme ──────────────────────────────────────────
    const pageStyle: React.CSSProperties = isMuhssina
      ? { background: "linear-gradient(160deg, #fff0f5 0%, #fce4ec 40%, #fdf2f8 100%)" }
      : isSincere
      ? { background: "linear-gradient(160deg, #f0fdf4 0%, #dcfce7 45%, #f0fdf4 100%)" }
      : isJuan
      ? { background: "#fff", position: "relative", overflow: "hidden" }
      : {};

    const navBg = isMuhssina ? "rgba(255,240,245,0.88)"
      : isSincere ? "rgba(240,253,244,0.88)"
      : isJuan    ? "rgba(255,255,255,0.92)"
      : "rgba(245,242,236,0.9)";

    const cardBg = isMuhssina ? "bg-pink-50 border-pink-200"
      : isSincere ? "bg-green-50 border-green-200"
      : isJuan    ? "border-red-200" : "bg-card border-border";

    const interestBg = isMuhssina ? "bg-pink-100"
      : isSincere ? "bg-green-100"
      : isJuan    ? "bg-red-50"
      : "bg-secondary";

    const labelColor = isMuhssina ? "#f472b6"
      : isSincere ? "#16a34a"
      : isJuan    ? "#dc2626"
      : "";

    const headingColor = isMuhssina ? "#be185d"
      : isSincere ? "#15803d"
      : isJuan    ? "#b91c1c"
      : "";

    const valueColor = isMuhssina ? "#9d174d"
      : isSincere ? "#14532d"
      : isJuan    ? "#7f1d1d"
      : "";

    const avatarStyle = isMuhssina
      ? "bg-gradient-to-br from-pink-300 to-rose-400 text-white shadow-lg shadow-pink-200"
      : isSincere
      ? "bg-gradient-to-br from-green-400 to-emerald-600 text-white shadow-lg shadow-green-200"
      : isJuan
      ? "bg-gradient-to-br from-red-400 to-red-600 text-white shadow-lg shadow-red-200"
      : founder.color;

    const nameFontStyle: React.CSSProperties = isMuhssina
      ? { fontFamily: "Dancing Script, cursive", fontSize: "3.5rem", color: headingColor, lineHeight: 1.2 }
      : isSincere
      ? { fontFamily: "Playfair Display, serif", color: headingColor, fontSize: "2.8rem", fontWeight: 700 }
      : isJuan
      ? { fontFamily: "'Comic Sans MS', 'Comic Sans', cursive", color: headingColor, fontSize: "2.8rem", fontWeight: 700 }
      : { fontFamily: "Playfair Display, serif", color: "var(--foreground)" };

    const bodyFont: React.CSSProperties = isJuan
      ? { fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }
      : {};

    return (
      <div className="min-h-screen flex flex-col font-[DM_Sans,sans-serif]" style={pageStyle}>

        {/* Juan's sunray background */}
        {isJuan && (
          <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{
                position: "absolute", top: "50%", left: "50%",
                width: 0, height: 0,
                borderLeft: "0px solid transparent",
                borderRight: "0px solid transparent",
                borderBottom: "160vh solid rgba(220,38,38,0.07)",
                transformOrigin: "50% 0%",
                transform: `rotate(${i * 22.5}deg) translateX(-50%)`,
              }} />
            ))}
          </div>
        )}

        <nav className="sticky top-0 z-40 backdrop-blur-md border-b border-border px-6 py-3 flex items-center gap-4 justify-between"
          style={{ background: navBg }}>
          <Logo onClick={goBack} />
          <div className="flex items-center gap-1 flex-1 justify-center flex-wrap">
            <NavBtn active={false} onClick={goBack}>Gively</NavBtn>
            <NavBtn active={screen === "founder-muhssina"} onClick={() => setScreen("founder-muhssina")}>Muhssina Traore</NavBtn>
            <NavBtn active={screen === "founder-sincere"} onClick={() => setScreen("founder-sincere")}>Sincere Shakur</NavBtn>
            <NavBtn active={screen === "founder-juan"} onClick={() => setScreen("founder-juan")}>Juan Ortiz</NavBtn>
          </div>
          <div className="shrink-0">
            {user
              ? <button onClick={() => { setUser(null); setScreen("landing"); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-foreground border border-border hover:text-foreground transition"><LogOut size={12} /> Sign out</button>
              : <button onClick={() => setScreen("login")} className="text-sm font-semibold px-4 py-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition">Sign in</button>
            }
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-6 py-16 flex-1 relative z-10">
          {/* Avatar + name */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-3xl font-bold mb-5 ${avatarStyle}`}
              style={nameFontStyle}>
              {founder.initials}
            </div>
            <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest mb-2"
              style={{ color: labelColor || "var(--muted-foreground)" }}>
              {founder.role} · TTL Summer Camp 2026
            </p>
            <h1 className="font-bold mb-4" style={nameFontStyle}>{founder.name}</h1>
            <p className="text-lg leading-relaxed max-w-md" style={{ color: valueColor || "var(--muted-foreground)", ...bodyFont }}>
              {founder.bio}
            </p>
          </div>

          {/* Contribution banners */}
          {isMuhssina && (
            <div className="mb-5 rounded-2xl border border-pink-200 bg-pink-50 px-6 py-5">
              <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-pink-400 mb-2">✨ Project contribution</p>
              <p className="text-sm text-rose-800 leading-relaxed">
                Muhssina shaped the soul of Gively — she brought <strong>personality and structure</strong> to the website,
                ensuring every page felt intentional, warm, and true to the platform's mission of making giving accessible to everyone.
              </p>
            </div>
          )}

          {isSincere && (
            <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 px-6 py-5">
              <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-green-600 mb-2">🛠️ Project contribution</p>
              <p className="text-sm text-green-900 leading-relaxed">
                Sincere built the <strong>sign-out flow</strong> for both volunteer and company accounts, and engineered the <strong>event-posting system</strong> that lets organizations publish opportunities directly from their dashboard. He also designed the <strong>behind-the-scenes database architecture</strong> that processes all accounts entering and leaving the platform — keeping every user's data organized and secure.
              </p>
            </div>
          )}

          {isJuan && (
            <div className="mb-5 rounded-2xl border-2 border-red-200 px-6 py-5" style={{ background: "rgba(255,255,255,0.85)", ...bodyFont }}>
              <p className="text-xs uppercase tracking-widest text-red-400 mb-2" style={{ fontFamily: "'Comic Sans MS', cursive" }}>🏆 Project contribution</p>
              <p className="text-sm text-red-900 leading-relaxed">
                Juan shaped the structure of the project, actively shared the results of his prompts, and drove the project forward by adding <strong>creativity and leadership</strong> at every stage.
              </p>
            </div>
          )}

          {/* Interests */}
          <div className={`border rounded-2xl p-6 ${cardBg}`} style={isJuan ? { background: "rgba(255,255,255,0.85)" } : {}}>
            <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest mb-5"
              style={{ color: labelColor || "var(--muted-foreground)" }}>🎯 Interests</p>
            <div className="grid grid-cols-2 gap-3">
              {founder.interests.map(item => (
                <div key={item.label} className={`rounded-xl p-4 flex flex-col gap-1.5 ${interestBg}`}>
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="text-xs" style={{ color: labelColor || "var(--muted-foreground)", ...bodyFont }}>{item.label}</p>
                  <p className="text-sm font-semibold" style={{ color: valueColor || "var(--foreground)", ...bodyFont }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Nav between founders */}
          <div className="flex justify-between mt-8">
            {FOUNDERS.filter(f => f.name !== founder.name).map(f => (
              <button key={f.name} onClick={() => setScreen(`founder-${f.name.split(" ")[0].toLowerCase()}` as Screen)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${f.color}`}>{f.initials}</div>
                <span className="group-hover:underline">{f.name}</span>
                <ArrowRight size={13} />
              </button>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Founders page
  if (screen === "founders") return <FoundersPage onBack={() => setScreen("landing")} />;

  // Nav wireframe
  if (screen === "nav-wireframe") return <NavWireframePage onBack={() => setScreen("landing")} />;

  // ── Authenticated shell ──────────────────────────────────────────────────────
  const isVolunteer = user?.type === "volunteer";
  const isCompany = user?.type === "company";
  const vol = user as VolunteerUser | null;
  const comp = user as CompanyUser | null;

  return (
    <div className="min-h-screen bg-background font-[DM_Sans,sans-serif]">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
          <Logo onClick={logout} />
          <div className="flex items-center gap-1 flex-1 justify-center flex-wrap">
            <NavBtn active={false} onClick={() => isVolunteer ? setScreen("browse") : setScreen("company-dash")}>Gively</NavBtn>
            <NavBtn active={screen === "founder-muhssina"} onClick={() => setScreen("founder-muhssina")}>Muhssina Traore</NavBtn>
            <NavBtn active={screen === "founder-sincere"} onClick={() => setScreen("founder-sincere")}>Sincere Shakur</NavBtn>
            <NavBtn active={screen === "founder-juan"} onClick={() => setScreen("founder-juan")}>Juan Ortiz</NavBtn>
            {isVolunteer && <div className="w-px h-4 bg-border mx-1" />}
            {isVolunteer && (
              <>
                <NavBtn active={screen === "browse"} onClick={() => setScreen("browse")}>Browse</NavBtn>
                <NavBtn active={screen === "my-hours"} onClick={() => setScreen("my-hours")}>My Hours</NavBtn>
              </>
            )}
            {isCompany && <div className="w-px h-4 bg-border mx-1" />}
            {isCompany && (
              <>
                <NavBtn active={screen === "company-dash"} onClick={() => setScreen("company-dash")}>My Events</NavBtn>
                <NavBtn active={screen === "post-opportunity"} accent onClick={() => { setScreen("post-opportunity"); setPostSuccess(false); }}>
                  <Plus size={13} /> Post Event
                </NavBtn>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-foreground leading-none">
                {isVolunteer ? `${vol!.firstName} ${vol!.lastName}` : comp!.companyName}
              </p>
              <p className="text-xs text-muted-foreground">{isVolunteer ? "Volunteer" : "Organization"}</p>
            </div>
            <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-muted-foreground border border-border hover:text-foreground hover:border-foreground/20 transition">
              <LogOut size={12} /> Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* ── BROWSE (volunteer) ──────────────────────────────────────────────── */}
      {screen === "browse" && (
        <div>
          <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
            <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-accent mb-4">Welcome back, {vol?.firstName}</p>
            <h1 className="font-[Playfair_Display,serif] text-4xl font-bold text-foreground mb-3">
              Find your next opportunity
            </h1>
            <p className="text-muted-foreground max-w-lg">Explore open volunteer positions and apply directly from here.</p>
          </div>

          {/* Filters */}
          <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search opportunities…" className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-full text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition" />
            </div>
            <div className="flex flex-wrap gap-2">
              {(["All","Environment","Education","Health","Arts","Community"] as Category[]).map(c => (
                <button key={c} onClick={() => setSelectedCategory(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${selectedCategory === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"}`}>{c}</button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div className="max-w-6xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(opp => (
                <article key={opp.id} className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
                  <div className="relative h-44 overflow-hidden bg-muted">
                    <img src={opp.image} alt={opp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${CATEGORY_COLORS[opp.category]}`}>
                      {CATEGORY_ICONS[opp.category]} {opp.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-muted-foreground mb-1">{opp.companyEmail.split("@")[1].split(".")[0]}</p>
                    <h2 className="font-[Playfair_Display,serif] font-semibold text-foreground mb-3 leading-tight">{opp.title}</h2>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{opp.description}</p>
                    <div className="flex flex-col gap-1 mb-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin size={11} className="text-accent" />{opp.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={11} className="text-accent" />{opp.commitment}</span>
                      <span className="flex items-center gap-1.5"><Users size={11} className="text-accent" />{opp.spots} spots open</span>
                    </div>
                    <div className="flex flex-col gap-2 pt-4 border-t border-border">
                      <button onClick={() => { setApplyEvent(opp); setApplySuccess(false); }} className="w-full py-2.5 text-sm font-semibold rounded-full bg-primary text-primary-foreground hover:opacity-90 transition flex items-center justify-center gap-1.5">
                        <Send size={13} /> Apply now
                      </button>
                      <button onClick={() => setDetailEvent(opp)} className="w-full py-2 text-sm font-medium rounded-full bg-secondary text-foreground hover:bg-muted transition">
                        View details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MY HOURS (volunteer) ────────────────────────────────────────────── */}
      {screen === "my-hours" && isVolunteer && (
        <div className="max-w-3xl mx-auto px-6 py-14">
          <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-accent mb-4">Your impact</p>
          <h1 className="font-[Playfair_Display,serif] text-4xl font-bold text-foreground mb-10">Service hours</h1>

          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Total hours", value: totalHours, icon: <Clock size={18} className="text-primary" /> },
              { label: "Events attended", value: vol!.hoursLog.length, icon: <Calendar size={18} className="text-primary" /> },
              { label: "Badge level", value: totalHours >= 20 ? "Gold" : totalHours >= 10 ? "Silver" : "Bronze", icon: <Star size={18} className="text-accent" /> },
            ].map(({ label, value, icon }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className="flex justify-center mb-2">{icon}</div>
                <p className="font-[Playfair_Display,serif] text-3xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Hours log */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-muted-foreground">Service log</p>
            </div>
            <div className="divide-y divide-border">
              {vol!.hoursLog.map(entry => (
                <div key={entry.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{entry.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{entry.org} · {entry.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                      <Clock size={11} /> {entry.hours}h
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-border bg-secondary flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Total</p>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                <Award size={13} /> {totalHours} hours
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPANY DASHBOARD ───────────────────────────────────────────────── */}
      {screen === "company-dash" && isCompany && (
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-border flex items-center justify-center">
              <Flame size={24} className="text-accent" />
            </div>
            <div>
              <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-accent mb-1">Organization dashboard</p>
              <h1 className="font-[Playfair_Display,serif] text-3xl font-bold text-foreground">{comp!.companyName}</h1>
              <p className="text-sm text-muted-foreground">{comp!.website} · {comp!.email}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[
              { label: "Active events", value: companyEvents.length },
              { label: "Total spots", value: companyEvents.reduce((s,e) => s + e.spots, 0) },
              { label: "Total applicants", value: companyEvents.reduce((s,e) => s + e.applicants.length, 0) },
            ].map(({ label, value }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-5 text-center">
                <p className="font-[Playfair_Display,serif] text-4xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Event list */}
            <div className="flex flex-col gap-3">
              <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-muted-foreground mb-1">Your posts</p>
              {companyEvents.map(evt => (
                <button key={evt.id} onClick={() => { setActiveEvent(evt); setExpandedApplicant(null); }}
                  className={`text-left p-4 rounded-2xl border transition-all ${activeEvent?.id === evt.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`text-xs mb-1 ${activeEvent?.id === evt.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{evt.category}</p>
                      <p className={`font-[Playfair_Display,serif] font-semibold text-sm leading-snug ${activeEvent?.id === evt.id ? "text-primary-foreground" : "text-foreground"}`}>{evt.title}</p>
                    </div>
                    <ChevronRight size={14} className={`shrink-0 mt-1 ${activeEvent?.id === evt.id ? "text-primary-foreground/60" : "text-muted-foreground"}`} />
                  </div>
                  <div className={`flex items-center gap-3 mt-3 text-xs ${activeEvent?.id === evt.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    <span className="flex items-center gap-1"><Users size={11} />{evt.applicants.length} applicants</span>
                    <span className="flex items-center gap-1"><MapPin size={11} />{evt.location.split(",")[0]}</span>
                  </div>
                </button>
              ))}
              <button onClick={() => { setScreen("post-opportunity"); setPostSuccess(false); }}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition">
                <Plus size={14} /> Post new event
              </button>
            </div>

            {/* Detail + applicants */}
            <div className="lg:col-span-2">
              {activeEvent ? (
                <div className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${CATEGORY_COLORS[activeEvent.category]}`}>
                          {CATEGORY_ICONS[activeEvent.category]} {activeEvent.category}
                        </span>
                        <h2 className="font-[Playfair_Display,serif] font-bold text-xl text-foreground">{activeEvent.title}</h2>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-[Playfair_Display,serif] text-2xl font-bold text-foreground">{activeEvent.applicants.length}</p>
                        <p className="text-xs text-muted-foreground">of {activeEvent.spots} spots</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5"><MapPin size={11} className="text-accent" />{activeEvent.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={11} className="text-accent" />{activeEvent.commitment}</span>
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-accent" />Posted {activeEvent.posted}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activeEvent.description}</p>
                  </div>

                  {/* Applicants */}
                  <div className="p-6">
                    <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-muted-foreground mb-4">
                      Applicants — {activeEvent.applicants.length} received
                    </p>
                    {activeEvent.applicants.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-6 text-center">No applicants yet.</p>
                    ) : (
                      <>
                        <div className="grid grid-cols-12 gap-2 px-3 pb-2 border-b border-border text-xs font-medium text-muted-foreground">
                          <span className="col-span-4">Name</span>
                          <span className="col-span-5">Email</span>
                          <span className="col-span-2">Applied</span>
                          <span className="col-span-1" />
                        </div>
                        <div className="divide-y divide-border">
                          {activeEvent.applicants.map(applicant => (
                            <div key={applicant.id}>
                              <button onClick={() => setExpandedApplicant(expandedApplicant === applicant.id ? null : applicant.id)}
                                className="w-full grid grid-cols-12 gap-2 px-3 py-3.5 text-left hover:bg-secondary/50 transition-colors rounded-xl">
                                <div className="col-span-4 flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold shrink-0">
                                    {applicant.firstName[0]}{applicant.lastName[0]}
                                  </div>
                                  <span className="text-sm font-medium text-foreground truncate">{applicant.firstName} {applicant.lastName}</span>
                                </div>
                                <div className="col-span-5 flex items-center">
                                  <a href={`mailto:${applicant.email}`} onClick={e => e.stopPropagation()} className="text-sm text-primary hover:underline flex items-center gap-1 truncate">
                                    <Mail size={11} />{applicant.email}
                                  </a>
                                </div>
                                <div className="col-span-2 flex items-center">
                                  <span className="text-xs text-muted-foreground">{applicant.appliedDate.replace(", 2026","")}</span>
                                </div>
                                <div className="col-span-1 flex items-center justify-end">
                                  {expandedApplicant === applicant.id ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronRight size={14} className="text-muted-foreground" />}
                                </div>
                              </button>
                              {expandedApplicant === applicant.id && (
                                <div className="mx-3 mb-3 p-4 bg-secondary rounded-xl text-sm space-y-3">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-0.5">Phone</p>
                                      <a href={`tel:${applicant.phone}`} className="font-medium text-foreground hover:text-primary transition">{applicant.phone}</a>
                                    </div>
                                    <div>
                                      <p className="text-xs text-muted-foreground mb-0.5">Availability</p>
                                      <p className="font-medium text-foreground">{applicant.availability}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-0.5">Why they want to volunteer</p>
                                    <p className="text-foreground leading-relaxed">{applicant.motivation}</p>
                                  </div>
                                  <a href={`mailto:${applicant.email}?subject=Your application for ${activeEvent.title}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition">
                                    <Mail size={11} /> Reply to {applicant.firstName}
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* ── POST OPPORTUNITY (company) ──────────────────────────────────────── */}
      {screen === "post-opportunity" && isCompany && (
        <div className="max-w-2xl mx-auto px-6 py-14">
          {postSuccess ? (
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={28} className="text-primary" />
              </div>
              <h2 className="font-[Playfair_Display,serif] text-3xl font-bold text-foreground mb-3">Opportunity posted!</h2>
              <p className="text-muted-foreground">Your listing is live. Redirecting to your dashboard…</p>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-accent mb-3">New listing</p>
                <h1 className="font-[Playfair_Display,serif] text-4xl font-bold text-foreground mb-3">Post a volunteer opportunity</h1>
                <p className="text-muted-foreground">This will be listed publicly and attributed to <span className="font-medium text-foreground">{comp!.companyName}</span>.</p>
              </div>
              <form onSubmit={handlePost} className="space-y-6">
                <fieldset className="bg-card border border-border rounded-2xl p-6 space-y-4">
                  <legend className="font-[Playfair_Display,serif] font-semibold text-foreground px-1 -mt-3 bg-card">Opportunity details</legend>
                  <FormField label="Title *" value={postForm.title} onChange={v => setPostForm({...postForm, title: v})} placeholder="e.g. Saturday Tree Planting Crew" required />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Category *</label>
                      <div className="relative">
                        <select required value={postForm.category} onChange={e => setPostForm({...postForm, category: e.target.value as Exclude<Category,"All">})}
                          className="w-full appearance-none px-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 pr-8">
                          {(["Environment","Education","Health","Arts","Community"] as const).map(c => <option key={c}>{c}</option>)}
                        </select>
                        <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <FormField label="Location *" value={postForm.location} onChange={v => setPostForm({...postForm, location: v})} placeholder="City, ST" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Time commitment *" value={postForm.commitment} onChange={v => setPostForm({...postForm, commitment: v})} placeholder="e.g. Saturdays, 9am–1pm" required />
                    <FormField label="Spots available *" value={postForm.spots} onChange={v => setPostForm({...postForm, spots: v})} placeholder="20" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Description *</label>
                    <textarea required rows={4} value={postForm.description} onChange={e => setPostForm({...postForm, description: e.target.value})}
                      placeholder="Describe what volunteers will do and any requirements…"
                      className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none" />
                  </div>
                  <FormField label="Skills / tags" value={postForm.skills} onChange={v => setPostForm({...postForm, skills: v})} placeholder="e.g. Teamwork, Outdoors, Bilingual" />
                </fieldset>
                <button type="submit" className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                  Publish listing <ArrowRight size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* ── Detail modal ────────────────────────────────────────────────────── */}
      {detailEvent && (
        <ModalOverlay onClose={() => setDetailEvent(null)}>
          <div className="bg-card w-full sm:max-w-xl rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[88vh] overflow-y-auto shadow-2xl">
            <div className="relative h-52 bg-muted">
              <img src={detailEvent.image} alt={detailEvent.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <button onClick={() => setDetailEvent(null)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"><X size={15} /></button>
              <span className={`absolute bottom-4 left-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[detailEvent.category]}`}>
                {CATEGORY_ICONS[detailEvent.category]} {detailEvent.category}
              </span>
            </div>
            <div className="p-6">
              <h2 className="font-[Playfair_Display,serif] font-bold text-xl text-foreground mb-4">{detailEvent.title}</h2>
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[["📍", "Location", detailEvent.location], ["🕐", "Commitment", detailEvent.commitment], ["👥", "Spots", `${detailEvent.spots} open`]].map(([ic, l, v]) => (
                  <div key={l} className="bg-secondary rounded-xl p-3">
                    <p className="text-xs text-muted-foreground">{ic} {l}</p>
                    <p className="text-sm font-medium text-foreground mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{detailEvent.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {detailEvent.skills.map(s => <span key={s} className="px-3 py-1 bg-secondary rounded-full text-xs">{s}</span>)}
              </div>
              <button onClick={() => { setDetailEvent(null); setApplyEvent(detailEvent); setApplySuccess(false); }}
                className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                <Send size={14} /> Apply to this opportunity
              </button>
            </div>
          </div>
        </ModalOverlay>
      )}

      {/* ── Apply modal ─────────────────────────────────────────────────────── */}
      {applyEvent && (
        <ModalOverlay onClose={() => !applySuccess && setApplyEvent(null)}>
          <div className="bg-card w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[92vh] overflow-y-auto shadow-2xl">
            {applySuccess ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5"><CheckCircle size={32} className="text-primary" /></div>
                <h2 className="font-[Playfair_Display,serif] text-2xl font-bold text-foreground mb-2">Application sent!</h2>
                <p className="text-sm text-muted-foreground">Your application has been submitted to <span className="font-medium text-foreground">{applyEvent.companyEmail.split("@")[1].split(".")[0]}</span>.</p>
              </div>
            ) : (
              <>
                <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Applying for</p>
                    <h2 className="font-[Playfair_Display,serif] font-bold text-base text-foreground">{applyEvent.title}</h2>
                  </div>
                  <button onClick={() => setApplyEvent(null)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition shrink-0"><X size={14} /></button>
                </div>
                <form onSubmit={handleApply} className="p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="First name *" value={applyForm.firstName} onChange={v => setApplyForm({...applyForm, firstName: v})} placeholder="Ada" required />
                    <FormField label="Last name *" value={applyForm.lastName} onChange={v => setApplyForm({...applyForm, lastName: v})} placeholder="Lovelace" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Email *" value={applyForm.email} onChange={v => setApplyForm({...applyForm, email: v})} placeholder="ada@example.com" required />
                    <FormField label="Phone" value={applyForm.phone} onChange={v => setApplyForm({...applyForm, phone: v})} placeholder="+1 (555) 000-0000" />
                  </div>
                  <FormField label={`Availability * (e.g. ${applyEvent.commitment})`} value={applyForm.availability} onChange={v => setApplyForm({...applyForm, availability: v})} placeholder="Describe your availability…" required />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Why do you want to volunteer here? *</label>
                    <textarea required rows={3} value={applyForm.motivation} onChange={e => setApplyForm({...applyForm, motivation: e.target.value})}
                      placeholder="Tell the organization why you're interested…"
                      className="w-full px-3.5 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none" />
                  </div>
                  <button type="submit" className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                    <Send size={14} /> Submit application
                  </button>
                </form>
              </>
            )}
          </div>
        </ModalOverlay>
      )}

      <Footer onFounders={() => setScreen("founders")} onNavWireframe={() => setScreen("nav-wireframe")} />
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 hover:opacity-80 transition">
      <GivelyMark />
      <span className="font-[Playfair_Display,serif] font-bold text-foreground tracking-tight">
        Give<span className="text-accent italic">ly</span>
      </span>
    </button>
  );
}

function GivelyMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Globe circle */}
      <circle cx="18" cy="15" r="10" fill="#2d5a3d" />
      {/* Globe latitude lines */}
      <ellipse cx="18" cy="15" rx="10" ry="4.5" fill="none" stroke="#f5f2ec" strokeWidth="0.8" opacity="0.5" />
      <line x1="8" y1="15" x2="28" y2="15" stroke="#f5f2ec" strokeWidth="0.8" opacity="0.5" />
      {/* Globe vertical arc */}
      <path d="M18 5 Q22 10 22 15 Q22 20 18 25" stroke="#f5f2ec" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M18 5 Q14 10 14 15 Q14 20 18 25" stroke="#f5f2ec" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Globe outline */}
      <circle cx="18" cy="15" r="10" fill="none" stroke="#1c2b1e" strokeWidth="0.6" opacity="0.2" />

      {/* Left hand (cupped, offering) */}
      <path d="M7 26 Q6 24 8 23 L13 22 Q14 22 14.5 23 L15 25" fill="#c8603a" stroke="#1c2b1e" strokeWidth="0.4" strokeLinejoin="round" />
      {/* Right hand */}
      <path d="M29 26 Q30 24 28 23 L23 22 Q22 22 21.5 23 L21 25" fill="#c8603a" stroke="#1c2b1e" strokeWidth="0.4" strokeLinejoin="round" />
      {/* Palms joining underneath */}
      <path d="M15 25 Q18 27 21 25 L22 28 Q18 31 14 28 Z" fill="#c8603a" stroke="#1c2b1e" strokeWidth="0.4" strokeLinejoin="round" />

      {/* Heart on top of globe */}
      <path d="M18 13 C18 13 15.5 10.5 14 11.5 C12.5 12.5 12.5 14.5 14 15.5 L18 19 L22 15.5 C23.5 14.5 23.5 12.5 22 11.5 C20.5 10.5 18 13 18 13 Z" fill="#f5f2ec" stroke="none" />
    </svg>
  );
}

function NavBtn({ children, active, accent, onClick }: { children: React.ReactNode; active?: boolean; accent?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
      active ? (accent ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground")
      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`}>
      {children}
    </button>
  );
}

function AccountTypeCard({ icon, title, desc, onClick }: { icon: React.ReactNode; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-64 bg-card border-2 border-border rounded-2xl p-6 text-left hover:border-primary hover:shadow-lg transition-all group">
      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-primary/10 transition">{icon}</div>
      <p className="font-[Playfair_Display,serif] font-semibold text-lg text-foreground mb-1">{title}</p>
      <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
      <div className="flex items-center gap-1 mt-4 text-xs font-medium text-primary">Get started <ArrowRight size={12} /></div>
    </button>
  );
}

function AuthLayout({ title, subtitle, children, onHome }: { title: string; subtitle: string; children: React.ReactNode; onHome?: () => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border px-6 py-4"><Logo onClick={onHome} /></nav>
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-accent mb-3">{subtitle}</p>
          <h1 className="font-[Playfair_Display,serif] text-3xl font-bold text-foreground mb-8">{title}</h1>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function LoginForm({ onVolunteer, onCompany, onBack }: { onVolunteer: () => void; onCompany: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "contact@higherfire.org") onCompany();
    else onVolunteer();
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <FormField label="Email *" value={email} onChange={setEmail} placeholder="your@email.com" required />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Password *</label>
        <div className="relative">
          <input required type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 pr-10" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>
      <button type="submit" className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
        Sign in <ArrowRight size={14} />
      </button>
      <div className="bg-secondary rounded-xl p-4 text-xs text-muted-foreground space-y-1">
        <p className="font-medium text-foreground mb-1">Demo accounts</p>
        <p>Volunteer: <span className="font-medium">jordan@example.com</span> / any password</p>
        <p>Company: <span className="font-medium">contact@higherfire.org</span> / any password</p>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        <button type="button" onClick={onBack} className="text-primary hover:underline">← Back to home</button>
      </p>
    </form>
  );
}

function VolunteerSignupForm({ onSubmit, onBack }: { onSubmit: (u: VolunteerUser) => void; onBack: () => void }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", city: "" });
  const [show, setShow] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type: "volunteer", firstName: form.firstName, lastName: form.lastName, email: form.email, hoursLog: [] });
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="First name *" value={form.firstName} onChange={v => setForm({...form, firstName: v})} placeholder="Ada" required />
        <FormField label="Last name *" value={form.lastName} onChange={v => setForm({...form, lastName: v})} placeholder="Lovelace" required />
      </div>
      <FormField label="Email *" value={form.email} onChange={v => setForm({...form, email: v})} placeholder="ada@example.com" required />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Password *</label>
        <div className="relative">
          <input required type={show ? "text" : "password"} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Create a password"
            className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 pr-10" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>
      <FormField label="City / location" value={form.city} onChange={v => setForm({...form, city: v})} placeholder="Brooklyn, NY" />
      <button type="submit" className="w-full py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
        Create account <ArrowRight size={14} />
      </button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <button type="button" className="text-primary hover:underline" onClick={onBack}>Sign in</button>
      </p>
    </form>
  );
}

function CompanySignupForm({ onSubmit, onBack }: { onSubmit: (u: CompanyUser) => void; onBack: () => void }) {
  const [form, setForm] = useState({ companyName: "", email: "", phone: "", website: "", description: "", password: "" });
  const [show, setShow] = useState(false);

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type: "company", companyName: form.companyName, email: form.email, phone: form.phone, website: form.website, description: form.description });
  };

  return (
    <form onSubmit={handle} className="space-y-4">
      <FormField label="Organization name *" value={form.companyName} onChange={v => setForm({...form, companyName: v})} placeholder="e.g. Higher Fire" required />
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Contact email *" value={form.email} onChange={v => setForm({...form, email: v})} placeholder="contact@org.org" required />
        <FormField label="Phone" value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="+1 (555) 000-0000" />
      </div>
      <FormField label="Website" value={form.website} onChange={v => setForm({...form, website: v})} placeholder="yourorg.org" />
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">About your organization</label>
        <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Briefly describe your mission and the kind of work you do…"
          className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 resize-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Password *</label>
        <div className="relative">
          <input required type={show ? "text" : "password"} value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Create a password"
            className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 pr-10" />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>
      <button type="submit" className="w-full py-3 rounded-full bg-accent text-accent-foreground font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
        Create organization account <ArrowRight size={14} />
      </button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account? <button type="button" className="text-primary hover:underline" onClick={onBack}>Sign in</button>
      </p>
    </form>
  );
}

function FormField({ label, value, onChange, placeholder, required }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <input required={required} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-input-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ring/40 transition" />
    </div>
  );
}

function ModalOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div onClick={e => e.stopPropagation()} className="w-full sm:max-w-xl">
        {children}
      </div>
    </div>
  );
}

// ── Founders Page ─────────────────────────────────────────────────────────────

const FOUNDERS = [
  {
    name: "Muhssina Traore",
    role: "Co-Founder",
    initials: "MT",
    color: "bg-violet-100 text-violet-800",
    accent: "#7c3aed",
    bio: "Passionate about community and culture, Muhssina brings creativity and heart to Gively.",
    interests: [
      { emoji: "📚", label: "Favorite Subject", value: "Literature" },
      { emoji: "📖", label: "Hobby", value: "Collects Books" },
      { emoji: "🏛️", label: "Favorite Place", value: "Museum of the Future" },
      { emoji: "🤠", label: "Favorite Movie", value: "Toy Story" },
    ],
  },
  {
    name: "Sincere Shakur",
    role: "Co-Founder",
    initials: "SS",
    color: "bg-green-100 text-green-800",
    accent: "#16a34a",
    bio: "Sincere is passionate about helping the community and finding easier ways of volunteering in communities that need it most. He combines his love of science and sport to build systems that connect people across the world.",
    interests: [
      { emoji: "🇹🇭", label: "Favorite Place", value: "Thailand" },
      { emoji: "🎬", label: "Favorite Movie", value: "Scarface" },
      { emoji: "⚛️", label: "Favorite Subject", value: "Physics" },
      { emoji: "🏀", label: "Hobby", value: "Basketball" },
    ],
  },
  {
    name: "Juan Ortiz",
    role: "Co-Founder",
    initials: "JO",
    color: "bg-red-100 text-red-800",
    accent: "#dc2626",
    bio: "Juan's curiosity for life sciences and love of adventure drive his vision for a more giving world.",
    interests: [
      { emoji: "🏰", label: "Favorite Place", value: "Disney World" },
      { emoji: "🤠", label: "Favorite Movie", value: "Toy Story" },
      { emoji: "🧬", label: "Favorite Subject", value: "Biology" },
      { emoji: "🚗", label: "Hobby", value: "Collects Hot Wheels" },
    ],
  },
];

function FoundersPage({ onBack }: { onBack: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
        <Logo onClick={onBack} />
        <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition">
          <ArrowRight size={13} className="rotate-180" /> Back
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16 flex-1">
        <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-accent mb-4 text-center">The team behind Gively</p>
        <h1 className="font-[Playfair_Display,serif] text-5xl font-bold text-foreground text-center mb-4 leading-tight">
          Meet the founders
        </h1>
        <p className="text-muted-foreground text-center max-w-lg mx-auto mb-16 leading-relaxed">
          Three students from TTL Summer Camp 2026 who believed technology could make giving back more accessible for everyone.
        </p>

        <div className="flex flex-col gap-5">
          {FOUNDERS.map((founder) => {
            const isOpen = expanded === founder.name;
            return (
              <div
                key={founder.name}
                className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Header row — always visible, click to expand */}
                <button
                  className="w-full flex items-center gap-5 p-6 text-left hover:bg-secondary/40 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : founder.name)}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold font-[DM_Mono,monospace] shrink-0 ${founder.color}`}>
                    {founder.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-0.5">{founder.role} · TTL Summer Camp 2026</p>
                    <h2 className="font-[Playfair_Display,serif] text-2xl font-bold text-foreground">{founder.name}</h2>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{founder.bio}</p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-border text-muted-foreground transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-secondary" : ""}`}>
                    <ChevronUp size={15} />
                  </div>
                </button>

                {/* Expanded interests */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-border pt-5">
                    <p className="text-xs font-[DM_Mono,monospace] uppercase tracking-widest text-muted-foreground mb-4">🎯 Interests</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {founder.interests.map((item) => (
                        <div
                          key={item.label}
                          className="bg-secondary rounded-xl p-4 flex flex-col gap-1.5"
                        >
                          <span className="text-2xl">{item.emoji}</span>
                          <p className="text-xs text-muted-foreground leading-tight">{item.label}</p>
                          <p className="text-sm font-semibold text-foreground leading-tight">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ── Nav Wireframe Page ────────────────────────────────────────────────────────

function NavWireframePage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: "#e8e8e8", minHeight: "100vh", fontFamily: "monospace", padding: 40 }}>
      {/* Back */}
      <button onClick={onBack} style={{ fontSize: 11, color: "#888", marginBottom: 32, display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", letterSpacing: 1 }}>
        ← BACK TO APP
      </button>

      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#888", textTransform: "uppercase", marginBottom: 6 }}>Lo-Fi Wireframe</div>
        <div style={{ fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 4 }}>NAVIGATION BARS</div>
        <div style={{ fontSize: 11, color: "#999" }}>All navbar states across the Gively platform</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, maxWidth: 860, margin: "0 auto" }}>

        {/* 1 - Public landing */}
        <WireSection label="01 · Public landing page — unauthenticated">
          <WireNav>
            <WireLogoMark />
            <div style={{ display: "flex", gap: 8 }}>
              <WireBtn>Sign in</WireBtn>
              <WireBtn filled>Sign up</WireBtn>
            </div>
          </WireNav>
          <WireAnnotation>Visible to all visitors. No account required. Two CTAs drive sign-up.</WireAnnotation>
        </WireSection>

        {/* 2 - Login / signup screens */}
        <WireSection label="02 · Auth screens (Login / Sign Up)">
          <WireNav>
            <WireLogoMark />
            <div style={{ fontSize: 9, color: "#aaa" }}>[ No additional nav items ]</div>
          </WireNav>
          <WireAnnotation>Logo only. Clicking the logo returns to the landing page.</WireAnnotation>
        </WireSection>

        {/* 3 - Volunteer logged in */}
        <WireSection label="03 · Volunteer account — logged in">
          <WireNav>
            <WireLogoMark />
            <div style={{ display: "flex", gap: 6 }}>
              <WireBtn active>Browse</WireBtn>
              <WireBtn>My Hours</WireBtn>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, fontWeight: "bold" }}>Jordan Rivera</div>
                <div style={{ fontSize: 8, color: "#888" }}>Volunteer</div>
              </div>
              <WireBtn small>↩ Sign out</WireBtn>
            </div>
          </WireNav>
          <WireAnnotation>Browse = opportunity listings. My Hours = service log + badge. Logo click = sign out + landing.</WireAnnotation>
        </WireSection>

        {/* 3b - My Hours active */}
        <WireSection label="03b · Volunteer — My Hours tab active">
          <WireNav>
            <WireLogoMark />
            <div style={{ display: "flex", gap: 6 }}>
              <WireBtn>Browse</WireBtn>
              <WireBtn active>My Hours</WireBtn>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, fontWeight: "bold" }}>Jordan Rivera</div>
                <div style={{ fontSize: 8, color: "#888" }}>Volunteer</div>
              </div>
              <WireBtn small>↩ Sign out</WireBtn>
            </div>
          </WireNav>
          <WireAnnotation>Active tab shown with filled chip. User name + role always visible top-right.</WireAnnotation>
        </WireSection>

        {/* 4 - Company logged in */}
        <WireSection label="04 · Organization account — logged in">
          <WireNav>
            <WireLogoMark />
            <div style={{ display: "flex", gap: 6 }}>
              <WireBtn active>My Events</WireBtn>
              <WireBtn accent>+ Post Event</WireBtn>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, fontWeight: "bold" }}>Higher Fire</div>
                <div style={{ fontSize: 8, color: "#888" }}>Organization</div>
              </div>
              <WireBtn small>↩ Sign out</WireBtn>
            </div>
          </WireNav>
          <WireAnnotation>My Events = dashboard with applicant data. Post Event = create listing form. Accent CTA for primary action.</WireAnnotation>
        </WireSection>

        {/* 4b - Post Event active */}
        <WireSection label="04b · Organization — Post Event active">
          <WireNav>
            <WireLogoMark />
            <div style={{ display: "flex", gap: 6 }}>
              <WireBtn>My Events</WireBtn>
              <WireBtn accent active>+ Post Event</WireBtn>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 9, fontWeight: "bold" }}>Higher Fire</div>
                <div style={{ fontSize: 8, color: "#888" }}>Organization</div>
              </div>
              <WireBtn small>↩ Sign out</WireBtn>
            </div>
          </WireNav>
          <WireAnnotation>Accent button remains visually distinct even when active to preserve hierarchy.</WireAnnotation>
        </WireSection>

        {/* 5 - Founders page */}
        <WireSection label="05 · Founders page nav">
          <WireNav>
            <WireLogoMark />
            <WireBtn small>← Back</WireBtn>
          </WireNav>
          <WireAnnotation>Minimal nav. Logo returns to landing. Back button explicit for clarity.</WireAnnotation>
        </WireSection>

        {/* Mobile note */}
        <div style={{ border: "2px dashed #bbb", borderRadius: 4, padding: 16, background: "#fff" }}>
          <div style={{ fontSize: 10, fontWeight: "bold", color: "#555", letterSpacing: 1, marginBottom: 8 }}>📱 MOBILE BEHAVIOR NOTE</div>
          <div style={{ fontSize: 10, color: "#777", lineHeight: 1.7 }}>
            · On small screens, user name/role badge is hidden (sm:block)<br />
            · Nav items stack or collapse based on account type<br />
            · Logo always remains as the home/back anchor<br />
            · Sign out button stays visible at all viewport sizes
          </div>
        </div>

        {/* Legend */}
        <div style={{ border: "2px solid #bbb", background: "#fff", borderRadius: 4, padding: 20 }}>
          <div style={{ fontWeight: "bold", fontSize: 10, letterSpacing: 1, marginBottom: 12, color: "#444" }}>LEGEND</div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 10, color: "#666" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#333", color: "#fff", borderRadius: 10, padding: "2px 10px", fontSize: 9 }}>Active</div>
              <span>Active / selected nav item</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#777", color: "#fff", borderRadius: 10, padding: "2px 10px", fontSize: 9 }}>Accent</div>
              <span>Primary action (Post Event)</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ background: "#fff", border: "1px solid #bbb", borderRadius: 10, padding: "2px 10px", fontSize: 9 }}>Idle</div>
              <span>Idle / inactive nav item</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 48, fontSize: 10, color: "#aaa" }}>
        Gively · Juan Ortiz, Muhssina Traore &amp; Sincere Shakur · TTL Summer Camp 2026
      </div>
    </div>
  );
}

/* ── Wire nav primitives ──────────────────────────────────────────────────── */

function WireSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 9, color: "#999", letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function WireNav({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "2px solid #999", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", gap: 12 }}>
      {children}
    </div>
  );
}

function WireLogoMark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 22, height: 22, background: "#555", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff" }}>🎁</div>
      <span style={{ fontWeight: "bold", fontSize: 12, letterSpacing: 0.5 }}>GIVELY</span>
    </div>
  );
}

function WireBtn({ children, filled, active, accent, small }: { children: React.ReactNode; filled?: boolean; active?: boolean; accent?: boolean; small?: boolean }) {
  const bg = (active && accent) ? "#666" : accent ? "#888" : (active || filled) ? "#333" : "#fff";
  const color = (active || filled || accent) ? "#fff" : "#555";
  const border = (active || filled || accent) ? "transparent" : "#bbb";
  return (
    <div style={{ background: bg, color, border: `1px solid ${border}`, borderRadius: 10, padding: small ? "2px 8px" : "3px 12px", fontSize: small ? 8 : 9, whiteSpace: "nowrap" as const, display: "inline-flex", alignItems: "center", gap: 3 }}>
      {children}
    </div>
  );
}

function WireAnnotation({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "3px solid #ccc", paddingLeft: 10, marginTop: 8, fontSize: 9, color: "#888", lineHeight: 1.6 }}>
      {children}
    </div>
  );
}

// ── Founders Page ─────────────────────────────────────────────────────────────

function Footer({ onFounders, onNavWireframe }: { onFounders?: () => void; onNavWireframe?: () => void }) {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center gap-3 text-center">
        <img src="/src/imports/Gemini_Generated_Image_csglp3csglp3csgl.png" alt="Higher Fire team logo" className="h-14 w-auto object-contain" />
        <p className="text-xs text-muted-foreground">
          This app was created by{" "}
          <span className="font-medium text-foreground">Juan Ortiz</span>,{" "}
          <span className="font-medium text-foreground">Muhssina Traore</span> and{" "}
          <span className="font-medium text-foreground">Sincere Shakur</span>{" "}
          during <span className="font-medium text-foreground">TTL Summer Camp</span> · 2026.
        </p>
        <div className="flex items-center gap-4 pt-1">
          {onFounders && (
            <button onClick={onFounders} className="text-xs text-primary hover:underline font-medium transition">
              Meet the founders
            </button>
          )}
          {onFounders && onNavWireframe && <span className="text-border">·</span>}
          {onNavWireframe && (
            <button onClick={onNavWireframe} className="text-xs text-muted-foreground hover:text-foreground transition">
              Nav wireframe
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
