import { createWithEqualityFn } from "zustand/traditional"
import { devtools } from "zustand/middleware"
import { shallow } from "zustand/shallow"
import AuthSlice, { IAuthSlice } from "./Slices/AuthSlice"

const useStore = createWithEqualityFn<IAuthSlice>()(devtools((...a) => ({
    ...AuthSlice(...a)
})),shallow)

export default useStore