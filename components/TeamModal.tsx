"use client";

import { X, Users } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName?: string;
}

/* TEAM DATA */
/* TEAM DATA */
const TEAM_DATA: Record<
  string,
  { leadName: string; statement: string; members: { name: string }[] }
> = {
  "Publicity (Co - lead) Team": {
    leadName: "Osborn Gabriel Katung (Co-Lead)",
    statement:
      "It’s been such an amazing experience—one of my most enjoyable publicity roles yet. The decentralized workflow and the scale of the event made it even more special. I love seeing communication, creativity, and collaboration come together so beautifully",
    members: [
      { name: "Jolayemi Ayomide" },
      { name: "Oluwadamilare David" },
      { name: "Aliyu Taimiyyah Abdullahi" },
      { name: "Tetsola Marvellous" },
      { name: "Ogundele Eunice" },
      { name: "Abolarin Oluwabusolami Ayotomiwa" },
      { name: "Ibikunle Aishah Adekemi" },
      { name: "Yusuf Umuani" },
      { name: "Abdulaziz Ahmad" },
      { name: "Ashraff Samuel-Patrick" },
      { name: "Deniran Charity" },
    ],
  },

  "Publicity (Co-lead) Team": {
    leadName: "Odule Elizabeth Modesola (Co-Lead)",
    statement:
      "I love having great conversations and it was a no brainer that I’ll sign up to be part of an event where different people from different backgrounds can come together to share their thoughts and experiences. So far, I’ve genuinely enjoyed curating and executing publicity ideas alongside my team members to make the event known as much as possible.",
    members: [
      { name: "Jolayemi Ayomide" },
      { name: "Oluwadamilare David" },
      { name: "Aliyu Taimiyyah Abdullahi" },
      { name: "Tetsola Marvellous" },
      { name: "Ogundele Eunice" },
      { name: "Abolarin Oluwabusolami Ayotomiwa" },
      { name: "Ibikunle Aishah Adekemi" },
      { name: "Yusuf Umuani" },
      { name: "Abdulaziz Ahmad" },
      { name: "Ashraff Samuel-Patrick" },
      { name: "Deniran Charity" },
    ],
  },
  "Media and Audiovisual Team": {
    leadName: "Oyinloye Oluwadamilare Samuel",
    statement:
      "Serving as the Media and Audiovisual Lead for TEDx UITH has been a great experience. I have been involved in coordinating different creative teams and I look forward to managing the sound, lighting, and visual production, and ensuring seamless technical delivery at the event.",
    members: [
      { name: "Tolulope Oluropo" },
      { name: "Jedidiah Uzodinma" },
      { name: "Teniola Testimony Toluwalope" },
      { name: "Afolabi Jemimah Simisola" },
      { name: "Sawyerr Dorcas Olamide" },
      { name: "Abdulrahman Maryam Tanwa" },
      { name: "Omotosho Joshua Moranugba" },
      { name: "Ategbe Mercy" },
      { name: "Iheanacho John Caleb" },
      { name: "Taiwo Richard Godspromise" },
      { name: "Temilade Ayanfe" },
    ],
  },
  "Welfare Team": {
    leadName: "Ayomide Rotimi Evelyn (Team Lead)",
    statement:
      "On the welfare side of TEDxUITH, organizing was refreshingly hassle-free and enjoyable. With just routine online meetings, light coordination, and the most amazing team members, I genuinely loved bringing it all together.",
    members: [
      { name: "Ohajunwa John" },
      { name: "Bolanle Alimi" },
      { name: "Tolorunshagba Odunayo" },
      { name: "Abologbon Christianah Tobi" },
      { name: "Bello Grace Adeola" },
      { name: "Aasa Peace Erioluwa" },
      { name: "Adebisi Muftiat" },
    ],
  },
  "Fundraising Team": {
    leadName: "Adu Samuel Jesutofunmi (Team Lead)",
    statement:
      "Spearheading the Sponsorship and Partnership team was an exercise in relationship-building and strategic advocacy. Our task was critical: securing the resources necessary to bring the vision of TEDxUITH Ilorin to life. It was rewarding to connect with partners who believed in our mission, turning fundraising challenges into successful collaborations that fueled this transformative event.",
    members: [
      { name: "Adesina Titilayo Deborah" },
      { name: "Ajisafe Francis" },
      { name: "Tsado Beulah" },
    ],
  },
  "Web Development Team": {
    leadName: "Malomo Victor Ayooluwa",
    statement:
      "As the Web Development Team Lead, I led the journey of turning my brainchild into a fully realized digital experience for TEDxUITH Ilorin. What began as a simple idea grew into a fast, intuitive platform that reflects the excellent spirit of TEDx. Along the way, I built, debugged, and refined every detail, I’m especially grateful to our web designer for always showing up—even on impromptu calls—to bring part of the vision to life. And if everything looks effortless now, just know the bugs and I had several “meetings” before this version 🙂",
    members: [
      { name: "Salawu Olamilekan (UI/UX Designer)" },
      // { name: "Oyinloye Olanrewaju Joseph" },
    ],
  },
  "Logistics Team": {
    leadName: "Tanitoluwa Kola-Akinola",
    statement:
      "Being heavily involved in the backend of an event that can change the way people approach their lives and careers is nothing short of exciting. I am grateful for every minute I spend working with this team and hope for even better days ahead",
    members: [{ name: "Ajayi Emmanuel" }],
  },
  // "Branding & Design Team": {
  //   leadName: "Team Lead",
  //   statement:
  //     "Our team designs TEDxUITH Ilorin's branding and creative materials.",
  //   members: [
  //     { name: "Akinsipe Simileoluwa" },
  //     { name: "Babalola Moyinoluwa" },
  //     { name: "Rofiat Amuda" },
  //     { name: "Elias Ojo" },
  //   ],
  // },
  "Social Media Management Team": {
    leadName: "Olamide Ojediran",
    statement:
      "Overseeing TEDxUITH Ilorin's social media pages has been a wholesome experience. We've faced challenges such as increasing social media engagement and reach but asides that, there's been a steady growth in our online communities and that's been awesome.",
    members: [{ name: "Lucky Flourish Abisola" }, { name: "David Japheth" }],
  },

  "Lead Organizer / Licensee Team": {
    leadName: "Oyesola Victor",
    statement:
      "The idea of TEDxUITH Ilorin came from the desire to bring a distinct level of exposure to our student and young professional community by sharing groundbreaking ideas and having intellectual conversations. Leading the team has been a passionate journey, focused on delivering a transformative, clarity-driven event experience.",
    members: [
      { name: "Ola-Dahunsi Mercy Tomishola (General Secretary)" },
      { name: " Osborn Gabriel Katung (Publicity Co-lead)" },
      { name: "Odule Elizabeth Modesola (Publicity Co-lead)" },
      { name: " Victor Ayooluwa Malomo (Web Development Lead)" },
      {
        name: " Oyinloye Oluwadamilare Samuel (Media and Audio-visual Team Lead)",
      },
      { name: "Rotimi Evelyn Ayomide (Welfare Team Lead)" },
      { name: "Olamide Ojediran (Social Media Management Team Lead)" },
      { name: "Adu Samuel Oluwatomisin (Fundraising Team Lead)" },
      { name: "Tanitoluwa Kola-Akinola (Logistics Team Lead)" },
    ],
  },

  "General Secretary Team": {
    leadName: "Ola-Dahunsi Mercy Tomishola",
    statement:
      "Serving as the General Secretary was a profound experience in meticulous organization and strategic communication. My primary focus was ensuring every piece of documentation and correspondence flowed seamlessly, keeping the entire team aligned and on track. It was incredibly fulfilling to be the central point connecting all the moving parts of TEDxUITH Ilorin, contributing to the clarity and professionalism of our operations.",
    members: [
      { name: " Osborn Gabriel Katung (Publicity Co-lead)" },
      { name: "Odule Elizabeth Modesola (Publicity Co-lead)" },
      { name: " Victor Ayooluwa Malomo (Web Development Lead)" },
      {
        name: " Oyinloye Oluwadamilare Samuel (Media and Audio-visual Team Lead)",
      },
      { name: "Rotimi Evelyn Ayomide (Welfare Team Lead)" },
      { name: "Olamide Ojediran (Social Media Management Team Lead)" },
      { name: "Adu Samuel Oluwatomisin (Fundraising Team Lead)" },
      { name: "Tanitoluwa Kola-Akinola (Logistics Team Lead)" },
    ],
  },
};

