/** Browser research assistant events. Uses the window.pendo type declared in objectEvents.ts. */

export type AssistantOutcome = "replied" | "not_configured" | "failed";

export interface AssistantResponseMetadata {
  outcome: AssistantOutcome;
  model?: string;
  messageCount: number;
  conversationTurn: number;
  errorMessage?: string;
}

/** Fires once per send, after the assistant request resolves or rejects. */
export function trackAssistantResponse(metadata: AssistantResponseMetadata): void {
  const { model, errorMessage, ...rest } = metadata;
  window.pendo?.track("assistant_response_received", {
    ...rest,
    ...(model ? { model } : {}),
    ...(errorMessage ? { errorMessage: errorMessage.slice(0, 100) } : {}),
  });
}
