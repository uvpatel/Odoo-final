// store/useAttendanceStore.ts
import { create } from "zustand";


// type Attendance State
interface AttendanceState {
  attendance: any[];
  setAttendance: (data: any[]) => void;
}


// Attandance Store
export const useAttendanceStore = create<AttendanceState>((set) => ({
  attendance: [],
  setAttendance: (data) => set({ attendance: data }),
}));
