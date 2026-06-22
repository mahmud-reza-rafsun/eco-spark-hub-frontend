export interface IUpdateProfile {
    name: string;
    image: string;
    username: string;
    coverPhoto: string;
    countryName: string;
    locationState: string;
    shortBio: string;
}

export interface IGetProfile {
    name: string;
    image: string;
    id: string;
    username: string;
    coverPhoto: string;
    countryName: string;
    locationState: string;
    shortBio: string;
}