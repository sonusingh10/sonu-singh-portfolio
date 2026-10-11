export type Experience = {
  company: string;
  location: string;
  role: string;
  dates: string;
  summary: string;
  bullets: string[];
};

export type SkillGroup = {
  number: string;
  title: string;
  refrain: string;
  items: string[];
};

export type Project = {
  name: string;
  label: string;
  url: string;
  image: string;
  imageAlt: string;
  problem: string;
  approach: string;
  outcome: string;
  role: string;
  stack: string[] | null;
};

export const profile = {
  name: "Sonu Singh",
  initials: "SS",
  role: "Technical Account Manager · Network Security · Observability",
  headline:
    "I help enterprise teams understand what’s happening across complex networks, security, and digital experience.",
  location: "Kraków, Poland",
  availability: "Open to roles, freelance work & collaborations",
  email: "sonusinghabd@gmail.com",
  phone: null,
  summary:
    "Network security and technical account management professional with 10+ years across enterprise networking, firewall security, cloud platforms, observability, and technical consulting.",
  about: [
    "I like untangling hard problems, following evidence, and making the answer understandable to the people who need it.",
    "At Cisco, I work with enterprise customers using ThousandEyes to improve visibility, investigate network and application performance, and get lasting value from their observability stack.",
    "Alongside customer work, I’m building 7LayerX: a practical engineering knowledge platform covering networking, security, observability, cloud, DevOps, Linux, and AI one layer at a time.",
  ],
  principles: ["Trace the signal.", "Find the layer.", "Share what matters."],
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/sonusingh111106/",
    github: "https://github.com/sonusingh10",
  },
  experience: [
    {
      company: "Cisco Systems",
      location: "Kraków, Poland",
      role: "Technical Account Manager · ThousandEyes",
      dates: "Aug 2022 — Present",
      summary:
        "Helping enterprise customers improve adoption, technical outcomes, and observability maturity.",
      bullets: [
        "Drive ThousandEyes adoption, customer technical success, and observability maturity across enterprise accounts.",
        "Design and optimize observability architectures integrating ThousandEyes with Splunk, SolarWinds, and Grafana.",
        "Lead onboarding, enablement, workshops, health checks, architecture reviews, and Enterprise Agent deployments across cloud, hybrid, and on-premises environments.",
        "Investigate network, application, and infrastructure performance with ThousandEyes, logs, TCPDump, Wireshark, and partner teams across Product, Engineering, SRE, and DevOps.",
      ],
    },
    {
      company: "StarLink",
      location: "Dubai, UAE",
      role: "Technical Support Engineer",
      dates: "Feb 2020 — Jun 2022",
      summary: "Supporting enterprise firewall and network security deployments.",
      bullets: [
        "Resolved approximately 70% of Palo Alto Firewall and Panorama support incidents within 24 hours.",
        "Provided L2/L3 support for firewall policies, NAT, GlobalProtect, IPSec and SSL VPN, URL Filtering, Content-ID, security profiles, and threat prevention.",
        "Implemented and maintained firewall policies and vulnerability-mitigation recommendations.",
        "Investigated customer issues through log review, packet capture, configuration analysis, and escalation management.",
      ],
    },
    {
      company: "Barracuda Networks India Pvt. Ltd.",
      location: "India",
      role: "Technical Solution Engineer",
      dates: "Jul 2018 — Jan 2020",
      summary: "Enterprise firewall deployment and technical consulting.",
      bullets: [
        "Deployed Barracuda NextGen and CloudGen Firewall solutions for enterprise customers.",
        "Designed and deployed cloud firewall solutions across AWS, Azure, and GCP.",
        "Provided technical consulting from deployment through operations, including configuration, troubleshooting, and best-practice guidance.",
        "Used packet capture and log analysis to diagnose routing, security policy, VPN, and performance issues.",
      ],
    },
    {
      company: "Helloclass",
      location: "Bengaluru, India",
      role: "Support Engineer",
      dates: "Jan 2016 — Oct 2018",
      summary: "Enterprise networking and security operations across multi-site environments.",
      bullets: [
        "Managed and configured enterprise network and security infrastructure across multi-site environments.",
        "Supported Juniper SRX, Palo Alto, Cisco ASA, Cisco Meraki, and Cisco network devices.",
        "Worked with customers and internal IT teams to troubleshoot critical network issues and maintain service availability.",
        "Used Wireshark and TCPDump to diagnose connectivity, latency, and performance problems.",
      ],
    },
  ] satisfies Experience[],
  skills: [
    {
      number: "01",
      title: "Observability",
      refrain: "See the whole journey.",
      items: [
        "Cisco ThousandEyes",
        "Splunk",
        "SolarWinds",
        "Grafana",
        "Monitoring strategy",
        "Telemetry & dashboards",
        "Performance analysis",
      ],
    },
    {
      number: "02",
      title: "Networking",
      refrain: "Follow the packet.",
      items: [
        "TCP/IP",
        "DNS & DHCP",
        "HTTP/S",
        "Routing & switching",
        "IPSec VPN",
        "IKEv1/IKEv2",
        "Wireshark",
        "TCPDump",
        "Packet capture",
      ],
    },
    {
      number: "03",
      title: "Security",
      refrain: "Protect the path.",
      items: [
        "Palo Alto Firewall & Panorama",
        "Barracuda CloudGen",
        "Juniper SRX",
        "Cisco ASA & Meraki",
        "Forescout NAC",
        "IDS/IPS",
        "SSL/TLS",
        "802.1X",
        "GlobalProtect",
        "URL Filtering & Content-ID",
      ],
    },
    {
      number: "04",
      title: "Cloud & systems",
      refrain: "Understand the environment.",
      items: [
        "AWS",
        "Azure",
        "GCP",
        "Linux / Red Hat",
        "Windows",
        "Docker",
        "Python",
        "Blue Prism process automation",
        "SaaS security",
        "pfSense",
      ],
    },
  ] satisfies SkillGroup[],
  certifications: [
    "Cisco Certified DevNet Associate",
    "Palo Alto Networks PCNSE ×2",
    "Barracuda NextGen Firewall Certification",
    "Juniper JNCIA — Security",
    "Red Hat Certified System Administrator (RHCSA)",
    "Forescout FSCA",
  ],
  education: {
    degree: "Bachelor of Technology",
    field: "Electronics and Communication Engineering",
    institution: "Jaypee University of Engineering and Technology",
    dates: "2011 — 2015",
  },
  projects: [
    {
      name: "7LayerX",
      label: "Engineering knowledge platform",
      url: "https://www.7layerx.com/",
      image: "/images/7layerx-screenshot.webp",
      imageAlt:
        "7LayerX networking library showing its topic navigation, BGP articles, and practical learning resources.",
      problem:
        "The question behind 7LayerX: how can people explore the networks and infrastructure beneath modern work, one layer at a time?",
      approach:
        "Build a practical knowledge platform with engineering notes, hands-on labs, interactive learning, and small tools across networking, security, observability, cloud, DevOps, Linux, and AI.",
      outcome:
        "The live platform brings those resources together. Its networking library includes BGP articles, a learning module, an eBGP lab, and practical network tools.",
      role: "Creator and builder",
      stack: null,
    },
  ] satisfies Project[],
  seo: {
    title: "Sonu Singh — Network Security & Observability",
    description:
      "Technical Account Manager helping enterprise teams make sense of complex networks, security, and digital experience. Open to roles, freelance work, and collaborations.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.example",
  },
} as const;

export type Profile = typeof profile;
