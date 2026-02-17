import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/profile-hero.png';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center section-padding">
      <div className="container-width">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 lg:order-1">
            <div className="space-y-4">
              <p className="text-accent text-lg font-medium">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="gradient-text">Muhammmed Arshad P K</span>
                <br />
                Computer Vision & AI Developer
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
              A third-year Computer Science student and Machine Learning Intern specializing in building intelligent systems. Passionate about applying AI to real-world challenges, with a focus on Computer Vision and Embedded Technologies.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="hero-gradient hover:scale-105 transition-transform animate-glow"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="border-border hover:glass-card hover:scale-105 transition-all"
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://github.com/muhammed-arshad-pk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-full hover:scale-110 transition-transform hover:text-accent"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammed-arshad-p-k-691a52281"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-full hover:scale-110 transition-transform hover:text-accent"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:arshadmhd004@gmail.com"
                className="p-3 glass-card rounded-full hover:scale-110 transition-transform hover:text-accent"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 hero-gradient rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <img
                src={profileImage}
                alt="Profile"
                className="relative w-80 h-80 object-cover rounded-full border-4 border-border animate-float shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;