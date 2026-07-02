/**
 * Shared mock data for the product template examples, stories, and tests.
 *
 * Everything here is clearly fictional demo data. It is intentionally NOT
 * exported from the library's public entry point (`src/index.ts`) so it is
 * never shipped. Templates accept this kind of data through typed props; these
 * constants simply provide a realistic, ready-made set to render.
 */
import type { AgentState, ConfidenceLevel } from "../tokens";
import type {
  ActionLogEntry,
  AgentCapability,
  AssignmentState,
  EscalationSeverity,
  ExecutionGraphEdge,
  ExecutionGraphNode,
  ExecutionStep,
  HandoffPriority,
  HandoffStatus,
  QueueItem,
  RiskBadgeLevel,
} from "../components";

export interface MockAgent {
  name: string;
  state: AgentState;
  description?: string;
}

export interface MockSource {
  source: string;
  href?: string;
  excerpt?: string;
  retrievedAt?: string;
  score?: number;
}

export interface MockDecisionData {
  action: string;
  confidence?: ConfidenceLevel;
  confidenceValue?: number;
  risk?: RiskBadgeLevel;
  reasoning?: string;
  timestamp?: string;
}

export interface MockEscalation {
  severity: EscalationSeverity;
  message: string;
}

export interface MockAssignment {
  status: AssignmentState;
  assignee?: string;
}

/* -------------------------------------------------------------------------- */
/* Customer support agent                                                     */
/* -------------------------------------------------------------------------- */

export const supportAgent: MockAgent = {
  name: "Support agent",
  state: "needsApproval",
  description: "Drafted a resolution for ticket #4821.",
};

export const supportCustomer = {
  name: "Jordan Rivera",
  requestSummary:
    "Order arrived damaged and the customer is requesting a full refund.",
};

export const supportAssignment: MockAssignment = {
  status: "in-review",
  assignee: "Dana Lee",
};

export const supportEscalation: MockEscalation = {
  severity: "warning",
  message: "Refund amount is above the auto-approval threshold.",
};

export const supportDecision: MockDecisionData = {
  action: "Issue a full refund of $128.40 and send an apology message.",
  confidence: "high",
  confidenceValue: 88,
  risk: "moderate",
  reasoning:
    "Photos confirm damage, the order is within the return window, and the customer has no prior refunds.",
  timestamp: "just now",
};

export const supportActions: ActionLogEntry[] = [
  {
    id: "s1",
    action: "Classified ticket as “damaged item”",
    actor: "Agent",
    timestamp: "10:02",
    outcome: "success",
  },
  {
    id: "s2",
    action: "Verified order is within the 30-day return window",
    actor: "Tool: orders",
    timestamp: "10:02",
    outcome: "success",
  },
  {
    id: "s3",
    action: "Reviewed customer-supplied photos",
    actor: "Agent",
    timestamp: "10:03",
    outcome: "info",
    detail: "2 images attached",
  },
  {
    id: "s4",
    action: "Drafted refund and apology response",
    actor: "Agent",
    timestamp: "10:03",
    outcome: "pending",
  },
];

/* -------------------------------------------------------------------------- */
/* Research agent                                                             */
/* -------------------------------------------------------------------------- */

export const researchAgent: MockAgent = {
  name: "Research agent",
  state: "acting",
  description: "Synthesizing findings from 5 sources.",
};

export const researchProgress = 72;

export const researchSteps: ExecutionStep[] = [
  {
    id: "r1",
    title: "Interpret the question",
    status: "completed",
    timestamp: "0:02",
  },
  {
    id: "r2",
    title: "Search sources",
    status: "completed",
    timestamp: "0:15",
    description: "Queried 3 databases and the open web.",
  },
  {
    id: "r3",
    title: "Read and extract evidence",
    status: "completed",
    timestamp: "0:41",
  },
  { id: "r4", title: "Synthesize an answer", status: "running" },
  { id: "r5", title: "Cite sources", status: "pending" },
];

export const researchSources: MockSource[] = [
  {
    source: "Annual Energy Outlook 2026",
    href: "https://example.com/aeo-2026",
    excerpt: "Renewables are projected to be the fastest-growing source.",
    retrievedAt: "0:18",
    score: 0.94,
  },
  {
    source: "Grid Reliability Review",
    href: "https://example.com/grid-review",
    excerpt: "Storage capacity roughly doubled year over year.",
    retrievedAt: "0:22",
    score: 0.81,
  },
  {
    source: "Regional Demand Study",
    href: "https://example.com/demand-study",
    excerpt: "Peak demand shifted two hours later on average.",
    retrievedAt: "0:29",
    score: 0.68,
  },
];

export const researchFinding = {
  summary:
    "Renewable generation is set to grow fastest, but storage and grid upgrades are the limiting factor.",
  evidence:
    "Two independent sources agree on the growth rate, and a third corroborates the storage constraint.",
  assumptions:
    "Assumes current policy incentives remain in place through 2030.",
  limitations: "One source is a projection, not measured data.",
  confidence: "medium" as ConfidenceLevel,
  confidenceValue: 74,
};

/* -------------------------------------------------------------------------- */
/* Coding agent                                                               */
/* -------------------------------------------------------------------------- */

export const codingAgent: MockAgent = {
  name: "Coding agent",
  state: "acting",
  description: "Implementing the requested API endpoint.",
};

