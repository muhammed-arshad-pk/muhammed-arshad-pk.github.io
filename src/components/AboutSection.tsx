import { Code, Database, Globe, Smartphone } from 'lucide-react';

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      title: 'AI & Machine Learning',
      description: 'Developing machine learning models to solve real-world problems.'
    },
    {
      icon: Globe,
      title: 'Autonomous Systems',
      description: 'Building intelligent systems for vehicles using trajectory prediction and RL.'
    },
    {
      icon: Database,
      title: 'Research & Innovation',
      description: 'Turning novel research and complex algorithms into practical solutions.'
    },
    {
      icon: Smartphone,
      title: 'IoT & Embedded Systems',
      description: 'Building end-to-end IoT systems with ESP32 and custom hardware.'
    }
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                About <span className="gradient-text">Me</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a dedicated Computer Science student with a passion for creating 
                  innovative software solutions. My journey in tech has been driven by 
                  curiosity and a desire to solve real-world problems through code.
                </p>
                <p>
                  Through my internship experiences, I've gained hands-on knowledge in 
                  software development, working with diverse teams and contributing to 
                  meaningful projects that impact users worldwide.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, 
                  contributing to open-source projects, or mentoring fellow students 
                  in programming fundamentals.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold gradient-text">6+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="glass-card p-6 text-center">
                <div className="text-3xl font-bold gradient-text">1.5</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Highlights */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass-card p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <item.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;