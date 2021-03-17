import ActivityStore from "./activityStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import CommonsStore from "./commonsStore";
import ModalStore from "./modalStore";

interface Store{
    activityStore: ActivityStore,
    userStore: UserStore,
    commonsStore: CommonsStore,
    modalStore: ModalStore
}

export const store: Store ={
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonsStore: new CommonsStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