export const codingCapabilities: AgentCapability[] = [
  { id: "read", label: "Read files" },
  { id: "edit", label: "Edit files" },
  { id: "run", label: "Run tests" },
  { id: "shell", label: "Shell", description: "Runs sandboxed commands" },
  { id: "deploy", label: "Deploy", enabled: false },
];

export const codingProgress = 55;

export const codingSteps: ExecutionStep[] = [
  { id: "c1", title: "Read the failing test", status: "completed" },
  { id: "c2", title: "Locate the handler", status: "completed" },
  { id: "c3", title: "Implement the endpoint", status: "running" },
  { id: "c4", title: "Run the test suite", status: "pending" },
  { id: "c5", title: "Open a pull request", status: "pending" },
];

export const codingQueue: QueueItem[] = [
  { id: "cq1", label: "Implement endpoint", status: "running" },
  { id: "cq2", label: "Run test suite", status: "pending" },
  { id: "cq3", label: "Update changelog", status: "pending" },
];

export const codingChange: MockDecisionData = {
  action: "Add POST /api/refunds with validation and an audit log entry.",
  confidence: "high",
  confidenceValue: 91,
  risk: "low",
  reasoning:
    "Follows the existing handler pattern and is covered by the new unit test.",
  timestamp: "30s ago",
};

export const codingActions: ActionLogEntry[] = [
  {
    id: "ca1",
    action: "Ran `npm test` (before change)",
    actor: "Tool: shell",
    timestamp: "10:10",
    outcome: "failure",
    detail: "1 failing test",
  },
  {
    id: "ca2",
    action: "Edited src/api/refunds.ts",
    actor: "Agent",
    timestamp: "10:12",
    outcome: "success",
  },
  {
    id: "ca3",
    action: "Ran `npm test` (after change)",
    actor: "Tool: shell",
    timestamp: "10:13",
    outcome: "pending",
  },
];

/* -------------------------------------------------------------------------- */
/* Operations / robotics agent                                               */
/* -------------------------------------------------------------------------- */

export const opsAgent: MockAgent = {
  name: "Line 3 controller",
  state: "blocked",
  description: "Palletizing run paused at station 4.",
};

export const opsNodes: ExecutionGraphNode[] = [
  { id: "intake", label: "Intake", status: "completed" },
  { id: "inspect", label: "Inspect", status: "completed" },
  { id: "assemble", label: "Assemble", status: "running" },
  { id: "palletize", label: "Palletize", status: "failed" },
  { id: "ship", label: "Ship", status: "pending" },
];

export const opsEdges: ExecutionGraphEdge[] = [
  { from: "intake", to: "inspect" },
  { from: "inspect", to: "assemble" },
  { from: "assemble", to: "palletize" },
  { from: "palletize", to: "ship" },
];

export const opsQueue: QueueItem[] = [
  { id: "oq1", label: "Batch A-118", status: "running" },
  { id: "oq2", label: "Batch A-119", status: "pending" },
  { id: "oq3", label: "Batch A-117", status: "failed", detail: "Jam at St. 4" },
];

export const opsEscalation: MockEscalation = {
  severity: "blocked",
  message: "Station 4 reported a jam and is awaiting a human reset.",
};

export const opsActions: ActionLogEntry[] = [
  {
    id: "o1",
    action: "Completed inspection of batch A-118",
    actor: "Station 2",
    timestamp: "14:31:02",
    outcome: "success",
  },
  {
    id: "o2",
    action: "Torque check within tolerance",
    actor: "Station 3",
    timestamp: "14:33:20",
    outcome: "success",
  },
  {
    id: "o3",
    action: "Palletizer halted on jam detection",
    actor: "Station 4",
    timestamp: "14:35:11",
    outcome: "failure",
    detail: "Safety interlock engaged",
  },
];

/* -------------------------------------------------------------------------- */
/* Workflow approval console                                                  */
/* -------------------------------------------------------------------------- */

export interface MockApprovalItem {
  id: string;
  decision: MockDecisionData;
  assignment: MockAssignment;
  priority: HandoffPriority;
}

export const approvalItems: MockApprovalItem[] = [
  {
    id: "a1",
    decision: {
      action: "Approve vendor payment of $8,200 to Acme Supplies.",
      confidence: "high",
      confidenceValue: 90,
      risk: "moderate",
      reasoning: "Matches the purchase order and receiving record.",
      timestamp: "2m ago",
    },
    assignment: { status: "assigned", assignee: "Priya N." },
    priority: "high",
  },
  {
    id: "a2",
    decision: {
      action: "Grant temporary admin access to the on-call engineer.",
      confidence: "medium",
      confidenceValue: 66,
      risk: "high",
      reasoning: "Active incident, but access is broad and time-boxed.",
      timestamp: "5m ago",
    },
    assignment: { status: "unassigned" },
    priority: "urgent",
  },
  {
    id: "a3",
    decision: {
      action: "Publish the updated pricing page.",
      confidence: "high",
      confidenceValue: 84,
      risk: "low",
      reasoning: "Copy reviewed; no policy changes.",
      timestamp: "12m ago",
    },
    assignment: { status: "in-review", assignee: "Sam O." },
    priority: "low",
  },
];

export const approvalHandoff: {
  reason: string;
  priority: HandoffPriority;
  assignee: string;
  status: HandoffStatus;
  timestamp: string;
} = {
  reason: "The access request exceeds the agent's authority and needs a human.",
  priority: "urgent",
  assignee: "Priya N.",
  status: "pending",
  timestamp: "5m ago",
};
