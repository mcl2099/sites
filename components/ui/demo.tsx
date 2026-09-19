import * as React from "react"
import { PatternCard, PatternCardBody } from "@/components/ui/card-with-ellipsis-pattern"

function PatternCardDemo() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <PatternCard>
        <PatternCardBody>
          <h3 className="text-lg font-bold mb-1 text-foreground">
            AI-Powered Chat Interface
          </h3>
          <p className="text-wrap text-sm text-foreground/60">
            Build intelligent conversational experiences with our ready-to-use
            chat components. Supports streaming responses, code highlighting,
            and markdown rendering out of the box.
          </p>
        </PatternCardBody>
      </PatternCard>

      <PatternCard>
        <PatternCardBody>
          <h3 className="text-lg font-bold mb-1 text-foreground">
            Type-Safe Components
          </h3>
          <p className="text-wrap text-sm text-foreground/60">
            Every component is built with TypeScript and includes comprehensive
            type definitions. Get real-time feedback and catch errors before
            they reach production.
          </p>
        </PatternCardBody>
      </PatternCard>

      <PatternCard>
        <PatternCardBody>
          <h3 className="text-lg font-bold mb-1 text-foreground">
            Dark Mode Ready
          </h3>
          <p className="text-wrap text-sm text-foreground/60">
            All components are designed with dark mode in mind. Switch between
            themes seamlessly with zero flickering and consistent visual
            hierarchy.
          </p>
        </PatternCardBody>
      </PatternCard>

      <PatternCard>
        <PatternCardBody>
          <h3 className="text-lg font-bold mb-1 text-foreground">
            Customizable Design
          </h3>
          <p className="text-wrap text-sm text-foreground/60">
            Extend and customize components to match your brand. Built on
            Tailwind CSS, making it easy to modify styles while maintaining
            consistency.
          </p>
        </PatternCardBody>
      </PatternCard>
    </div>
  )
}

export { PatternCardDemo }
