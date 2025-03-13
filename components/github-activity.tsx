"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Github, GitCommit, GitPullRequest, GitMerge, Star, ArrowRight } from "lucide-react"

export default function GitHubActivity() {
  // Simulação de dados de atividade do GitHub
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const contributionData = Array.from({ length: 52 * 7 }, () => Math.floor(Math.random() * 5))

  const stats = {
    commits: 1247,
    pullRequests: 183,
    codeReviews: 215,
    stars: 342,
    repositories: 28,
    contributions: 1589,
  }

  const recentActivity = [
    {
      type: "commit",
      repo: "next-dashboard",
      message: "Fix performance issues in data fetching",
      date: "2 dias atrás",
    },
    { type: "pr", repo: "react-components", message: "Add new form components with validation", date: "5 dias atrás" },
    {
      type: "review",
      repo: "design-system",
      message: "Review and approve button component updates",
      date: "1 semana atrás",
    },
    { type: "commit", repo: "api-client", message: "Implement caching layer for API requests", date: "1 semana atrás" },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Github className="h-6 w-6" />
            <h2 className="text-3xl md:text-4xl font-bold">Contribuições Open Source</h2>
          </div>
          <p className="text-xl text-muted-foreground">Minha atividade no GitHub e contribuições para a comunidade</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-6">Atividade no último ano</h3>

            {loading ? (
              <div className="h-32 bg-muted animate-pulse rounded-lg"></div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-52 gap-1">
                    {Array.from({ length: 52 }).map((_, weekIndex) => (
                      <div key={weekIndex} className="grid grid-rows-7 gap-1">
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                          const intensity = contributionData[weekIndex * 7 + dayIndex]
                          let bgColor = "bg-muted"

                          if (intensity === 1) bgColor = "bg-primary/20"
                          else if (intensity === 2) bgColor = "bg-primary/40"
                          else if (intensity === 3) bgColor = "bg-primary/60"
                          else if (intensity === 4) bgColor = "bg-primary/80"

                          return (
                            <div
                              key={dayIndex}
                              className={`w-2 h-2 rounded-sm ${bgColor}`}
                              title={`${intensity} contribuições`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                    <div>Menos</div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted rounded-sm"></div>
                      <div className="w-2 h-2 bg-primary/20 rounded-sm"></div>
                      <div className="w-2 h-2 bg-primary/40 rounded-sm"></div>
                      <div className="w-2 h-2 bg-primary/60 rounded-sm"></div>
                      <div className="w-2 h-2 bg-primary/80 rounded-sm"></div>
                    </div>
                    <div>Mais</div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GitCommit className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.commits}</div>
                    <div className="text-xs text-muted-foreground">Commits</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GitPullRequest className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.pullRequests}</div>
                    <div className="text-xs text-muted-foreground">Pull Requests</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <GitMerge className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.codeReviews}</div>
                    <div className="text-xs text-muted-foreground">Code Reviews</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.stars}</div>
                    <div className="text-xs text-muted-foreground">Stars</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stats.repositories}</div>
                    <div className="text-xs text-muted-foreground">Repositórios</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Atividade recente</h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-muted animate-pulse rounded-lg"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full mt-1">
                          {activity.type === "commit" && <GitCommit className="h-4 w-4 text-primary" />}
                          {activity.type === "pr" && <GitPullRequest className="h-4 w-4 text-primary" />}
                          {activity.type === "review" && <GitMerge className="h-4 w-4 text-primary" />}
                        </div>
                        <div>
                          <div className="font-medium">{activity.repo}</div>
                          <div className="text-sm text-muted-foreground mb-1">{activity.message}</div>
                          <div className="text-xs text-muted-foreground">{activity.date}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="text-center mt-6">
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center"
                  >
                    Ver mais no GitHub
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

