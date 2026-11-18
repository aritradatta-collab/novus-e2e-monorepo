/** Novus by Pendo lifecycle calls. The agent itself is loaded by the snippet in index.html. */
import type { AdminProfile } from "../api/client";

/** Boots the agent once per page load with an anonymous visitor. */
export function initializePendo(): void {
  pendo.initialize({ visitor: { id: "" } });
}

/** Registers the signed-in admin and their organization. Seats come from the admin billing API. */
export function identifyPendoVisitor(profile: AdminProfile, seats?: number): void {
  pendo.identify({
    visitor: {
      id: profile.id,
      email: profile.email,
      full_name: profile.name,
      role: profile.role,
      organizationId: profile.organization.id,
      active: profile.active,
      createdAt: profile.createdAt,
    },
    account: {
      id: profile.organization.id,
      name: profile.organization.name,
      plan: profile.organization.plan,
      ...(seats === undefined ? {} : { seats }),
    },
  });
}

/** Resets to a fresh anonymous visitor after sign-out. */
export function clearPendoSession(): void {
  // clearSession is not stubbed by the snippet, so skip it if the agent hasn't loaded yet.
  if (typeof pendo.clearSession === "function") pendo.clearSession();
}
