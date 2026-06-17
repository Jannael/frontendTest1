import { create } from 'zustand'

export type ActiveSection = 'PICKUP' | 'DROPOFF'

interface ActiveSectionState {
	activeSection: ActiveSection
	setActiveSection: (section: ActiveSection) => void
}

export const useActiveSectionStore = create<ActiveSectionState>((set) => ({
	activeSection: 'PICKUP',
	setActiveSection: (section) => {
		set({ activeSection: section })
		console.log('Active section set to:', section)
	},
}))
