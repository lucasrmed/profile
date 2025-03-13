import Header from "@/components/header"
import Hero from "@/components/hero"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Articles from "@/components/articles"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import GitHubActivity from "@/components/github-activity"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <GitHubActivity />
        <Articles />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

