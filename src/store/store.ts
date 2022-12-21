import create from 'zustand'

import {persist} from "zustand/middleware/persist";

const useStore = create(persist(
    (set, get) => ({
            name: 'John',
            addName: (name: string) => set({name}),
        }
    ), {
        name: 'store',
    }
))