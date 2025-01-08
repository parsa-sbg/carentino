import {UserInterface} from "@/models/User"
import {create} from "zustand"

type userStoreType = {
    user: UserInterface | null
    setUser: (user: UserInterface | null) => void
}

export const useUserStore = create<userStoreType>()((set) => ({
    user: null,
    setUser: (user: UserInterface | null) => {
        set({user})
    },
}))
