import { Time } from "@angular/common";

export interface Presence{
    id: number;
    isPresent: boolean;
    date: Time;
    presenceCode: string;
}