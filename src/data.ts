// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Muhammed Arshad P K",
  first: "Muhammed",
  last: "Arshad",
  role: "Computer Vision & AI Engineer",
  company: "Evolve Safety Consultive",
  location: "Puducherry, India",
  email: "arshadmhd004@gmail.com",
  phone: "+91 73568 46528",
  phoneHref: "tel:+917356846528",
  github: "https://github.com/muhammed-arshad-pk",
  linkedin: "https://www.linkedin.com/in/muhammed-arshad-p-k-691a52281",
  resume: "/Muhammed-Arshad-PK-Resume.pdf",
  tagline:
    "I build systems that see, reason and decide: real-time safety vision on industrial sites, clinical-grade wound segmentation, and multi-agent agents that learn to drive together.",
};

export const metrics = [
  { value: "98–99%", label: "Wound segmentation accuracy", note: "U-Net · 3000+ clinical images" },
  { value: "2.4×", label: "Over DQN-family baselines", note: "MQLC · dense highway traffic" },
  { value: "6.4M", label: "Trajectory samples modelled", note: "NGSIM · LSTM enc–dec" },
  { value: "±1–2%", label: "Field-calibrated flow accuracy", note: "ESP32 · 24×7 deployment" },
];

export type Role = {
  title: string;
  org: string;
  place?: string;
  period: string;
  current?: boolean;
  tag: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    title: "Computer Vision & AI Engineer",
    org: "Evolve Safety Consultive",
    period: "Sep 2026 — Present",
    current: true,
    tag: "Industrial Safety Vision",
    points: [
      "Building industrial-safety vision systems that analyse live camera feeds for PPE compliance, unsafe behaviour and hazardous site conditions.",
      "Training and fine-tuning YOLOv8 and YOLO11 detectors on custom workplace datasets for real-time monitoring.",
    ],
    stack: ["YOLO11", "YOLOv8", "OpenCV", "PyTorch"],
  },
  {
    title: "ML & CV Intern (R&D)",
    org: "Aerobiosys Innovations Pvt. Ltd.",
    period: "Aug 2025 — Sep 2026",
    tag: "Medical Imaging + LLMs",
    points: [
      "Developed a U-Net multi-class wound segmentation model on 3000+ annotated clinical images: 98–99% segmentation accuracy, 97%+ wound-area estimation accuracy for NPWT planning.",
      "Colour-based tissue segmentation with K-means (k=10) and dynamic cluster merging, robust across illumination and wound types.",
      "Built an LLM decision-support system (LangChain + Gemini, RAG over 16 textbooks and papers) and shipped the CV + LLM pipeline via FastAPI into a mobile clinical app.",
    ],
    stack: ["U-Net", "K-means", "LangChain", "Gemini", "RAG", "FastAPI"],
  },
  {
    title: "Research Intern: RL & Multi-Agent Systems",
    org: "NIT Karnataka",
    period: "May 2025 — Jul 2025",
    tag: "Reinforcement Learning",
    points: [
      "Implemented collaborative multi-agent Q-learning (MQLC) in highway-env: 120.41 cumulative reward in dense traffic, beating DQN, Double DQN, D3QN and QCOMBO.",
      "Designed a global–local Q-network with urgency-based arbitration and GCN-GRU intent prediction for 5-agent, 30-vehicle scenarios.",
      "Set up a reproducible CTDE training pipeline: reward shaping, joint-action evaluation, consistency loss.",
    ],
    stack: ["MARL", "GCN-GRU", "CTDE", "highway-env"],
  },
  {
    title: "Research Intern: IoT & Embedded Systems",
    org: "Haz Labs",
    period: "Mar 2025 — Apr 2025",
    tag: "Embedded Hardware",
    points: [
      "Built an ESP32 smart flow-monitoring system (YF-S201 + TFT) streaming real-time data to the cloud in field deployment.",
      "Calibrated via a 1-litre volumetric reference to ±1–2% accuracy across 1–30 L/min; verified 24×7 operation.",
    ],
    stack: ["ESP32", "C/C++", "Sensors", "Cloud"],
  },
  {
    title: "Research Intern: ML & IoT",
    org: "NIT Karnataka",
    period: "Dec 2024 — Jan 2025",
    tag: "Trajectory Prediction",
    points: [
      "LSTM encoder–decoder with manoeuvre-aware pooling on NGSIM (6.4M samples): 3 s history → 5 s future trajectories.",
      "Polar-coordinate interaction pooling (orientation, radial velocity) outperformed Euclidean pooling; 0.23 train / 0.29 val loss.",
    ],
    stack: ["LSTM", "TensorFlow", "NGSIM"],
  },
];

