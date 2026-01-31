// store/useLeaveStore.ts
import { create } from "zustand";


// leaveState Types
interface LeaveState {
  leaves: any[];
  setLeaves: (leaves: any[]) => void;
}

// leave Store
export const useLeaveStore = create<LeaveState>((set) => ({
  leaves: [],
  setLeaves: (leaves) => set({ leaves }),
}));
