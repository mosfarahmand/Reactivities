import {User, UserFormValue} from "../models/user";
import {makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import {store} from "./store";
import {history} from "../../index";

export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValue) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonsStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonsStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValue) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonsStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }

    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }
}
