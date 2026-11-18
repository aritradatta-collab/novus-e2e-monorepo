/** Browser admin portal events. Pendo attaches the visitor and account automatically. */

declare global {
  interface Window {
    pendo?: {
      track: (eventName: string, metadata?: Record<string, string | boolean | number>) => void;
    };
  }
}

export interface SubscriptionUpdatedMetadata {
  plan: string;
  seats: number;
  previousPlan?: string;
  previousSeats?: number;
  planChanged?: boolean;
}

export type MemberChangeType = "role_changed" | "deactivated" | "reactivated";

export interface MemberAccessUpdatedMetadata {
  memberId: string;
  changeType: MemberChangeType;
  newRole: string;
  previousRole: string;
  active: boolean;
}

/** Fires after PUT /admin/billing succeeds. */
export function trackSubscriptionUpdated(metadata: SubscriptionUpdatedMetadata): void {
  window.pendo?.track("subscription_updated", { ...metadata });
}

/** Fires after PATCH /admin/users/:id succeeds. */
export function trackMemberAccessUpdated(metadata: MemberAccessUpdatedMetadata): void {
  window.pendo?.track("member_access_updated", { ...metadata });
}
