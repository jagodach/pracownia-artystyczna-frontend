import { Time } from "@angular/common";

export interface Presence{
    id: number;
    isPresent: boolean;
    date: Date;
    presenceCode: string;
}