import {
  AgentAvatar,
  AgentCapabilityBadges,
  AgentHeartbeat,
  AgentPresence,
  AgentStatusCard,
} from "../src/components";
import type { AgentState } from "../src/tokens";

const timeline: Array<{ state: AgentState; description: string; at: string }> =
  [
    { state: "thinking", description: "Interpreting the request.", at: "0:00" },
    {
      state: "planning",
      description: "Breaking the task into steps.",
      at: "0:03",
    },
    {
      state: "needsApproval",
      description: "Requesting approval to send the report.",
      at: "0:08",
    },
    { state: "acting", description: "Sending the report.", at: "0:11" },
    { state: "completed", description: "Report delivered.", at: "0:12" },
  ];

/**
 * AgentStateShowcase
 *
 * An integrated example that composes every component in the Agent State
 * system: an identity header (avatar, presence, heartbeat), the agent's
 * capabilities, and a live activity timeline of status cards.
 *
 * It demonstrates that the components are independent primitives an
 * application arranges into its own layout — not a fixed dashboard.
 */
export function AgentStateShowcase() {
  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <header className="flex items-center gap-4">
        <AgentAvatar name="Research agent" state="acting" size="lg" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-slate-900">
            Research agent
          </h2>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
            <AgentPresence presence="active" />
            <AgentHeartbeat status="online" />
          </div>
        </div>
      </header>

      <section aria-labelledby="capabilities-heading" className="space-y-2">
        <h3
          id="capabilities-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Capabilities
        </h3>
        <AgentCapabilityBadges
          capabilities={[
            { label: "Web search" },
            { label: "Code execution" },
            { label: "File access" },
            { label: "Email", enabled: false },
            { label: "Calendar" },
          ]}
          max={4}
        />
      </section>

      <section aria-labelledby="activity-heading" className="space-y-2">
        <h3
          id="activity-heading"
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          Activity
        </h3>
        <div className="grid gap-3">
          {timeline.map((entry) => (
            <AgentStatusCard
              key={entry.at}
              name="Research agent"
              state={entry.state}
              description={entry.description}
              timestamp={entry.at}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
