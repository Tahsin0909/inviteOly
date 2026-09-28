import { staticAdminEvents } from "@/features/event/data/adminEvent.data";
import {
  IAdminUserListItem,
  IAdminUserProfile,
} from "../user.interface";

export const staticAdminUsers: IAdminUserListItem[] = [
  {
    id: "usr-admin-1",
    name: "Marcus Thorne",
    email: "m.thorne@apexlab.com",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    role: "Host",
    joinDate: "Oct 12, 2023",
    eventCount: { active: 2, total: 5 },
    status: "Active",
  },
  {
    id: "usr-admin-2",
    name: "Elena Rodriguez",
    email: "elena@globalpartners.net",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
    role: "Partner",
    partnerType: "Venue",
    isVerified: false,
    joinDate: "Oct 12, 2023",
    eventCount: { active: 2, total: 5 },
    status: "Active",
  },
  {
    id: "usr-admin-3",
    name: "Jinsoo Park",
    email: "j.park@apexlab.com",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
    role: "Host",
    joinDate: "Oct 18, 2023",
    eventCount: { active: 4, total: 5 },
    status: "Active",
  },
  {
    id: "usr-admin-4",
    name: "Théo Laurent",
    email: "t.laurent@apexlab.com",
    avatarUrl: "https://i.pravatar.cc/150?img=60",
    role: "Host",
    joinDate: "Oct 28, 2023",
    eventCount: { active: 3, total: 5 },
    status: "Active",
  },
  {
    id: "usr-admin-5",
    name: "Alexander Wright",
    email: "a.wright@grandballroom.com",
    avatarUrl: "https://i.pravatar.cc/150?img=11",
    role: "Partner",
    partnerType: "Venue",
    isVerified: true,
    joinDate: "Oct 12, 2023",
    eventCount: { active: 5, total: 8 },
    status: "Active",
  },
  {
    id: "usr-admin-6",
    name: "Liam Henderson",
    email: "liam@hendersonphoto.com",
    avatarUrl: "https://i.pravatar.cc/150?img=14",
    role: "Partner",
    partnerType: "Photography",
    joinDate: "Oct 12, 2023",
    eventCount: { active: 2, total: 5 },
    status: "Active",
  },
  {
    id: "usr-admin-7",
    name: "Aria Montgomery",
    email: "a.montgomery@apexlab.com",
    avatarUrl: "https://i.pravatar.cc/150?img=26",
    role: "Host",
    joinDate: "Oct 12, 2023",
    eventCount: { active: 2, total: 5 },
    status: "Active",
  },
  {
    id: "usr-admin-8",
    name: "Liam O'Connor",
    email: "l.oconnor@apexlab.com",
    avatarUrl: "https://i.pravatar.cc/150?img=68",
    role: "Host",
    joinDate: "Oct 22, 2023",
    eventCount: { active: 2, total: 5 },
    status: "Active",
  },
  {
    id: "usr-admin-9",
    name: "Sophia Martinez",
    email: "sophia@skylinehall.com",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    role: "Partner",
    partnerType: "Venue",
    isVerified: false,
    joinDate: "Nov 02, 2023",
    eventCount: { active: 1, total: 3 },
    status: "Active",
  },
  {
    id: "usr-admin-10",
    name: "Carlos Rivera",
    email: "carlos@gourmetcatering.com",
    avatarUrl: "https://i.pravatar.cc/150?img=52",
    role: "Partner",
    partnerType: "Catering",
    joinDate: "Nov 15, 2023",
    eventCount: { active: 3, total: 6 },
    status: "Active",
  },
];

export const staticAdminUserProfile: IAdminUserProfile = {
  id: "usr-admin-1",
  name: "John Doe",
  email: "john@email.com",
  address: "Dhaka,Bangladesh",
  currentPlan: "Monthly",
  avatarUrl: "https://i.pravatar.cc/300?img=11",
  bannerUrl: "/dashboardMetricsBg.png",
  status: "Active",
  subscription: {
    plan: "Premium",
    price: "$120.00",
    lastEventDate: "Aug, 05, 2026",
    totalEvent: 10,
  },
  events: staticAdminEvents.slice(0, 3),
};

export const getAdminUserProfileById = (id: string): IAdminUserProfile => {
  const matchedUser = staticAdminUsers.find((u) => u.id === id);
  if (!matchedUser) {
    return {
      ...staticAdminUserProfile,
      id,
    };
  }

  return {
    ...staticAdminUserProfile,
    id: matchedUser.id,
    name: matchedUser.name,
    email: matchedUser.email,
    avatarUrl: matchedUser.avatarUrl,
    subscription: {
      ...staticAdminUserProfile.subscription,
      totalEvent: matchedUser.eventCount.total * 2,
    },
    events: staticAdminEvents.slice(0, 3),
  };
};

