/* eslint-disable @typescript-eslint/no-explicit-any */
export interface NavbarProps {
    user?: any;
    auth?: {
        login: { title: string; url: string };
        signup: { title: string; url: string };
    };
}