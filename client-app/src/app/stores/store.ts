import ActivityStore from "./activityStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import CommonsStore from "./commonsStore";
import ModalStore from "./modalStore";
import CommentStore from "./commentStore";

interface Store{
    activityStore: ActivityStore,
    userStore: UserStore,
    commonsStore: CommonsStore,
    modalStore: ModalStore
    commentStore : CommentStore
}

export const store: Store ={
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonsStore: new CommonsStore(),
    modalStore: new ModalStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
