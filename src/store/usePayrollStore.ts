// store/usePayrollStore.ts
import { create } from "zustand";

interface PayrollState {
  payroll: any;
  setPayroll: (data: any) => void;
}

export const usePayrollStore = create<PayrollState>((set) => ({
  payroll: null,
  setPayroll: (data) => set({ payroll: data }),
}));
