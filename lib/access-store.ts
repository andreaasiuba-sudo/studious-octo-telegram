"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AccessState {
  hasAccess: boolean;
  setAccess: (value: boolean) => void;
  checkAccess: () => boolean;
}

const SECRET_KEY = "natillas";

export const useAccessStore = create<AccessState>()(
  persist(
    (set, get) => ({
      hasAccess: false,
      setAccess: (value: boolean) => set({ hasAccess: value }),
      checkAccess: () => get().hasAccess,
    }),
    {
      name: "access-storage",
    }
  )
);

export const validateKey = (key: string): boolean => {
  return key === SECRET_KEY;
};


