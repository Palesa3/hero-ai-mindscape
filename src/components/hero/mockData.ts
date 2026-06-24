import type { Persona } from "./HeroContext";

export const TACTICAL_SUMMARY =
  "Target dataset decrypted: the organization shows 34% QoQ momentum driven by automation adoption, but exposes critical supply-chain latency that threatens Q4 delivery commitments.";

export const ACCORDION = {
  growth: [
    "Automation adoption up 34% quarter-over-quarter",
    "Customer retention stabilized at 91% via proactive outreach",
    "New market entry yielding 2.3x pipeline velocity",
  ],
  friction: [
    "Supply-chain latency adds 6 days to fulfillment",
    "Talent acquisition lag in senior engineering roles",
    "Legacy tooling inflates operational overhead by 18%",
  ],
};

export const QUEST_LOG = [
  { id: "scan-quick", label: "[Side Quest: Quick Win] Auto-draft the weekly status report" },
  { id: "scan-main", label: "[Main Quest: Strategic Move] Reallocate budget to automation pipeline" },
  { id: "scan-boss", label: "[Boss Fight: High Risk Mitigation] Build redundant supply-chain vendor" },
];

export const COMMAND_CHIPS = [
  "Summarize today's priorities",
  "Draft a follow-up email",
  "What are my biggest risks?",
];

export const NODES = [
  { id: "n1", x: 20, y: 30, label: "Revenue Engine" },
  { id: "n2", x: 70, y: 20, label: "Automation Layer" },
  { id: "n3", x: 50, y: 60, label: "Risk Vector" },
  { id: "n4", x: 80, y: 70, label: "Talent Mesh" },
  { id: "n5", x: 30, y: 75, label: "Market Signal" },
];

export const EDGES: [string, string][] = [
  ["n1", "n2"], ["n2", "n3"], ["n3", "n4"], ["n1", "n5"], ["n5", "n3"], ["n2", "n4"],
];

export function heroReply(persona: Persona, _input: string): string {
  switch (persona) {
    case "tactical":
      return "TACTICAL ASSESSMENT: Objective locked. Deploy automation assets to the front line, neutralize supply-chain bottlenecks first, and hold reserve budget for the Q4 push. Execute on my mark, operative.";
    case "scientist":
      return "EUREKA!!! THE DATA MATRIX REVEALS A VOLATILE REACTION — INJECT 34% MORE AUTOMATION CATALYST, ISOLATE THE SUPPLY-CHAIN VARIABLE, AND OBSERVE THE EXPONENTIAL CHAOS OF COMPOUNDING EFFICIENCY!!!";
    default:
      return "Per our strategic alignment, I recommend prioritizing the automation pipeline to sustain the 34% growth trajectory while mitigating supply-chain latency. I can prepare an executive brief and a phased rollout plan at your convenience.";
  }
}
