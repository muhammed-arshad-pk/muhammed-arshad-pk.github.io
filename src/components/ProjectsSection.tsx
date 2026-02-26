import { ExternalLink, Github, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avimage from '../assets/AV.jpg';
import av2image from '../assets/AV2.jpg';
import smartflow from '../assets/smartflow.jpg'
// import mnemonic from '../assets/mnemonics-to-opcode.jpg';
// import handwritten from '../assets/handwritten.jpg';
// import facedetection from '../assets/facedetection.jpg';
import carepulseImage from '../assets/carepulse.png';



const ProjectsSection = () => {
  const projects = [
    {
      title: 'CarePulse AI: Advanced Wound Analysis for NPWT',
      description: 'Designed and developed a multimodal clinical decision-support system for automated wound segmentation, tissue classification, and metric area estimation to assist Negative Pressure Wound Therapy (NPWT). The system combines U-Net++ with an EfficientNet-B0 backbone for precise segmentation and integrates RAG-powered LLMs (Gemini 1.5) to generate evidence-based clinical recommendations, reducing inter-observer variability and improving treatment outcomes.',
      image: carepulseImage, // Your image variable
      technologies: ['Medical AI', 'Computer Vision', 'U-Net++', 'PyTorch', 'Clinical Decision Support', 'RAG','Gemini API','FastAPI','Healthcare AI'],
      githubLink: 'https://github.com/muhammed-arshad-pk/CarePulse-AI-System', // Add your GitHub link here
      liveLink: 'https://huggingface.co/spaces/Arshadpk/wound-Analysis',
      featured: true,
      date: 'present'
    },
    {
      title: 'MQLC: Multi-Agent RL for Autonomous Driving',
      description: 'Developed and evaluated a collaborative multi-agent Q-learning framework (MQLC) to enable safe and intelligent lane-changing for autonomous vehicles in dense traffic. The model uses a dual Q-network and GCN-GRU for trajectory prediction, significantly improving decision efficiency and safety in simulations.',
      image: avimage, // Your image variable
      technologies: ['Reinforcement Learning', 'Python', 'PyTorch', 'GCN-GRU', 'Multi-Agent Systems', 'highway-env'],
      githubLink: 'https://github.com/muhammed-arshad-pk/MQLC-Traffic-MARL', // Add your GitHub link here
      featured: true,
      date: '2025'
    },
    {
      title: 'Driver Intention Prediction for Autonomous Vehicles',
      description: 'Developed a novel machine learning model to improve autonomous vehicle trajectory prediction by accurately identifying human driver intentions. This approach uses a maneuver-aware pooling mechanism, demonstrating significant accuracy improvements over state-of-the-art methods on the NGSIM dataset.',
      image: av2image, // Your image variable
      technologies: ['Machine Learning', 'Python', 'Autonomous Driving', 'Pandas', 'NumPy', 'TensorFlow'],
      //liveLink: '#',
      githubLink: 'https://github.com/muhammed-arshad-pk/Maneuver-Aware-Trajectory-Prediction-for-Autonomous-Vehicles-IoV-',
      featured: true,
      date: '2025'
    },
    {
      title: 'IoT Smart Flow Monitoring System',
      description: 'Designed and built an end-to-end IoT system for real-time flow monitoring. The project involved developing custom ESP32-based hardware with a local display and a cloud-based dashboard for remote data visualization. Responsibilities included circuit design, sensor interfacing, soldering, and hardware testing.',
      image: smartflow, // The variable for your project image
      technologies: ['IoT', 'ESP32', 'Embedded Systems', 'Circuit Design', 'C/C++', 'Cloud Integration'],
      //liveLink: '#', // Not applicable for a hardware project
      githubLink: 'https://github.com/muhammed-arshad-pk/ESP32-Dual-Flow-Monitoring-System-with-IoT-TFT-Display', // Add your GitHub repository link here
      featured: true,
      date: '2025'
    },
    // {
    //   title: 'Mnemonic to Opcode Converter',
    //   description: 'A web-based tool that converts assembly language mnemonics into their corresponding opcodes in real-time. Originally a C program, this app was rebuilt for the web with a user-friendly interface that includes syntax validation for mnemonics and addresses. It is designed to be a helpful utility for students and programmers working with low-level code.',
    //   image: mnemonic , // The image previously generated for this project
    //   technologies: ['JavaScript', 'HTML5', 'CSS3', 'C', 'GitHub Pages'],
    //   liveLink: 'https://muhammed-arshadpk.github.io/mnemonic-to-opcode-converter/',
    //   githubLink: 'https://github.com/muhammed-arshadpk/mnemonic-to-opcode-converter',
    //   featured: true,
    //   date: '2025'
    // },
    // {
    //   title: 'Handwritten Digit Classifier (CNN)',
    //   description: 'As part of my internship at NITK Surathkal, I built and trained a Convolutional Neural Network (CNN) to classify MNIST digits, achieving 99.18% accuracy. The project involved preprocessing data, designing a robust CNN architecture, and successfully testing the model on custom, real-world handwritten images to confirm its practical application.',
    //   image: handwritten, // The custom image for this project
    //   technologies: ['Python', 'TensorFlow', 'Keras', 'Computer Vision', 'Scikit-learn', 'NumPy'],
    //   liveLink: '#',
    //   githubLink: '#', // Add your GitHub repository link here
    //   featured: false,
    //   date: '2024'
    // },
    // {
    //   title: 'Sports Personality Classifier',
    //   description: 'Developed a Convolutional Neural Network (CNN) to identify sports personalities from images. This foundational project, part of my internship at NITK Surathkal, was built using TensorFlow and Keras to gain hands-on experience in data preprocessing, model training, and feature extraction for deep learning applications.',
    //   image: facedetection, // Your image variable
    //   technologies: ['Python', 'TensorFlow', 'Keras', 'CNNs', 'Computer Vision'],
    //   liveLink: '#',
    //   githubLink: '#', // Add your GitHub repository link here
    //   featured: false,
    //   date: '2024'
    // },
  ];

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
          A showcase of my projects in Machine Learning, IoT, and Web Development, demonstrating skills in computer vision, embedded systems, and building practical applications.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="space-y-16 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Project Image */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="relative group">
                  <div className="absolute inset-0 hero-gradient rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="relative w-full h-80 object-cover rounded-lg shadow-2xl group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-accent">
                    <Calendar size={16} />
                    <span className="text-sm">{project.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground text-lg">{project.description}</p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-4">
                  <Button
                    variant="default"
                    className="hero-gradient hover:scale-105 transition-transform"
                    asChild
                  >
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-border hover:glass-card hover:scale-105 transition-all"
                    asChild
                  >
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects Grid */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Other <span className="gradient-text">Projects</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {otherProjects.map((project, index) => (
              <div
                key={index}
                className="glass-card overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold">{project.title}</h4>
                    <span className="text-sm text-accent">{project.date}</span>
                  </div>
                  <p className="text-muted-foreground">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-foreground/80 transition-colors"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
