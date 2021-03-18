import ActivityStore from "./activityStore";
import {createContext, useContext} from "react";
import UserStore from "./userStore";
import CommonsStore from "./commonsStore";
import ModalStore from "./modalStore";
import CommentStore from "./commentStore";
import ProfileStore from "./profileStore";

interface Store{
    activityStore: ActivityStore,
    userStore: UserStore,
    commonsStore: CommonsStore,
    modalStore: ModalStore
    commentStore : CommentStore,
    profileStore: ProfileStore
}

export const store: Store ={
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    commonsStore: new CommonsStore(),
    modalStore: new ModalStore(),
    commentStore: new CommentStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}