export type Project = {
  id: "safety" | "wound" | "mqlc" | "trajectory" | "flow";
  index: string;
  title: string;
  kicker: string;
  year: string;
  summary: string;
  points: string[];
  metrics: { value: string; label: string }[];
  stack: string[];
  github?: string;
  live?: string;
  status?: string;
};

export const projects: Project[] = [
  {
    id: "wound",
    index: "01",
    title: "CarePulse AI",
    kicker: "Wound analysis & NPWT decision support",
    year: "2025 — 2026",
    summary:
      "An end-to-end clinical pipeline that segments chronic wounds, classifies tissue, measures area and then asks an LLM, grounded in 16 clinical textbooks, what the therapy plan should be.",
    points: [
      "U-Net multi-class segmentation + K-means (k=10) colour clustering with adaptive merging to separate granulation, slough, necrotic and epithelial tissue across skin tones and lighting.",
      "RAG decision-support module (LangChain + Gemini) over clinical literature for Negative Pressure Wound Therapy planning.",
      "Served through FastAPI and Gradio for real-time, edge-ready inference inside a mobile clinical app.",
    ],
    metrics: [
      { value: "98–99%", label: "segmentation acc." },
      { value: "97%+", label: "area estimation" },
      { value: "3000+", label: "annotated images" },
    ],
    stack: ["PyTorch", "U-Net", "OpenCV", "K-means", "LangChain", "Gemini", "FastAPI", "Gradio"],
    github: "https://github.com/muhammed-arshad-pk/CarePulse-AI-System",
    live: "https://huggingface.co/spaces/Arshadpk/wound-Analysis",
  },
  {
    id: "mqlc",
    index: "02",
    title: "MQLC",
    kicker: "Multi-agent RL for cooperative lane changing",
    year: "2025",
    summary:
      "Five autonomous cars that negotiate lane changes in dense traffic instead of fighting over them, trained centrally and executed independently.",
    points: [
      "Collaborative MARL framework under centralised-training / decentralised-execution (CTDE).",
      "Dual global–local Q-network with GCN-GRU intent prediction and urgency-aware arbitration for 5 agents among 30 vehicles.",
      "120.41 cumulative reward in dense traffic: up to 2.4× DQN, Double DQN, D3QN and QCOMBO, with better safety and episode stability.",
    ],
    metrics: [
      { value: "120.41", label: "cumulative reward" },
      { value: "2.4×", label: "vs. baselines" },
      { value: "5 / 30", label: "agents / vehicles" },
    ],
    stack: ["PyTorch", "MARL", "GCN-GRU", "CTDE", "highway-env"],
    github: "https://github.com/muhammed-arshad-pk/MQLC-Traffic-MARL",
  },
  {
    id: "trajectory",
    index: "03",
    title: "Driver Intention Prediction",
    kicker: "Manoeuvre-aware trajectory forecasting",
    year: "2024",
    summary:
      "Reading what a human driver is about to do, from three seconds of motion, so an autonomous car can plan five seconds ahead.",
    points: [
      "LSTM encoder–decoder with manoeuvre-aware pooling on the NGSIM dataset (6.4M+ samples).",
      "Polar-coordinate interaction features (orientation, radial velocity) capture lane-change and merge intent better than Euclidean pooling.",
      "Masked MSE + Adam on GPU: 0.23 training / 0.29 validation loss on a 70/20/10 split.",
    ],
    metrics: [
      { value: "3s → 5s", label: "history → horizon" },
      { value: "6.4M", label: "samples" },
      { value: "0.29", label: "val. loss" },
    ],
    stack: ["TensorFlow", "LSTM", "NumPy", "Pandas", "NGSIM"],
    github:
      "https://github.com/muhammed-arshad-pk/Maneuver-Aware-Trajectory-Prediction-for-Autonomous-Vehicles-IoV-",
  },
  {
    id: "flow",
    index: "04",
    title: "Smart Flow Monitor",
    kicker: "ESP32 real-time display & cloud dashboard",
    year: "2025",
    summary:
      "Hardware that has to be right all day, every day: a calibrated flow meter with a local TFT readout and a live cloud dashboard.",
    points: [
      "ESP32 + YF-S201 flow sensor + TFT display, streaming calibrated readings to the cloud during field deployment.",
      "1-litre volumetric calibration of pulse-to-volume constants: ±1–2% accuracy across 1–30 L/min.",
      "Proven through 24×7 operation, power stabilisation and iterative hardware debugging.",
    ],
    metrics: [
      { value: "±1–2%", label: "accuracy" },
      { value: "1–30", label: "L/min range" },
      { value: "24×7", label: "uptime tested" },
    ],
    stack: ["ESP32", "C/C++", "TFT", "IoT Cloud", "Circuit design"],
    github:
      "https://github.com/muhammed-arshad-pk/ESP32-Dual-Flow-Monitoring-System-with-IoT-TFT-Display",
  },
  {
    id: "safety",
    index: "05",
    title: "Site Safety Vision",
    kicker: "PPE & hazard detection from live CCTV",
    year: "Now",
    status: "In production work · Evolve Safety Consultive",
    summary:
      "What I do every day: turning ordinary site cameras into a safety officer that never blinks, flagging missing helmets, vests and unsafe behaviour in real time.",
    points: [
      "Custom workplace datasets; YOLOv8 / YOLO11 training and fine-tuning for PPE compliance.",
      "Unsafe-behaviour and hazardous-condition detection on live camera feeds.",
    ],
    metrics: [
      { value: "YOLO11", label: "detector" },
      { value: "Real-time", label: "CCTV inference" },
    ],
    stack: ["YOLO11", "YOLOv8", "OpenCV", "PyTorch"],
  },
];

