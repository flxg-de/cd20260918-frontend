import { TalkStatus } from '../../api/model/talk-status';

/** German display label for a talk's lifecycle status. */
export function talkStatusLabel(status: TalkStatus): string {
  switch (status) {
    case TalkStatus.SUBMITTED:
      return 'Eingereicht';
    case TalkStatus.ASSIGNED:
      return 'Zugeordnet';
    case TalkStatus.REJECTED:
      return 'Abgelehnt';
    default:
      return status;
  }
}

/** Tailwind classes for a status badge, using OC semantic status colors. */
export function talkStatusBadgeClasses(status: TalkStatus): string {
  switch (status) {
    case TalkStatus.SUBMITTED:
      return 'bg-oc-blue-50 text-oc-blue-700';
    case TalkStatus.ASSIGNED:
      return 'bg-green-50 text-green-700';
    case TalkStatus.REJECTED:
      return 'bg-oc-red/10 text-oc-red';
    default:
      return 'bg-oc-gray-100 text-oc-ink';
  }
}

/** Whether the owning referent may still edit or withdraw a talk in this status. */
export function isTalkEditableByOwner(status: TalkStatus): boolean {
  return status === TalkStatus.SUBMITTED;
}
