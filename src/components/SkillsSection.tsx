import { 
  Code, 
  Database, 
  Brain,       // Kept for Machine Learning
  Cpu,         // New: For Hardware & Embedded Systems
  Rocket,      // New: For Drone Technology
  Waypoints,   // New: For Autonomous Systems
  GitBranch,   // Kept for Core CS/Problem Solving
  Lightbulb    // New: For Research
} from 'lucide-react';

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Programming & Core CS',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'C++', level: 75 },
        { name: 'C', level: 70 },
        { name: 'HTML/CSS', level: 80 },
        { name: 'Algorithms & Data Structures', level: 85 }
      ]
    },
    {
      icon: Brain,
      title: 'Machine Learning & Vision',
      skills: [
        { name: 'Machine Learning', level: 90 },
        { name: 'Deep Learning', level: 85 },
        { name: 'Computer Vision', level: 85 },
        { name: 'TensorFlow', level: 80 },
        { name: 'PyTorch', level: 80 }
      ]
    },
    {
      icon: Cpu,
      title: 'Hardware & Embedded Systems',
      skills: [
        { name: 'Embedded Systems', level: 85 },
        { name: 'Internet of Things (IoT)', level: 80 },
        { name: 'Raspberry Pi', level: 90 },
        { name: 'Arduino', level: 90 },
        { name: 'Sensors Integration', level: 85 }
      ]
    },
    {
      icon: Database,
      title: 'Data & Databases',
      skills: [
        { name: 'Data Analysis', level: 85 },
        { name: 'Feature Engineering', level: 80 },
        { name: 'Pattern Recognition', level: 80 },
        { name: 'SQL', level: 75 },
        { name: 'DBMS', level: 70 }
      ]
    }
  ];

  const otherSkills = [
    { icon: Rocket, name: 'Drone Technology', description: 'Manufacturing, Assembly & Piloting' },
    { icon: Waypoints, name: 'Autonomous Systems', description: 'Trajectory Prediction & Motion Estimation' },
    { icon: GitBranch, name: 'Problem Solving', description: 'Algorithms, Optimization & Logic' },
    { icon: Lightbulb, name: 'Research & Innovation', description: 'Experimentation & Documentation' }
  ];

  return (
    <section id="skills" className="section-padding">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My expertise in Machine Learning, Computer Vision, and Embedded Systems,
            backed by a strong foundation in programming and problem-solving.
          </p>
        </div>

        {/* Main Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="glass-card p-8 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-primary/20 rounded-full">
                  <category.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-semibold">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="hero-gradient h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Additional <span className="gradient-text">Expertise</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherSkills.map((skill, index) => (
              <div
                key={index}
                className="glass-card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-accent/20 rounded-full">
                    <skill.icon className="text-accent" size={28} />
                  </div>
                  <h4 className="font-semibold">{skill.name}</h4>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;