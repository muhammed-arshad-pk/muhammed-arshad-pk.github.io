import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      company: 'Aerobiosys Innovations Pvt Ltd',
      position: 'Applied Machine Learning Intern',
      duration: 'August 2025 - present',
      location: 'Puducherry, India',
      description: 'Contributing to the development of machine learning applications for the medical sector. My role involves hands-on experience with the ML pipeline, including preprocessing complex medical data, assisting in the training of models, and preparing solutions for real-world healthcare challenges.',
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Git']
    },
    {
      company: 'Haz Labs',
      position: 'IoT Development Intern',
      duration: 'March 2025 - April 2025',
      location: 'Villupuram, India',
      description: 'Contributed to the "Smart Flow Monitoring" IoT project. My role involved the end-to-end development of the hardware, from initial circuit design and layout to final testing and debugging of the ESP32-based system.',
      achievements: [
        'Assisted in the circuit design and layout planning for ESP32-based hardware.',
        'Performed wiring and hardware interfacing of various sensors and modules.',
        'Soldered components and assembled the complete development board for testing.',
        'Ensured proper hardware function through iterative lab-based testing and debugging.'
      ],
      technologies: ['IoT', 'ESP32', 'Circuit Design', 'Hardware Interfacing', 'Soldering', 'Debugging']
    },
    {
      company: 'CS³ Lab, NIT Karnataka',
      position: 'Research Intern (Reinforcement Learning)',
      duration: 'May 2025 - July 2025',
      location: 'Surathkal, India',
      description: 'Contributed to "MQLC," a multi-agent reinforcement learning framework for intelligent lane-changing in autonomous vehicles. This research enabled cooperative decision-making in dense traffic using a novel dual Q-network and GCN-GRU models for intent prediction.',
      achievements: [
        'Co-developed a collaborative multi-agent Q-learning framework (MQLC) for safe lane changes.',
        'Designed a hybrid system combining individual and global Q-networks for flexible decision-making.',
        'Integrated GCN-GRU deep learning models to accurately anticipate nearby vehicle movements.',
        'Showcased superior performance in safety and efficiency in high-density traffic simulations.'
      ],
      technologies: ['Python', 'Reinforcement Learning', 'PyTorch', 'GCN', 'GRU', 'Multi-Agent Systems']
    },
    {
      company: 'CS³ Lab, NIT Karnataka',
      position: 'Research Intern (Autonomous Systems)',
      duration: 'December 2024 - January 2025',
      location: 'Surathkal, India',
      description: 'Focused on enhancing autonomous vehicle trajectory prediction by developing a model to better understand the intentions of human-driven vehicles. The project involved implementing a novel maneuver-aware pooling mechanism using polar trajectory data to improve contextual awareness.',
      achievements: [
        'Developed a novel technique for driver intention prediction to improve trajectory estimation.',
        'Utilized polar trajectory representation to better interpret maneuvers like lane changes.',
        'Implemented and evaluated the model using the public NGSIM dataset.',
        'Demonstrated significant performance improvements over existing state-of-the-art methods.'
      ],
      technologies: ['Python', 'Machine Learning', 'IoV', 'Trajectory Prediction', 'TensorFlow', 'Pandas']
    }

  ];

  return (
    <section id="experience" className="section-padding bg-muted/30">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here's my professional journey so far, where I've gained valuable experience 
            and contributed to meaningful projects.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="glass-card p-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Company Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text">{exp.company}</h3>
                    <h4 className="text-xl font-semibold text-foreground">{exp.position}</h4>
                  </div>
                  
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{exp.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description & Achievements */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-muted-foreground">{exp.description}</p>
                  
                  {/* Safely render achievements only if they exist */}
                  {exp.achievements && exp.achievements.length > 0 && (
                    <div>
                      <h5 className="font-semibold mb-3">Key Achievements:</h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <ExternalLink size={16} className="text-accent mt-0.5 flex-shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;