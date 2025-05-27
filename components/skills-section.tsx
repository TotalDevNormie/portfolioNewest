"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Palette, Server, Smartphone, Globe, Cloud } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code className="h-6 w-6" />,
    skills: ["React.js", "Next.js", "TypeScript", "HTML5", "HTML", "Cascading Style Sheets (CSS)", "Vite"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend & CMS",
    icon: <Server className="h-6 w-6" />,
    skills: ["Laravel", "PHP", "WordPress", "Tilda"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Database & Cloud",
    icon: <Database className="h-6 w-6" />,
    skills: ["Firebase", "MariaDB", "SQL"],
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="h-6 w-6" />,
    skills: ["React Native"],
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Design & UX",
    icon: <Palette className="h-6 w-6" />,
    skills: ["User Interface Design", "Responsive Web Design", "Front-End Development"],
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Development Tools",
    icon: <Cloud className="h-6 w-6" />,
    skills: ["Git", "Vite"],
    color: "from-indigo-500 to-blue-500",
  },
]

export default function SkillsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive toolkit for building modern, scalable, and user-centric applications
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${category.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skillIndex}
                      variant="secondary"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
