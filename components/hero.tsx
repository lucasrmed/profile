"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Criamos referências seguras para o canvas e o contexto
    const safeCanvas = canvas;
    const safeCtx = ctx;

    safeCanvas.width = window.innerWidth;
    safeCanvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 100;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * safeCanvas.width;
        this.y = Math.random() * safeCanvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(100, 100, 255, ${Math.random() * 0.2 + 0.1})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > safeCanvas.width) this.x = 0;
        else if (this.x < 0) this.x = safeCanvas.width;

        if (this.y > safeCanvas.height) this.y = 0;
        else if (this.y < 0) this.y = safeCanvas.height;
      }

      draw() {
        safeCtx.fillStyle = this.color;
        safeCtx.beginPath();
        safeCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        safeCtx.fill();
      }
    }

    function init() {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      safeCtx.clearRect(0, 0, safeCanvas.width, safeCanvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Conecta partículas com linhas
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            safeCtx.beginPath();
            safeCtx.strokeStyle = `rgba(100, 100, 255, ${
              0.1 * (1 - distance / 100)
            })`;
            safeCtx.lineWidth = 0.5;
            safeCtx.moveTo(particles[i].x, particles[i].y);
            safeCtx.lineTo(particles[j].x, particles[j].y);
            safeCtx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      safeCanvas.width = window.innerWidth;
      safeCanvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      id="sobre"
      className="relative min-h-screen flex items-center pt-16"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 -z-10"
        style={{ opacity: 0.7 }}
      />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-20">
        <div className="space-y-6 order-2 md:order-1">
          <div>
            <h2 className="text-lg font-medium text-primary mb-2">
              Desenvolvedor Front-end Sênior
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Transformando ideias em experiências digitais excepcionais
            </h1>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Com mais de 8 anos de experiência, especializado em criar interfaces
            modernas, acessíveis e de alta performance utilizando React,
            TypeScript e as mais recentes tecnologias front-end.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="group">
              Ver projetos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Download CV
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-full"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative order-1 md:order-2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 z-10" />
            <img
              src="/placeholder.svg?height=320&width=320"
              alt="Foto de perfil"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-6 right-0 md:right-10 bg-background border rounded-lg py-3 px-4 shadow-lg">
            <div className="text-sm font-medium">Disponível para projetos</div>
            <div className="text-xs text-muted-foreground">
              Contate-me agora
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