/* FALLBACK DATA */
const DEFAULT_TEAM = {
  leadName: "Team Lead",
  statement:
    "Our team is dedicated to bringing ideas worth spreading to the TEDxUITH Ilorin community.",
  members: [],
};

export default function TeamModal({
  isOpen,
  onClose,
  teamName,
}: TeamModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const team = TEAM_DATA[teamName || ""] || DEFAULT_TEAM;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });

      gsap.fromTo(
        modalRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          delay: 0.1,
        },
      );
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-white text-black overflow-hidden shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="bg-primary text-white px-6 py-2 rounded-full font-medium flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Team</span>
          </div>

          <h2 className="text-xl md:text-3xl font-bold absolute left-1/2 -translate-x-1/2 hidden md:block">
            {teamName || "Team"}
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* TEAM LEAD */}
            <div className="w-full lg:w-[30%] flex flex-col">
              <p className="text-gray-600 leading-relaxed text-justify italic">
                {team.statement}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <p className="text-primary text-sm font-medium">
                  — {team.leadName}
                </p>
              </div>
            </div>

            {/* TEAM MEMBERS */}
            <div className="w-full lg:w-[70%] bg-gray-50 p-6 rounded-xl">
              <h4 className="font-bold mb-6">Team Members</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {team.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-gray-200 rounded-lg hover:border-primary transition-colors"
                  >
                    <p className="font-semibold text-sm text-black">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
