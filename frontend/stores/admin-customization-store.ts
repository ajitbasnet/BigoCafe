import { create } from "zustand"
import type {
  CustomizationGroup,
  CustomizationOption,
  SelectType,
} from "@/lib/mock-data/customization-options"
import { initialCustomizationGroups } from "@/lib/mock-data/customization-options"

function generateId() {
  return `opt-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

function generateGroupId() {
  return `grp-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

interface AdminCustomizationState {
  groups: CustomizationGroup[]
  addGroup: (label: string, type: SelectType) => void
  updateGroup: (groupId: string, data: { label?: string; type?: SelectType }) => void
  removeGroup: (groupId: string) => void
  addOption: (groupId: string, option: Omit<CustomizationOption, "id">) => void
  updateOption: (
    groupId: string,
    optionId: string,
    data: Partial<Omit<CustomizationOption, "id">>
  ) => void
  removeOption: (groupId: string, optionId: string) => void
  setDefaultOption: (groupId: string, optionId: string) => void
}

export const useAdminCustomizationStore = create<AdminCustomizationState>((set) => ({
  groups: initialCustomizationGroups,

  addGroup: (label, type) => {
    set((s) => ({
      groups: [
        ...s.groups,
        { id: generateGroupId(), label, type, options: [] },
      ],
    }))
  },

  updateGroup: (groupId, data) => {
    set((s) => ({
      groups: s.groups.map((g) =>
        g.id === groupId ? { ...g, ...data } : g
      ),
    }))
  },

  removeGroup: (groupId) => {
    set((s) => ({ groups: s.groups.filter((g) => g.id !== groupId) }))
  },

  addOption: (groupId, option) => {
    const newOption: CustomizationOption = {
      ...option,
      id: generateId(),
    }
    set((s) => ({
      groups: s.groups.map((g) =>
        g.id === groupId
          ? { ...g, options: [...g.options, newOption] }
          : g
      ),
    }))
  },

  updateOption: (groupId, optionId, data) => {
    set((s) => ({
      groups: s.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.map((o) =>
                o.id === optionId ? { ...o, ...data } : o
              ),
            }
          : g
      ),
    }))
  },

  removeOption: (groupId, optionId) => {
    set((s) => ({
      groups: s.groups.map((g) =>
        g.id === groupId
          ? { ...g, options: g.options.filter((o) => o.id !== optionId) }
          : g
      ),
    }))
  },

  setDefaultOption: (groupId, optionId) => {
    set((s) => ({
      groups: s.groups.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.map((o) => ({
                ...o,
                isDefault: o.id === optionId,
              })),
            }
          : g
      ),
    }))
  },
}))
