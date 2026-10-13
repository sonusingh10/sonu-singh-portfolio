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

export type ToolCategory = {
  title: string;
  tools: string[];
};

export type ToolGroup = {
  title: string;
  categories: ToolCategory[];
};

export type Credential = {
  name: string;
  url?: string;
  issuerUrl?: string;
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
  contactNote:
    "Let’s connect, collaborate, and turn complex technology into real-world impact across networking, security, observability, and customer success.",
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
    website: "https://www.7layerx.com/",
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
        "Primary technical advisor to enterprise customers using ThousandEyes for digital experience monitoring, network visibility, and observability.",
      bullets: [
        "Align technical account strategies with customer priorities, infrastructure needs, operational objectives, and ThousandEyes adoption goals.",
        "Design and optimize end-to-end observability with ThousandEyes, Splunk, Grafana, OpenTelemetry, webhooks, SD-WAN, and Dynatrace; advise on instrumentation, telemetry pipelines, and monitoring practices.",
        "Lead proactive health checks, architecture reviews, optimization assessments, workshops, and enablement to surface risks and help teams realize platform value.",
        "Coordinate complex escalations and root-cause investigations with customers and Support, Product, Engineering, SRE, DevOps, Platform Engineering, and Development teams; share recurring needs to inform product improvements.",
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
        "Delivered L2/L3 enterprise network and security support for Palo Alto Networks NGFW and Panorama, including policies, NAT, GlobalProtect, VPN, URL Filtering, and threat prevention.",
        "Implemented approved changes and troubleshot complex incidents through recovery and root-cause analysis using logs, packet captures, and configuration analysis.",
        "Communicated with customers, identified risk, and recommended firewall and cybersecurity improvements while coordinating escalations.",
      ],
    },
    {
      company: "Barracuda Networks India Pvt. Ltd.",
      location: "India",
      role: "Technical Solution Engineer",
      dates: "Jul 2018 — Jan 2020",
      summary: "Enterprise firewall deployment and technical consulting.",
      bullets: [
        "Supported Barracuda NextGen and CloudGen Firewall customers in a 24×7×365 technical support environment.",
        "Troubleshot firewall configuration, routing, connectivity, and performance issues using packet captures and log analysis.",
        "Supported firewall deployments and configurations across AWS, Microsoft Azure, and GCP, from implementation through operations.",
        "Managed customer cases, communicated progress against service-level commitments, led root-cause analysis, and recommended configuration and security improvements.",
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
        "Email Security Gateway",
        "HTTP/S",
        "Routing & switching",
        "IPSec VPN",
        "IKEv1/IKEv2",
        "SD-WAN",
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
      title: "Cloud & Automation",
      refrain: "Understand the environment.",
      items: [
        "AWS",
        "Azure",
        "GCP",
        "Linux / Red Hat",
        "Ansible",
        "Docker",
        "Kubernetes",
        "Python",
        "Blue Prism process automation",
        "SaaS security",
      ],
    },
    {
      number: "05",
      title: "AI & monitoring",
      refrain: "Turn signals into useful workflows.",
      items: [
        "Built a ThousandEyes Alert Analysis skill",
        "Built an API-driven MCP server for monitoring",
      ],
    },
  ] satisfies SkillGroup[],
  toolGroups: [
    {
      title: "Network troubleshooting",
      categories: [
        { title: "Packet capture & analysis", tools: ["Wireshark", "tcpdump", "tshark"] },
        { title: "Connectivity & path", tools: ["ping", "traceroute / tracert", "MTR", "pathping", "hping3"] },
        { title: "Ports & scanning", tools: ["Nmap", "netcat (nc)", "telnet", "ss / netstat"] },
        { title: "Throughput", tools: ["iPerf3", "Speedtest CLI"] },
        { title: "Monitoring", tools: ["SolarWinds", "PRTG", "Nagios", "Cacti"] },
        { title: "Flow & logs", tools: ["NetFlow / sFlow", "Syslog", "SNMP"] },
        { title: "Simulation & lab", tools: ["GNS3", "Cisco Packet Tracer", "EVE-NG"] },
        { title: "Cloud networking", tools: ["AWS VPC Flow Logs", "AWS Reachability Analyzer", "Azure Network Watcher", "GCP Connectivity Tests"] },
      ],
    },
    {
      title: "Application troubleshooting",
      categories: [
        { title: "HTTP & API", tools: ["cURL", "Postman", "Browser DevTools (Network tab)", "Fiddler", "Charles Proxy"] },
        { title: "Logs & observability", tools: ["Splunk", "Kibana", "Grafana", "Dynatrace"] },
        { title: "Metrics & tracing", tools: ["Prometheus", "OpenTelemetry"] },
        { title: "Error tracking", tools: ["Sentry"] },
        { title: "Containers & orchestration", tools: ["Docker", "Kubernetes"] },
        { title: "Ticketing", tools: ["ServiceNow", "Jira"] },
      ],
    },
  ] satisfies ToolGroup[],
  certifications: [
    { name: "Cisco AI Technical Practitioner (AITECH)" },
    { name: "Data Science @ Cisco: Generative AI Blue Belt (2025)", issuerUrl: "https://www.linkedin.com/company/cisco/" },
    { name: "Cisco Certified DevNet Associate", url: "https://www.linkedin.com/in/sonusingh111106/overlay/1717784097315/single-media-viewer/?profileId=ACoAABYFUl0B0n_USsv5UzSY60-sb7NimUndSSA" },
    { name: "Cisco Certified Specialist — Enterprise Network Assurance", url: "https://www.linkedin.com/in/sonusingh111106/overlay/1717784078331/single-media-viewer/?profileId=ACoAABYFUl0B0n_USsv5UzSY60-sb7NimUndSSA" },
    { name: "Palo Alto Networks PCSE", url: "https://www.linkedin.com/in/sonusingh111106/overlay/1635473529501/single-media-viewer/?profileId=ACoAABYFUl0B0n_USsv5UzSY60-sb7NimUndSSA" },
    { name: "Palo Alto Networks Prisma Access — SASE", url: "https://www.linkedin.com/in/sonusingh111106/overlay/1635485788344/single-media-viewer/?profileId=ACoAABYFUl0B0n_USsv5UzSY60-sb7NimUndSSA" },
    { name: "Barracuda NextGen Firewall Certification" },
    { name: "Barracuda CloudGen Firewall", url: "https://www.linkedin.com/in/sonusingh111106/overlay/1635474122725/single-media-viewer/?profileId=ACoAABYFUl0B0n_USsv5UzSY60-sb7NimUndSSA" },
    { name: "Juniper JNCIA — Security" },
    { name: "Red Hat Certified System Administrator (RHCSA)" },
    { name: "Forescout FSCA" },
    { name: "NVIDIA AI Infrastructure and Operations Fundamentals", url: "https://www.coursera.org/account/accomplishments/verify/K8W9VRG10CEH?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course" },
  ] satisfies Credential[],
  recognition: [
    {
      name: "Excellent Performance and Contribution — StarLink FY21",
      url: "https://www.linkedin.com/in/sonusingh111106/overlay/1635490873082/single-media-viewer/?profileId=ACoAABYFUl0B0n_USsv5UzSY60-sb7NimUndSSA",
    },
  ] satisfies Credential[],
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
        "The live platform brings those resources together. Practical notes, hands-on labs, and small tools for the networks and infrastructure underneath modern work. Explore networking, security, observability, cloud, DevOps, Linux, and AI—one layer at a time.",
      role: "Creator and builder",
      stack: null,
    },
  ] satisfies Project[],
  seo: {
    title: "Sonu Singh — Network Security & Observability",
    description:
      "Technical Account Manager helping enterprise teams understand complex networks, security, and digital experience. Connect to discuss opportunities, collaborations, and real-world impact.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sonusinghx.com",
  },
} as const;

export type Profile = typeof profile;
