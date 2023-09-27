import { AVContentItem } from './av-content-item.model';

export interface ImageBoard {
    key: string;
    title?: string;
    subtitle?: string;
    boardFontClass?: string;
    images: AVContentItem[];
}