export const publication = {
  title:
    "AI-Enabled Energy Efficient Infrastructures for Real-Time Monitoring Using IoT: An Approach for Sustainable Development",
  venue:
    "2025 IEEE International Conference on Next-Gen Quantum and Advanced Computing: Algorithms, Security, and Beyond",
  place: "Bengaluru, India",
  year: "2025",
};

export const awards = [
  {
    place: "1st",
    title: "Project Competition",
    event: "4th Regional Conclave of Students' Chapters, IE(I) · PTU",
    date: "Mar 2025",
    detail:
      "IoT-Based Smart Campus Block Automation: Node-RED, MQTT, NoSQL and Grafana, cutting power wastage by up to 40%.",
  },
  {
    place: "2nd",
    title: "Model / Idea Competition",
    event: "4th Regional Conclave of Students' Chapters, IE(I) · PTU",
    date: "Mar 2025",
    detail:
      "IoT-Based Smart Irrigation System: local data processing for efficient water use with minimal internet dependency.",
  },
];

export const education = {
  degree: "B.Sc. (Honours with Research) Computer Science",
  school: "Pondicherry University",
  period: "2023 — Present",
  cgpa: "8.93 / 10",
};

export const skills = [
  { group: "Computer Vision", items: ["YOLOv8", "YOLO11", "U-Net", "CNNs", "OpenCV", "Segmentation", "Object Detection"] },
  { group: "ML & Deep Learning", items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Transformers", "LSTM", "Reinforcement Learning"] },
  { group: "LLMs & Serving", items: ["LangChain", "Gemini API", "RAG", "FastAPI", "Gradio", "Docker"] },
  { group: "Languages & Data", items: ["Python", "C", "C++", "SQL", "NumPy", "Pandas"] },
  { group: "Hardware & IoT", items: ["ESP32", "Arduino", "Raspberry Pi", "Sensors", "MQTT", "Node-RED", "Grafana"] },
];
